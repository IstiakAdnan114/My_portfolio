const TARGET_BYTES = 900 * 1024;
const MAX_INPUT_BYTES = 25 * 1024 * 1024;
const MAX_DIMENSION = 2400;
const MIN_QUALITY = 0.68;
const PASSTHROUGH_TYPES = new Set(["image/gif", "image/svg+xml"]);

type ImageSource = ImageBitmap | HTMLImageElement;

async function loadImage(file: File): Promise<{ source: ImageSource; cleanup: () => void }> {
  if ("createImageBitmap" in window) {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    return { source: bitmap, cleanup: () => bitmap.close() };
  }

  const objectUrl = URL.createObjectURL(file);
  const image = new Image();
  image.decoding = "async";
  image.src = objectUrl;
  await image.decode();
  return { source: image, cleanup: () => URL.revokeObjectURL(objectUrl) };
}

function drawToCanvas(source: ImageSource, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error("Image optimization is unavailable in this browser.");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(source, 0, 0, width, height);
  return canvas;
}

function encodeWebp(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      blob => blob ? resolve(blob) : reject(new Error("This browser could not encode the image.")),
      "image/webp",
      quality,
    );
  });
}

export async function optimizeImageForUpload(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  if (file.size > MAX_INPUT_BYTES) throw new Error("Please choose an image smaller than 25 MB.");
  if (PASSTHROUGH_TYPES.has(file.type)) return file;

  let loaded: Awaited<ReturnType<typeof loadImage>> | null = null;
  try {
    loaded = await loadImage(file);
    const sourceWidth = loaded.source.width;
    const sourceHeight = loaded.source.height;
    const initialScale = Math.min(1, MAX_DIMENSION / Math.max(sourceWidth, sourceHeight));
    let width = Math.max(1, Math.round(sourceWidth * initialScale));
    let height = Math.max(1, Math.round(sourceHeight * initialScale));
    let quality = 0.88;
    let canvas = drawToCanvas(loaded.source, width, height);
    let output = await encodeWebp(canvas, quality);

    while (output.size > TARGET_BYTES && quality > MIN_QUALITY) {
      quality = Math.max(MIN_QUALITY, quality - 0.05);
      output = await encodeWebp(canvas, quality);
    }

    while (output.size > TARGET_BYTES && Math.max(width, height) > 1200) {
      width = Math.max(1, Math.round(width * 0.85));
      height = Math.max(1, Math.round(height * 0.85));
      canvas = drawToCanvas(loaded.source, width, height);
      output = await encodeWebp(canvas, 0.78);
    }

    const dimensionsAlreadySafe = sourceWidth <= MAX_DIMENSION && sourceHeight <= MAX_DIMENSION;
    if (dimensionsAlreadySafe && file.size <= TARGET_BYTES && output.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "") || "portfolio-image";
    return new File([output], `${baseName}.webp`, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch (error) {
    if (file.type === "image/heic" || file.type === "image/heif") {
      throw new Error("HEIC images are not supported here. Please use JPG, PNG, or WebP.");
    }
    if (file.size <= TARGET_BYTES) return file;
    throw error;
  } finally {
    loaded?.cleanup();
  }
}
