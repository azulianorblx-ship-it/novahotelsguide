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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Copy, Info } from 'lucide-react';

interface AddEditEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string, type: 'copyable' | 'info') => void;
  title: string;
  initialTitle?: string;
  initialContent?: string;
  initialType?: 'copyable' | 'info';
}

export function AddEditEntryDialog({
  isOpen,
  onClose,
  onSave,
  title,
  initialTitle = '',
  initialContent = '',
  initialType = 'copyable'
}: AddEditEntryDialogProps) {
  const [entryTitle, setEntryTitle] = useState('');
  const [entryContent, setEntryContent] = useState('');
  const [entryType, setEntryType] = useState<'copyable' | 'info'>('copyable');

  useEffect(() => {
    if (isOpen) {
      setEntryTitle(initialTitle);
      setEntryContent(initialContent);
      setEntryType(initialType);
    }
  }, [isOpen, initialTitle, initialContent, initialType]);

  const handleSave = () => {
    if (entryTitle.trim() && entryContent.trim()) {
      onSave(entryTitle.trim(), entryContent.trim(), entryType);
      setEntryTitle('');
      setEntryContent('');
      setEntryType('copyable');
    }
  };

  const handleClose = () => {
    setEntryTitle('');
    setEntryContent('');
    setEntryType('copyable');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="entry-type" className="text-base font-medium">Entry Type</Label>
            <RadioGroup
              value={entryType}
              onValueChange={(value: 'copyable' | 'info') => setEntryType(value)}
              className="mt-3"
            >
              <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="copyable" id="copyable" />
                <Label htmlFor="copyable" className="flex items-center space-x-2 cursor-pointer flex-1">
                  <Copy className="w-4 h-4 text-primary" />
                  <div>
                    <div className="font-medium">Copyable Entry</div>
                    <div className="text-sm text-muted-foreground">Clickable text that copies to clipboard</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="info" id="info" />
                <Label htmlFor="info" className="flex items-center space-x-2 cursor-pointer flex-1">
                  <Info className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-medium">Info Box</div>
                    <div className="text-sm text-muted-foreground">Display-only information (not clickable)</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="entry-title" className="text-base font-medium">Title</Label>
            <Input
              id="entry-title"
              value={entryTitle}
              onChange={(e) => setEntryTitle(e.target.value)}
              placeholder="Enter entry title..."
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="entry-content" className="text-base font-medium">Content</Label>
            <Textarea
              id="entry-content"
              value={entryContent}
              onChange={(e) => setEntryContent(e.target.value)}
              placeholder={entryType === 'copyable' 
                ? "Enter the text that will be copied to clipboard..." 
                : "Enter information text (display only)..."
              }
              rows={6}
              className="mt-2"
            />
            <div className="bg-muted/50 border border-border rounded-md p-3 mt-2">
              <p className="text-xs text-muted-foreground">
                {entryType === 'copyable' ? (
                  <>✨ <strong>Copyable:</strong> This text will be copied to your clipboard when clicked</>
                ) : (
                  <>📋 <strong>Info Box:</strong> This will display as read-only information</>
                )}
              </p>
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