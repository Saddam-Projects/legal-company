export interface Blog {
  id: string;
  title: string;
  cover: string;
  content: string;
  category: Category;
  category_id: string;
  author: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface BlogImage {
  id: string;
  url: string;
}