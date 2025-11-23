'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Subject } from '@/lib/storage';
import { storage } from '@/lib/storage';
import { useTheme } from '../help/components/theme-provider';

export default function SubjectsPage() {
  const router = useRouter();
  const { theme } = useTheme();
  
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isEditingOrder, setIsEditingOrder] = useState(false);

  useEffect(() => {
    const savedSubjects = storage.getSubjects();
    setSubjects(savedSubjects.sort((a, b) => a.order - b.order));
  }, []);

  const saveSubjects = (updatedSubjects: Subject[]) => {
    storage.saveSubjects(updatedSubjects);
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: 'New Subject',
      status: '---',
      ut2Marks: 0,
      annualMarks: 0,
      fillMax: false,
      order: subjects.length
    };
    const updatedSubjects = [...subjects, newSubject];
    saveSubjects(updatedSubjects);
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    const updatedSubjects = subjects.map(subject =>
      subject.id === id ? { ...subject, ...updates } : subject
    );
    saveSubjects(updatedSubjects);
  };

  const deleteSubject = (id: string) => {
    const updatedSubjects = subjects.filter(subject => subject.id !== id);
    saveSubjects(updatedSubjects);
  };

  const handleFillMaxChange = (id: string, fillMax: boolean) => {
    const subject = subjects.find(s => s.id === id);
    if (subject) {
      updateSubject(id, {
        fillMax,
        ut2Marks: fillMax ? 20 : subject.ut2Marks,
        annualMarks: fillMax ? 80 : subject.annualMarks
      });
    }
  };

  const getThemeClasses = () => {
    const baseClasses = "min-h-screen p-4";
    return theme === "dark" 
      ? `${baseClasses} dark-theme-bg dark-theme-text` 
      : `${baseClasses} light-theme-bg light-theme-text`;
  };

  const getCardClasses = () => {
    return theme === "dark"
      ? "dark-theme-card rounded-xl shadow-lg p-4"
      : "light-theme-card rounded-xl shadow-lg p-4";
  };

  const getButtonClasses = () => {
    return theme === "dark"
      ? "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
      : "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium";
  };

  const getInputClasses = () => {
    return theme === "dark"
      ? "w-full p-2 rounded border bg-gray-800 border-gray-600 text-white"
      : "w-full p-2 rounded border bg-white border-gray-300 text-gray-800";
  };

  return (
    <div className={getThemeClasses()}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className={getButtonClasses()}
          >
            ← Back
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={addSubject}
              className={getButtonClasses()}
            >
              Add Subject
            </button>
            <button
              onClick={() => setIsEditingOrder(!isEditingOrder)}
              className={getButtonClasses()}
            >
              {isEditingOrder ? 'Done Editing' : 'Edit Order'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className={getCardClasses()}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 
                  className="text-lg font-semibold cursor-pointer"
                  onClick={() => router.push(`/subject-detail/${subject.id}`)}
                >
                  {subject.name}
                </h3>
                {isEditingOrder && (
                  <button
                    onClick={() => deleteSubject(subject.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={subject.status}
                    onChange={(e) => updateSubject(subject.id, { status: e.target.value as Subject['status'] })}
                    className={getInputClasses()}
                  >
                    <option value="---">---</option>
                    <option value="complete">Complete</option>
                    <option value="working-on">Working On</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">UT2 Marks (0-20)</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={subject.ut2Marks}
                    onChange={(e) => updateSubject(subject.id, { ut2Marks: Number(e.target.value) })}
                    className={getInputClasses()}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Annual Marks (0-80)</label>
                  <input
                    type="number"
                    min="0"
                    max="80"
                    value={subject.annualMarks}
                    onChange={(e) => updateSubject(subject.id, { annualMarks: Number(e.target.value) })}
                    className={getInputClasses()}
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={subject.fillMax}
                      onChange={(e) => handleFillMaxChange(subject.id, e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Fill Max</span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => router.push(`/subject-detail/${subject.id}`)}
                className={`${getButtonClasses()} w-full mt-3`}
              >
                Edit Details
              </button>
            </div>
          ))}

          {subjects.length === 0 && (
            <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>No subjects added yet. Click "Add Subject" to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}