export interface TextEntry {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  entries: TextEntry[];
  createdAt: Date;
  updatedAt: Date;
}

export interface HandbookPage {
  id: string;
  name: string;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
}

export interface HandbookData {
  pages: HandbookPage[];
  lastUpdated: Date;
}