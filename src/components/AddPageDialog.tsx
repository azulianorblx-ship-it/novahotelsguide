import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddPageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export function AddPageDialog({ isOpen, onClose, onSave }: AddPageDialogProps) {
  const [pageName, setPageName] = useState('');

  const handleSave = () => {
    if (pageName.trim()) {
      onSave(pageName.trim());
      setPageName('');
      onClose();
    }
  };

  const handleClose = () => {
    setPageName('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Page</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="new-page-name">Page Name</Label>
            <Input
              id="new-page-name"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder="Enter page name..."
              className="mt-1"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!pageName.trim()}
            className="btn-primary"
          >
            Create Page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}