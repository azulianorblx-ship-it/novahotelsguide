import React from 'react';
import { Button } from '@/components/ui/button';
import { Book, Users, FileText, Settings } from 'lucide-react';
import { HandbookPage } from '../types/handbook';
import { Footer } from './Footer';

interface LandingPageProps {
  pages: HandbookPage[];
  onPageSelect: (pageId: string) => void;
  onAddPage: () => void;
}

export function LandingPage({ pages, onPageSelect, onAddPage }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Nova Hotels X
              <span className="block text-primary">Staff Handbook</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-2 max-w-2xl mx-auto">
              Unofficial training and reference guide system
            </p>
            
            <p className="text-lg text-primary font-medium mb-2">
              Created by Azuliano
            </p>
            
            <p className="text-sm text-muted-foreground mb-12 italic">
              *This is an unofficial tool and is not affiliated with or endorsed by Nova Hotels X
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {pages.length > 0 ? (
                <Button
                  onClick={() => onPageSelect(pages[0].id)}
                  className="btn-primary text-lg px-8 py-4"
                >
                  <Book className="w-5 h-5 mr-2" />
                  Open Handbook
                </Button>
              ) : (
                <Button
                  onClick={onAddPage}
                  className="btn-primary text-lg px-8 py-4"
                >
                  <Book className="w-5 h-5 mr-2" />
                  Create First Page
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything you need for Nova Hotels X staff training
          </h2>
          <p className="text-lg text-muted-foreground">
            Organize, manage, and access Nova Hotels X operational procedures
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick Reference</h3>
            <p className="text-muted-foreground">
              One-click access to procedures and scripts. Copy text to clipboard instantly.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Team Training</h3>
            <p className="text-muted-foreground">
              Standardized responses and procedures for consistent service delivery.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
            <p className="text-muted-foreground">
              Add, edit, and organize content without any technical knowledge required.
            </p>
          </div>
        </div>
      </div>

      {/* Pages Overview */}
      {pages.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Your Handbook Pages
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick access to all your training materials
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageSelect(page.id)}
                className="text-left p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md group"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {page.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {page.categories.length} categories
                </p>
                <div className="text-primary font-medium">
                  View →
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}