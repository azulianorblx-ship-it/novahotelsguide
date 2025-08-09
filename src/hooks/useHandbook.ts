import { useLocalStorage } from './useLocalStorage';
import { HandbookData, HandbookPage, Category, TextEntry } from '../types/handbook';

const DEFAULT_DATA: HandbookData = {
  pages: [
    {
      id: 'general-handbook',
      name: 'General Handbook',
      categories: [
        {
          id: 'reception',
          name: 'Reception',
          entries: [
            {
              id: 'welcome-greeting',
              title: 'Welcome Greeting',
              content: 'Good [morning/afternoon/evening], welcome to our hotel! How may I assist you today?',
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'training-host',
      name: 'Training Host',
      categories: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  lastUpdated: new Date()
};

export function useHandbook() {
  const [handbookData, setHandbookData, resetData] = useLocalStorage<HandbookData>('handbook-data', DEFAULT_DATA);

  const addPage = (name: string) => {
    const newPage: HandbookPage = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      categories: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setHandbookData(prev => ({
      ...prev,
      pages: [...prev.pages, newPage],
      lastUpdated: new Date()
    }));
  };

  const deletePage = (pageId: string) => {
    setHandbookData(prev => ({
      ...prev,
      pages: prev.pages.filter(page => page.id !== pageId),
      lastUpdated: new Date()
    }));
  };

  const addCategory = (pageId: string, name: string) => {
    const newCategory: Category = {
      id: `${pageId}-${name.toLowerCase().replace(/\s+/g, '-')}`,
      name,
      entries: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setHandbookData(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === pageId 
          ? { ...page, categories: [...page.categories, newCategory], updatedAt: new Date() }
          : page
      ),
      lastUpdated: new Date()
    }));
  };

  const deleteCategory = (pageId: string, categoryId: string) => {
    setHandbookData(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === pageId 
          ? { 
              ...page, 
              categories: page.categories.filter(cat => cat.id !== categoryId),
              updatedAt: new Date()
            }
          : page
      ),
      lastUpdated: new Date()
    }));
  };

  const addEntry = (pageId: string, categoryId: string, title: string, content: string) => {
    const newEntry: TextEntry = {
      id: `${categoryId}-${Date.now()}`,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setHandbookData(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === pageId 
          ? {
              ...page,
              categories: page.categories.map(cat => 
                cat.id === categoryId 
                  ? { ...cat, entries: [...cat.entries, newEntry], updatedAt: new Date() }
                  : cat
              ),
              updatedAt: new Date()
            }
          : page
      ),
      lastUpdated: new Date()
    }));
  };

  const updateEntry = (pageId: string, categoryId: string, entryId: string, title: string, content: string) => {
    setHandbookData(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === pageId 
          ? {
              ...page,
              categories: page.categories.map(cat => 
                cat.id === categoryId 
                  ? {
                      ...cat,
                      entries: cat.entries.map(entry => 
                        entry.id === entryId 
                          ? { ...entry, title, content, updatedAt: new Date() }
                          : entry
                      ),
                      updatedAt: new Date()
                    }
                  : cat
              ),
              updatedAt: new Date()
            }
          : page
      ),
      lastUpdated: new Date()
    }));
  };

  const deleteEntry = (pageId: string, categoryId: string, entryId: string) => {
    setHandbookData(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === pageId 
          ? {
              ...page,
              categories: page.categories.map(cat => 
                cat.id === categoryId 
                  ? { 
                      ...cat, 
                      entries: cat.entries.filter(entry => entry.id !== entryId),
                      updatedAt: new Date()
                    }
                  : cat
              ),
              updatedAt: new Date()
            }
          : page
      ),
      lastUpdated: new Date()
    }));
  };

  const updatePage = (pageId: string, name: string) => {
    setHandbookData(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === pageId 
          ? { ...page, name, updatedAt: new Date() }
          : page
      ),
      lastUpdated: new Date()
    }));
  };

  const updateCategory = (pageId: string, categoryId: string, name: string) => {
    setHandbookData(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === pageId 
          ? {
              ...page,
              categories: page.categories.map(cat => 
                cat.id === categoryId 
                  ? { ...cat, name, updatedAt: new Date() }
                  : cat
              ),
              updatedAt: new Date()
            }
          : page
      ),
      lastUpdated: new Date()
    }));
  };

  const resetToDefault = () => {
    resetData();
  };

  return {
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
  };
}