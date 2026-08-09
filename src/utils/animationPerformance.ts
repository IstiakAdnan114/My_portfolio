export interface AnimationProfile {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  pixelRatio: number;
  frameInterval: number;
}

export function getAnimationProfile(): AnimationProfile {
  const isMobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pixelRatio = prefersReducedMotion
    ? 1
    : isMobile
      ? Math.min(window.devicePixelRatio || 1, 1.15)
      : Math.min(window.devicePixelRatio || 1, 2);

  return {
    isMobile,
    prefersReducedMotion,
    pixelRatio,
    frameInterval: 1000 / (isMobile ? 30 : 60),
  };
}

export function createAnimationActivityMonitor(isMobile: boolean, onResume?: () => void) {
  let scrolling = false;
  let visible = !document.hidden;
  let resumeTimer: number | null = null;

  const resume = () => {
    scrolling = false;
    resumeTimer = null;
    onResume?.();
  };

  const handleScroll = () => {
    if (!isMobile) return;
    scrolling = true;
    if (resumeTimer !== null) window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(resume, 140);
  };

  const handleVisibility = () => {
    visible = !document.hidden;
    if (visible) onResume?.();
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("touchmove", handleScroll, { passive: true });
  document.addEventListener("visibilitychange", handleVisibility);

  return {
    canRender: () => visible && !scrolling,
    dispose: () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (resumeTimer !== null) window.clearTimeout(resumeTimer);
    },
  };
}
