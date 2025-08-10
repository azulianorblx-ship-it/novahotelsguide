import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AddEditEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  title: string;
  initialTitle?: string;
  initialContent?: string;
}

export function AddEditEntryDialog({
  isOpen,
  onClose,
  onSave,
  title,
  initialTitle = '',
  initialContent = ''
}: AddEditEntryDialogProps) {
  const [entryTitle, setEntryTitle] = useState('');
  const [entryContent, setEntryContent] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEntryTitle(initialTitle);
      setEntryContent(initialContent);
    }
  }, [isOpen, initialTitle, initialContent]);

  const handleSave = () => {
    if (entryTitle.trim() && entryContent.trim()) {
      onSave(entryTitle.trim(), entryContent.trim());
      setEntryTitle('');
      setEntryContent('');
    }
  };

  const handleClose = () => {
    setEntryTitle('');
    setEntryContent('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="entry-title">Title</Label>
            <div className="mt-1 space-y-2">
              <Input
                id="entry-title"
                value={entryTitle}
                onChange={(e) => setEntryTitle(e.target.value)}
                placeholder="Enter entry title..."
              />
              <div className="bg-muted/50 border border-border rounded-md p-3">
                <p className="text-xs text-muted-foreground">
                  💡 <strong>Title:</strong> Give your entry a clear, descriptive name (e.g., "Welcome Message", "Check-in Process")
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="entry-content">Content</Label>
            <div className="mt-1 space-y-2">
              <Textarea
                id="entry-content"
                value={entryContent}
                onChange={(e) => setEntryContent(e.target.value)}
                placeholder="Enter the text that will be copied to clipboard..."
                rows={6}
              />
              <div className="bg-muted/50 border border-border rounded-md p-3">
                <p className="text-xs text-muted-foreground">
                  ✨ <strong>Content:</strong> This text will be copied to your clipboard when you click the entry. Perfect for templates, scripts, or quick responses!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!entryTitle.trim() || !entryContent.trim()}
            className="btn-primary"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}