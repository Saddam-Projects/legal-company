export interface Blog {
  id: string;
  title: string;
  cover: string;
  content: string;
  category: Category;
  category_id: string;
  author: string;
  slug: string;
  description: string;
  keywords: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface BlogImage {
  id: string;
  url: string;
}
