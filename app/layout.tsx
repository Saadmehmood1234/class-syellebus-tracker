import './globals.css';
import { ThemeProvider } from './help/components/theme-provider';

export const metadata = {
  title: 'Class Syllabus Tracker',
  description: 'Track your syllabus progress and marks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <main className="min-h-screen transition-colors duration-200">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}