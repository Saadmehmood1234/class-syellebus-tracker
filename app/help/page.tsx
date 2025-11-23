'use client';
import { useRouter } from 'next/navigation';
import { useTheme } from './components/theme-provider';
import { themes } from '../../lib/themes';

export default function HelpPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  const sections = [
    {
      title: "🏠 Home Menu",
      content: "The main screen with four large buttons: Subjects, Score, Settings, and Help. Tap any button to navigate to that section."
    },
    {
      title: "📚 Subjects Page",
      content: "View all your subjects in cards. Each card shows subject name, status, UT2 marks (0-20), Annual marks (0-80), and a 'Fill Max' checkbox. Tap subject name to edit details, or use the Edit button."
    },
    {
      title: "📝 Subject Detail Page",
      content: "Edit all subject information including name, status, marks, ranks, and percentages. Remember to tap 'Save' when done. Use 'Delete Subject' to remove a subject entirely."
    },
    {
      title: "🏆 Score Page",
      content: "Track your ranks and percentages for all subjects. Enter Unit Test Rank, Unit Test Percentage, Annual Rank, and Annual Percentage manually. All changes save automatically."
    },
    {
      title: "⚙️ Settings Page",
      content: "Manage your app settings: Edit subjects, change class (9-12), switch between Light and Dark themes, reset all data, or get help."
    },
    {
      title: "🔄 Subject Order Edit",
      content: "In Subjects page, tap 'Edit Order' to rearrange subjects using drag handles. Tap 'Done Editing' when finished. In edit mode, you can also delete subjects directly."
    },
    {
      title: "💾 Save Behavior",
      content: "Most changes save automatically. On Subject Detail page, you must manually tap 'Save'. A reminder appears at the bottom if you have unsaved changes."
    },
    {
      title: "🎨 Themes",
      content: "Switch between Light (bright pastels) and Dark (dark navy) themes in Settings. Your choice persists after app restart."
    }
  ];

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} p-4`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className={`${currentTheme.button} px-4 py-2 rounded-lg font-medium mr-4`}
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Help — How to use the app</h1>
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className={`${currentTheme.card} p-6 rounded-xl shadow-lg`}>
              <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
              <p className={`${currentTheme.secondaryText} leading-relaxed`}>
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-8 text-center ${currentTheme.secondaryText} text-sm`}>
          <p>Need more help? Contact support or check for app updates.</p>
        </div>
      </div>
    </div>
  );
}