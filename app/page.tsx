'use client';
import { useRouter } from 'next/navigation';
import { useTheme } from './help/components/theme-provider';
import { themes } from '../lib/themes';

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  const menuItems = [
    { icon: '📚', label: 'Subjects', path: '/subjects' },
    { icon: '🏆', label: 'Score', path: '/score' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
    { icon: '❓', label: 'Help', path: '/help' },
  ];

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} p-6`}>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 mt-4">
          Class Syllabus Tracker
        </h1>
        
        <div className="grid grid-cols-1 gap-4 mb-8">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`${currentTheme.card} p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200 text-left`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xl font-semibold">{item.label}</span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className={`${currentTheme.secondaryText} text-sm`}>
            Developer: Mubashshir Hasan
          </p>
        </div>
      </div>
    </div>
  );
}