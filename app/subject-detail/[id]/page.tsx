'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Subject } from '@/lib/storage';
import { storage } from '@/lib/storage';
import { useTheme } from '@/app/help/components/theme-provider';

export default function SubjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { theme } = useTheme();
  
  const [subject, setSubject] = useState<Subject | null>(null);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    const subjects = storage.getSubjects();
    const foundSubject = subjects.find(s => s.id === params.id);
    setSubject(foundSubject || null);
  }, [params.id]);

  const updateField = (field: keyof Subject, value: any) => {
    if (subject) {
      setSubject({ ...subject, [field]: value });
      setIsSaved(false);
    }
  };

  const handleFillMaxChange = (fillMax: boolean) => {
    if (subject) {
      setSubject({
        ...subject,
        fillMax,
        ut2Marks: fillMax ? 20 : subject.ut2Marks,
        annualMarks: fillMax ? 80 : subject.annualMarks
      });
      setIsSaved(false);
    }
  };

  const saveSubject = () => {
    if (subject) {
      const subjects = storage.getSubjects();
      const updatedSubjects = subjects.map(s =>
        s.id === subject.id ? subject : s
      );
      storage.saveSubjects(updatedSubjects);
      setIsSaved(true);
      router.push('/subjects');
    }
  };

  const deleteSubject = () => {
    if (subject) {
      const subjects = storage.getSubjects();
      const updatedSubjects = subjects.filter(s => s.id !== subject.id);
      storage.saveSubjects(updatedSubjects);
      router.push('/subjects');
    }
  };

  const getThemeClasses = () => {
    const baseClasses = "min-h-screen p-4 pb-20";
    return theme === "dark" 
      ? `${baseClasses} dark-theme-bg dark-theme-text` 
      : `${baseClasses} light-theme-bg light-theme-text`;
  };

  const getCardClasses = () => {
    return theme === "dark"
      ? "dark-theme-card rounded-xl shadow-lg p-6"
      : "light-theme-card rounded-xl shadow-lg p-6";
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

  if (!subject) {
    return (
      <div className={getThemeClasses()}>
        <div className="max-w-md mx-auto text-center">
          <p>Subject not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={getThemeClasses()}>
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className={getButtonClasses()}
          >
            ← Back
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={saveSubject}
              className={getButtonClasses()}
            >
              Save
            </button>
            <button
              onClick={deleteSubject}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
            >
              Delete
            </button>
          </div>
        </div>

        <div className={`${getCardClasses()} space-y-4`}>
          <div>
            <label className="block text-sm font-medium mb-1">Subject Name</label>
            <input
              type="text"
              value={subject.name}
              onChange={(e) => updateField('name', e.target.value)}
              className={getInputClasses()}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={subject.status}
              onChange={(e) => updateField('status', e.target.value)}
              className={getInputClasses()}
            >
              <option value="---">---</option>
              <option value="complete">Complete</option>
              <option value="working-on">Working On</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">UT2 Marks (0-20)</label>
              <input
                type="number"
                min="0"
                max="20"
                value={subject.ut2Marks}
                onChange={(e) => updateField('ut2Marks', Number(e.target.value))}
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
                onChange={(e) => updateField('annualMarks', Number(e.target.value))}
                className={getInputClasses()}
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={subject.fillMax}
                onChange={(e) => handleFillMaxChange(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Fill Max (UT2: 20, Annual: 80)</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Unit Test Rank</label>
              <input
                type="number"
                value={subject.unitTestRank || ''}
                onChange={(e) => updateField('unitTestRank', e.target.value ? Number(e.target.value) : undefined)}
                className={getInputClasses()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Unit Test %</label>
              <input
                type="number"
                step="0.1"
                value={subject.unitTestPercentage || ''}
                onChange={(e) => updateField('unitTestPercentage', e.target.value ? Number(e.target.value) : undefined)}
                className={getInputClasses()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Annual Rank</label>
              <input
                type="number"
                value={subject.annualRank || ''}
                onChange={(e) => updateField('annualRank', e.target.value ? Number(e.target.value) : undefined)}
                className={getInputClasses()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Annual %</label>
              <input
                type="number"
                step="0.1"
                value={subject.annualPercentage || ''}
                onChange={(e) => updateField('annualPercentage', e.target.value ? Number(e.target.value) : undefined)}
                className={getInputClasses()}
              />
            </div>
          </div>
        </div>

        {!isSaved && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-yellow-500 text-white text-center">
            Remember to Save
          </div>
        )}
      </div>
    </div>
  );
}