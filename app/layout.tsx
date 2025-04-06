import React from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Allied Health Business Assessment Tool</title>
        <meta name="description" content="A comprehensive solution for physiotherapy practices to analyze business operations, identify improvement opportunities, and enhance practice performance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          {/* Header/Navigation */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <a href="/" className="font-bold text-xl text-blue-600">
                    Allied Health Assessment
                  </a>
                </div>
                
                <nav className="hidden md:flex space-x-8">
                  <a href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Dashboard
                  </a>
                  <a href="/assessment" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Assessment
                  </a>
                  <a href="/results" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Results
                  </a>
                  <a href="/sop-generator" className="text-gray-600 hover:text-blue-600 transition-colors">
                    SOP Generator
                  </a>
                </nav>
                
                <div className="flex items-center space-x-4">
                  <a href="/auth" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                    Sign In
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-100 py-6 border-t border-gray-200">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-600">
                    © 2025 Allied Health Business Assessment Tool
                  </p>
                </div>
                <div className="flex space-x-6">
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
