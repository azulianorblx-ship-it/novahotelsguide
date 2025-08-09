import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Copy, Check, FileText } from 'lucide-react';
import { Category, TextEntry } from '../types/handbook';
import { AddEditEntryDialog } from './AddEditEntryDialog';
import { AddEditCategoryDialog } from './AddEditCategoryDialog';

interface CategoryCardProps {
  category: Category;
  onAddEntry: (title: string, content: string) => void;
  onUpdateEntry: (entryId: string, title: string, content: string) => void;
  onDeleteEntry: (entryId: string) => void;
  onUpdateCategory: (name: string) => void;
  onDeleteCategory: () => void;
}

export function CategoryCard({ 
  category, 
  onAddEntry, 
  onUpdateEntry, 
  onDeleteEntry,
  onUpdateCategory,
  onDeleteCategory
}: CategoryCardProps) {
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TextEntry | null>(null);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [copiedEntryId, setCopiedEntryId] = useState<string | null>(null);

  const handleCopyToClipboard = async (content: string, entryId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedEntryId(entryId);
      setTimeout(() => setCopiedEntryId(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <Card className="fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground">
            {category.name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsEditingCategory(true)}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={onDeleteCategory}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {category.entries.map((entry) => (
            <div
              key={entry.id}
              className="card-entry group relative"
              onClick={() => handleCopyToClipboard(entry.content, entry.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground mb-1 truncate">
                    {entry.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {entry.content}
                  </p>
                </div>
                
                <div className="flex items-center space-x-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedEntryId === entry.id ? (
                    <div className="flex items-center text-green-600 text-xs font-medium">
                      <Check className="w-3 h-3 mr-1" />
                      Copied!
                    </div>
                  ) : (
                    <Copy className="w-4 h-4 text-primary" />
                  )}
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingEntry(entry);
                    }}
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEntry(entry.id);
                    }}
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {category.entries.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No entries yet</p>
              <p className="text-sm">Click "Add Entry" to get started</p>
            </div>
          )}
        </div>

        <Button
          onClick={() => setIsAddingEntry(true)}
          className="w-full mt-4 btn-secondary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </Button>
      </CardContent>

      {/* Dialogs */}
      <AddEditEntryDialog
        isOpen={isAddingEntry}
        onClose={() => setIsAddingEntry(false)}
        onSave={(title, content) => {
          onAddEntry(title, content);
          setIsAddingEntry(false);
        }}
        title="Add New Entry"
      />

      <AddEditEntryDialog
        isOpen={!!editingEntry}
        onClose={() => setEditingEntry(null)}
        onSave={(title, content) => {
          if (editingEntry) {
            onUpdateEntry(editingEntry.id, title, content);
            setEditingEntry(null);
          }
        }}
        title="Edit Entry"
        initialTitle={editingEntry?.title}
        initialContent={editingEntry?.content}
      />

      <AddEditCategoryDialog
        isOpen={isEditingCategory}
        onClose={() => setIsEditingCategory(false)}
        onSave={(name) => {
          onUpdateCategory(name);
          setIsEditingCategory(false);
        }}
        title="Edit Category"
        initialName={category.name}
      />
    </Card>
  );
}