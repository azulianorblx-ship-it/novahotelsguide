import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RotateCcw } from 'lucide-react';
import { HandbookPage } from '../types/handbook';

interface NavigationProps {
  pages: HandbookPage[];
  currentPageId: string | null;
  onPageSelect: (pageId: string | null) => void;
  onAddPage: () => void;
  onResetData: () => void;
}

export function Navigation({ pages, currentPageId, onPageSelect, onAddPage, onResetData }: NavigationProps) {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <button
              onClick={() => onPageSelect(null)}
              className="text-xl font-bold text-primary hover:text-primary-hover transition-colors"
            >
              Hotel Handbook
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onPageSelect(null)}
              className={`nav-link ${currentPageId === null ? 'active' : ''}`}
            >
              Home
            </button>
            
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageSelect(page.id)}
                className={`nav-link ${currentPageId === page.id ? 'active' : ''}`}
              >
                {page.name}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={onAddPage}
              size="sm"
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Page
            </Button>
            
            <Button
              onClick={onResetData}
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onPageSelect(null)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                currentPageId === null 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Home
            </button>
            
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageSelect(page.id)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  currentPageId === page.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}