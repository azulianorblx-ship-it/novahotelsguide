import { useLocalStorage } from './useLocalStorage';
import { HandbookData, HandbookPage, Category, TextEntry } from '../types/handbook';

const DEFAULT_DATA: HandbookData = {
  pages: [
    {
      id: 'nova-policies',
      name: 'Nova Hotels X Policies',
      categories: [
        {
          id: 'front-desk',
          name: 'Front Desk Operations',
          entries: [
            {
              id: 'welcome-greeting',
              title: 'Nova Welcome Greeting',
              content: 'Good [morning/afternoon/evening], welcome to Nova Hotels X! My name is [Your Name], how may I provide you with exceptional service today?',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              id: 'check-in-script',
              title: 'Check-in Process',
              content: 'Thank you for choosing Nova Hotels X. I have your reservation here for [nights] nights. May I please see your ID and the credit card used for booking? I will also need to place a $50 incidental hold that will be released upon checkout.',
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'housekeeping',
          name: 'Housekeeping Standards',
          entries: [
            {
              id: 'room-cleaning-checklist',
              title: 'Nova Room Standards',
              content: 'All Nova Hotels X rooms must meet our 15-point inspection: Fresh linens, vacuumed carpets, sanitized bathroom, restocked amenities, temperature set to 72°F, curtains properly arranged, welcome amenities placed, and Nova signature touch completed.',
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
      id: 'training-protocols',
      name: 'Training Protocols',
      categories: [
        {
          id: 'new-employee',
          name: 'New Employee Orientation',
          entries: [
            {
              id: 'nova-values',
              title: 'Nova Hotels X Core Values',
              content: 'Welcome to Nova Hotels X! Our core values are: Excellence in Service, Attention to Detail, Guest-Centric Approach, Team Collaboration, and Continuous Improvement. These guide every interaction and decision.',
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