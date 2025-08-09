import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddEditPageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  onDelete?: () => void;
  title: string;
  initialName?: string;
}

export function AddEditPageDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  title,
  initialName = ''
}: AddEditPageDialogProps) {
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPageName(initialName);
    }
  }, [isOpen, initialName]);

  const handleSave = () => {
    if (pageName.trim()) {
      onSave(pageName.trim());
      setPageName('');
    }
  };

  const handleClose = () => {
    setPageName('');
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      onDelete();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="page-name">Page Name</Label>
            <Input
              id="page-name"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder="Enter page name..."
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          {onDelete && (
            <Button 
              onClick={handleDelete}
              variant="destructive"
            >
              Delete Page
            </Button>
          )}
          
          <div className="flex space-x-3 ml-auto">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!pageName.trim()}
              className="btn-primary"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}