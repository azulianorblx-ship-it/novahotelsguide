import React, { useState } from 'react';
import { useHandbook } from '../hooks/useHandbook';
import { Navigation } from '../components/Navigation';
import { LandingPage } from '../components/LandingPage';
import { HandbookPage } from '../components/HandbookPage';
import { AddPageDialog } from '../components/AddPageDialog';

const Index = () => {
  const {
    handbookData,
    addPage,
    updatePage,
    deletePage,
    addCategory,
    updateCategory,
    deleteCategory,
    addEntry,
    updateEntry,
    deleteEntry,
    resetToDefault
  } = useHandbook();
  
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const [isAddingPage, setIsAddingPage] = useState(false);

  const currentPage = currentPageId 
    ? handbookData.pages.find(page => page.id === currentPageId)
    : null;

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      resetToDefault();
      setCurrentPageId(null);
    }
  };

  const handleDeletePage = (pageId: string) => {
    if (window.confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      deletePage(pageId);
      if (currentPageId === pageId) {
        setCurrentPageId(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        pages={handbookData.pages}
        currentPageId={currentPageId}
        onPageSelect={setCurrentPageId}
        onAddPage={() => setIsAddingPage(true)}
        onResetData={handleResetData}
      />

      {currentPageId === null ? (
        <LandingPage
          pages={handbookData.pages}
          onPageSelect={setCurrentPageId}
          onAddPage={() => setIsAddingPage(true)}
        />
      ) : currentPage ? (
        <HandbookPage
          page={currentPage}
          onAddCategory={(name) => addCategory(currentPageId, name)}
          onDeleteCategory={(categoryId) => deleteCategory(currentPageId, categoryId)}
          onUpdateCategory={(categoryId, name) => updateCategory(currentPageId, categoryId, name)}
          onAddEntry={(categoryId, title, content) => addEntry(currentPageId, categoryId, title, content)}
          onUpdateEntry={(categoryId, entryId, title, content) => updateEntry(currentPageId, categoryId, entryId, title, content)}
          onDeleteEntry={(categoryId, entryId) => deleteEntry(currentPageId, categoryId, entryId)}
          onUpdatePage={(name) => updatePage(currentPageId, name)}
          onDeletePage={() => handleDeletePage(currentPageId)}
        />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Page not found</p>
        </div>
      )}

      <AddPageDialog
        isOpen={isAddingPage}
        onClose={() => setIsAddingPage(false)}
        onSave={(name) => {
          addPage(name);
          setIsAddingPage(false);
        }}
      />
    </div>
  );
};

export default Index;
