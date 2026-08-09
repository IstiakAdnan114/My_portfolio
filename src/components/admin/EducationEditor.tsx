import { useState } from "react";
import { ArrowDown, ArrowUp, BookOpen, ChevronDown, ChevronRight, GraduationCap, Plus, Trash2 } from "lucide-react";
import type { PortfolioContent } from "../../cms/ContentProvider";

type EducationEntry = PortfolioContent["education"][number];
type CourseEntry = EducationEntry["courses"][number];

interface EducationEditorProps {
  education: PortfolioContent["education"];
  onChange: (education: PortfolioContent["education"]) => void;
}

const blankCourse = (): CourseEntry => ({
  code: "",
  title: "New course",
  category: "",
  credits: "",
  description: "",
});

const blankEducation = (): EducationEntry => ({
  institution: "New institution",
  degree: "Program or study background",
  period: "",
  color: "indigo",
  detailsLabel: "View study details",
  detailsTitle: "Study details",
  detailsIntro: "",
  catalogueUrl: "",
  courses: [],
});

function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function CourseCategoryField({ value, categories, onChange }: { value: string; categories: string[]; onChange: (value: string) => void }) {
  const [addingNew, setAddingNew] = useState(false);
  const [previousValue, setPreviousValue] = useState(value);

  if (addingNew) {
    return (
      <div className="sm:col-span-2">
        <label className="block text-sm text-slate-300">New category
          <input autoFocus value={value} onChange={event => onChange(event.target.value)} className="admin-input mt-2" placeholder="e.g. Manufacturing systems" />
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          <button type="button" disabled={!value.trim()} onClick={() => setAddingNew(false)} className="admin-action secondary !py-2 !px-3 disabled:opacity-50">Use this category</button>
          <button type="button" onClick={() => { onChange(previousValue); setAddingNew(false); }} className="admin-action secondary !py-2 !px-3">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:col-span-2">
      <label className="block text-sm text-slate-300">Category</label>
      <div className="mt-2 flex flex-col sm:flex-row gap-2">
        <select value={value} onChange={event => onChange(event.target.value)} className="admin-input min-w-0">
          <option value="">Select a category</option>
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
        <button type="button" onClick={() => { setPreviousValue(value); onChange(""); setAddingNew(true); }} className="admin-action secondary shrink-0"><Plus size={16} /> Add new category</button>
      </div>
      {!categories.length && <p className="text-xs text-slate-500 mt-2">No categories yet—create the first one for this institution.</p>}
    </div>
  );
}

export default function EducationEditor({ education, onChange }: EducationEditorProps) {
  const [openEntries, setOpenEntries] = useState<Set<number>>(() => new Set([0]));
  const [openCourses, setOpenCourses] = useState<Set<string>>(() => new Set());

  const updateEducation = (index: number, patch: Partial<EducationEntry>) => {
    onChange(education.map((entry, entryIndex) => entryIndex === index ? { ...entry, ...patch } : entry));
  };

  const updateCourse = (educationIndex: number, courseIndex: number, patch: Partial<CourseEntry>) => {
    const entry = education[educationIndex];
    updateEducation(educationIndex, {
      courses: entry.courses.map((course, index) => index === courseIndex ? { ...course, ...patch } : course),
    });
  };

  const toggleEntry = (index: number) => {
    setOpenEntries(current => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const toggleCourse = (educationIndex: number, courseIndex: number) => {
    const key = `${educationIndex}:${courseIndex}`;
    setOpenCourses(current => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const addCourse = (educationIndex: number) => {
    const entry = education[educationIndex];
    const courseIndex = entry.courses.length;
    updateEducation(educationIndex, { courses: [...entry.courses, blankCourse()] });
    setOpenCourses(current => new Set([...current, `${educationIndex}:${courseIndex}`]));
  };

  const addEducation = () => {
    const next = [...education, blankEducation()];
    onChange(next);
    setOpenEntries(current => new Set([...current, next.length - 1]));
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.07] p-5 flex items-start gap-4">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-500/15 text-indigo-300 flex items-center justify-center"><GraduationCap size={21} /></div>
        <div>
          <h2 className="font-bold text-white">Education and course catalogue</h2>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">Each education card can open a public study-details window. Add, remove, and arrange courses here; leave the course list empty when only an overview is needed.</p>
        </div>
      </div>

      {education.map((entry, educationIndex) => {
        const isOpen = openEntries.has(educationIndex);
        const categoryOptions = [...new Set(entry.courses.map(course => course.category.trim()).filter(Boolean))].sort();
        return (
          <section key={educationIndex} className="rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden">
            <div className="flex items-center gap-2 p-4 sm:p-5">
              <button type="button" onClick={() => toggleEntry(educationIndex)} className="min-w-0 flex-1 text-left flex items-center gap-3">
                {isOpen ? <ChevronDown size={18} className="text-indigo-300 shrink-0" /> : <ChevronRight size={18} className="text-indigo-300 shrink-0" />}
                <span className="min-w-0">
                  <span className="block font-bold text-white truncate">{entry.institution || "Untitled institution"}</span>
                  <span className="block text-xs text-slate-500 mt-1">{entry.courses.length} {entry.courses.length === 1 ? "course" : "courses"}</span>
                </span>
              </button>
              <div className="flex gap-1 shrink-0">
                <button type="button" aria-label="Move education up" onClick={() => onChange(moveItem(education, educationIndex, -1))} className="admin-icon-btn"><ArrowUp size={15} /></button>
                <button type="button" aria-label="Move education down" onClick={() => onChange(moveItem(education, educationIndex, 1))} className="admin-icon-btn"><ArrowDown size={15} /></button>
                <button type="button" aria-label="Delete education" onClick={() => onChange(education.filter((_, index) => index !== educationIndex))} className="admin-icon-btn hover:!text-red-300"><Trash2 size={15} /></button>
              </div>
            </div>

            {isOpen && (
              <div className="border-t border-white/10 p-4 sm:p-6 space-y-7">
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block text-sm text-slate-300 md:col-span-2">Institution
                    <input value={entry.institution} onChange={event => updateEducation(educationIndex, { institution: event.target.value })} className="admin-input mt-2" />
                  </label>
                  <label className="block text-sm text-slate-300">Degree / background
                    <input value={entry.degree} onChange={event => updateEducation(educationIndex, { degree: event.target.value })} className="admin-input mt-2" />
                  </label>
                  <label className="block text-sm text-slate-300">Period
                    <input value={entry.period} onChange={event => updateEducation(educationIndex, { period: event.target.value })} className="admin-input mt-2" placeholder="2021 - 2026" />
                  </label>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 sm:p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <BookOpen size={18} className="text-indigo-300" />
                    <div><h3 className="font-bold text-white">Public details window</h3><p className="text-xs text-slate-500 mt-0.5">This copy appears after a visitor clicks the education card.</p></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="block text-sm text-slate-300">Button label
                      <input value={entry.detailsLabel} onChange={event => updateEducation(educationIndex, { detailsLabel: event.target.value })} className="admin-input mt-2" />
                    </label>
                    <label className="block text-sm text-slate-300">Official catalogue URL <span className="text-slate-600">(optional)</span>
                      <input type="url" value={entry.catalogueUrl} onChange={event => updateEducation(educationIndex, { catalogueUrl: event.target.value })} className="admin-input mt-2" placeholder="https://..." />
                    </label>
                    <label className="block text-sm text-slate-300 md:col-span-2">Details title
                      <input value={entry.detailsTitle} onChange={event => updateEducation(educationIndex, { detailsTitle: event.target.value })} className="admin-input mt-2" />
                    </label>
                    <label className="block text-sm text-slate-300 md:col-span-2">Short introduction
                      <textarea value={entry.detailsIntro} onChange={event => updateEducation(educationIndex, { detailsIntro: event.target.value })} rows={4} className="admin-input mt-2 resize-y" />
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div><h3 className="font-bold text-white">Courses and subjects</h3><p className="text-xs text-slate-500 mt-1">Categories automatically become headings in the public catalogue.</p></div>
                    <button type="button" onClick={() => addCourse(educationIndex)} className="admin-action secondary"><Plus size={16} /> Add course</button>
                  </div>

                  <div className="space-y-4">
                    {entry.courses.map((course, courseIndex) => {
                      const isCourseOpen = openCourses.has(`${educationIndex}:${courseIndex}`);
                      return (
                        <article key={courseIndex} className="rounded-2xl border border-white/10 bg-slate-950/55 overflow-hidden">
                          <div className="flex items-center gap-2 p-3 sm:p-4">
                            <button type="button" onClick={() => toggleCourse(educationIndex, courseIndex)} className="min-w-0 flex-1 flex items-center gap-3 text-left">
                              {isCourseOpen ? <ChevronDown size={17} className="text-indigo-300 shrink-0" /> : <ChevronRight size={17} className="text-indigo-300 shrink-0" />}
                              <span className="min-w-0">
                                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                  {course.code && <span className="text-xs font-mono font-bold text-indigo-300">{course.code}</span>}
                                  <span className="font-semibold text-slate-100 truncate">{course.title || `Course ${courseIndex + 1}`}</span>
                                </span>
                                <span className="block text-xs text-slate-500 mt-1 truncate">{course.category || "Uncategorized"}</span>
                              </span>
                            </button>
                            <div className="flex gap-1 shrink-0">
                              <button type="button" aria-label="Move course up" onClick={() => updateEducation(educationIndex, { courses: moveItem(entry.courses, courseIndex, -1) })} className="admin-icon-btn"><ArrowUp size={15} /></button>
                              <button type="button" aria-label="Move course down" onClick={() => updateEducation(educationIndex, { courses: moveItem(entry.courses, courseIndex, 1) })} className="admin-icon-btn"><ArrowDown size={15} /></button>
                              <button type="button" aria-label="Delete course" onClick={() => updateEducation(educationIndex, { courses: entry.courses.filter((_, index) => index !== courseIndex) })} className="admin-icon-btn hover:!text-red-300"><Trash2 size={15} /></button>
                            </div>
                          </div>
                          {isCourseOpen && <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-white/10 p-4 sm:p-5">
                            <label className="block text-sm text-slate-300">Course code
                              <input value={course.code} onChange={event => updateCourse(educationIndex, courseIndex, { code: event.target.value })} className="admin-input mt-2" placeholder="IPE 307" />
                            </label>
                            <label className="block text-sm text-slate-300 sm:col-span-1 lg:col-span-2">Course title
                              <input value={course.title} onChange={event => updateCourse(educationIndex, courseIndex, { title: event.target.value })} className="admin-input mt-2" />
                            </label>
                            <label className="block text-sm text-slate-300">Credits <span className="text-slate-600">(optional)</span>
                              <input value={course.credits} onChange={event => updateCourse(educationIndex, courseIndex, { credits: event.target.value })} className="admin-input mt-2" placeholder="3.0" />
                            </label>
                            <CourseCategoryField value={course.category} categories={categoryOptions} onChange={category => updateCourse(educationIndex, courseIndex, { category })} />
                            <label className="block text-sm text-slate-300 sm:col-span-2">Short description
                              <textarea value={course.description} onChange={event => updateCourse(educationIndex, courseIndex, { description: event.target.value })} rows={3} className="admin-input mt-2 resize-y" />
                            </label>
                          </div>}
                        </article>
                      );
                    })}
                    {!entry.courses.length && <div className="rounded-2xl border border-dashed border-white/15 p-7 text-center text-sm text-slate-500">No courses yet. The public window can still show the introduction above.</div>}
                  </div>
                </div>
              </div>
            )}
          </section>
        );
      })}

      <button type="button" onClick={addEducation} className="w-full border border-dashed border-indigo-400/40 text-indigo-300 hover:bg-indigo-500/10 rounded-2xl py-4 flex items-center justify-center gap-2 text-sm font-bold"><Plus size={17} /> Add education</button>
    </div>
  );
}
