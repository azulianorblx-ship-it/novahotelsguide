import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FolderPlus } from 'lucide-react';
import { HandbookPage as HandbookPageType } from '../types/handbook';
import { CategoryCard } from './CategoryCard';
import { AddEditCategoryDialog } from './AddEditCategoryDialog';
import { AddEditPageDialog } from './AddEditPageDialog';

interface HandbookPageProps {
  page: HandbookPageType;
  onAddCategory: (name: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  onUpdateCategory: (categoryId: string, name: string) => void;
  onAddEntry: (categoryId: string, title: string, content: string) => void;
  onUpdateEntry: (categoryId: string, entryId: string, title: string, content: string) => void;
  onDeleteEntry: (categoryId: string, entryId: string) => void;
  onUpdatePage: (name: string) => void;
  onDeletePage: () => void;
}

export function HandbookPage({
  page,
  onAddCategory,
  onDeleteCategory,
  onUpdateCategory,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
  onUpdatePage,
  onDeletePage
}: HandbookPageProps) {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingPage, setIsEditingPage] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{page.name}</h1>
              <p className="text-muted-foreground mt-1">
                {page.categories.length} categories
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setIsEditingPage(true)}
                variant="outline"
                className="btn-secondary"
              >
                Edit Page
              </Button>
              
              <Button
                onClick={() => setIsAddingCategory(true)}
                className="btn-primary"
              >
                <FolderPlus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {page.categories.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {page.categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onAddEntry={(title, content) => onAddEntry(category.id, title, content)}
                onUpdateEntry={(entryId, title, content) => onUpdateEntry(category.id, entryId, title, content)}
                onDeleteEntry={(entryId) => onDeleteEntry(category.id, entryId)}
                onUpdateCategory={(name) => onUpdateCategory(category.id, name)}
                onDeleteCategory={() => onDeleteCategory(category.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FolderPlus className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No categories yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Create your first category to start organizing Nova Hotels X procedures and training content
            </p>
            <Button
              onClick={() => setIsAddingCategory(true)}
              className="btn-primary"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              Create First Category
            </Button>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <AddEditCategoryDialog
        isOpen={isAddingCategory}
        onClose={() => setIsAddingCategory(false)}
        onSave={(name) => {
          onAddCategory(name);
          setIsAddingCategory(false);
        }}
        title="Add New Category"
      />

      <AddEditPageDialog
        isOpen={isEditingPage}
        onClose={() => setIsEditingPage(false)}
        onSave={(name) => {
          onUpdatePage(name);
          setIsEditingPage(false);
        }}
        onDelete={() => {
          onDeletePage();
          setIsEditingPage(false);
        }}
        title="Edit Page"
        initialName={page.name}
      />
    </div>
  );
}