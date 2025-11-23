'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { useTheme } from '../help/components/theme-provider';

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  
  const [classNumber, setClassNumber] = useState('9');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const savedClass = storage.getClass();
    setClassNumber(savedClass);
  }, []);

  const updateClassNumber = (newClass: string) => {
    setClassNumber(newClass);
    storage.setClass(newClass);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  const resetAllData = () => {
    storage.resetAllData();
    setShowResetConfirm(false);
    window.location.href = '/';
  };

  const getThemeClasses = () => {
    const baseClasses = "min-h-screen p-4";
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
      ? "bg-gray-800 border-gray-600 text-white"
      : "bg-white border-gray-300 text-gray-800";
  };

  return (
    <div className={getThemeClasses()}>
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className={getButtonClasses()}
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold ml-4">Settings</h1>
        </div>

        <div className={`${getCardClasses()} space-y-6`}>
          {/* Edit Subjects */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Manage Subjects</h3>
            <button
              onClick={() => router.push('/subjects')}
              className={`${getButtonClasses()} w-full py-3`}
            >
              📚 Edit Subjects
            </button>
          </div>

          {/* Class Input */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Class</h3>
            <div className="flex space-x-2">
              {['9', '10', '11', '12'].map((classNum) => (
                <button
                  key={classNum}
                  onClick={() => updateClassNumber(classNum)}
                  className={`flex-1 py-2 rounded-lg font-medium border ${
                    classNumber === classNum
                      ? 'bg-blue-500 text-white border-blue-500'
                      : `${getInputClasses()} border-gray-300`
                  }`}
                >
                  Class {classNum}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Switch */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Theme</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 border ${
                  theme === 'light'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : `${getInputClasses()} border-gray-300`
                }`}
              >
                <span>🌞</span>
                <span>Light Mode</span>
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 border ${
                  theme === 'dark'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : `${getInputClasses()} border-gray-300`
                }`}
              >
                <span>🌙</span>
                <span>Dark Mode</span>
              </button>
            </div>
          </div>

          {/* Reset Data */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-600">Danger Zone</h3>
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium"
              >
                Reset All Data
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-center text-red-600 font-medium">
                  Are you sure? This cannot be undone!
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={resetAllData}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
                  >
                    Yes, Reset Everything
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className={`flex-1 ${getButtonClasses()} py-2`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help */}
          <div>
            <button
              onClick={() => router.push('/help')}
              className={`${getButtonClasses()} w-full py-3`}
            >
              ❓ Help & Instructions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}