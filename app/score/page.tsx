'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Subject, storage } from '@/lib/storage';
import { useTheme } from '../help/components/theme-provider';

export default function ScorePage() {
  const router = useRouter();
  const { theme } = useTheme();
  
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const savedSubjects = storage.getSubjects();
    setSubjects(savedSubjects.sort((a, b) => a.order - b.order));
  }, []);

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    const updatedSubjects = subjects.map(subject =>
      subject.id === id ? { ...subject, ...updates } : subject
    );
    setSubjects(updatedSubjects);
    
    // Auto-save
    storage.saveSubjects(updatedSubjects);
  };

  const getThemeClasses = () => {
    const baseClasses = "min-h-screen p-4";
    return theme === "dark" 
      ? `${baseClasses} dark-theme-bg dark-theme-text` 
      : `${baseClasses} light-theme-bg light-theme-text`;
  };

  const getCardClasses = () => {
    return theme === "dark"
      ? "dark-theme-card border-b"
      : "light-theme-card border-b";
  };

  const getInputClasses = () => {
    return theme === "dark"
      ? "w-full p-2 rounded border bg-gray-800 border-gray-600 text-white text-center"
      : "w-full p-2 rounded border bg-white border-gray-300 text-gray-800 text-center";
  };

  return (
    <div className={getThemeClasses()}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className={theme === "dark" 
              ? "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              : "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
            }
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Score Tracking</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={getCardClasses()}>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-center">Unit Rank</th>
                <th className="p-3 text-center">Unit %</th>
                <th className="p-3 text-center">Annual Rank</th>
                <th className="p-3 text-center">Annual %</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id} className={getCardClasses()}>
                  <td className="p-3 font-medium">{subject.name}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={subject.unitTestRank || ''}
                      onChange={(e) => updateSubject(subject.id, { 
                        unitTestRank: e.target.value ? Number(e.target.value) : undefined 
                      })}
                      className={getInputClasses()}
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      step="0.1"
                      value={subject.unitTestPercentage || ''}
                      onChange={(e) => updateSubject(subject.id, { 
                        unitTestPercentage: e.target.value ? Number(e.target.value) : undefined 
                      })}
                      className={getInputClasses()}
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={subject.annualRank || ''}
                      onChange={(e) => updateSubject(subject.id, { 
                        annualRank: e.target.value ? Number(e.target.value) : undefined 
                      })}
                      className={getInputClasses()}
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      step="0.1"
                      value={subject.annualPercentage || ''}
                      onChange={(e) => updateSubject(subject.id, { 
                        annualPercentage: e.target.value ? Number(e.target.value) : undefined 
                      })}
                      className={getInputClasses()}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {subjects.length === 0 && (
            <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>No subjects added yet. Add subjects first!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}