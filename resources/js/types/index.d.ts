export interface SharedData<T extends object = object> extends T {
  name: string;
  documentTypes: Record<string, string>;
}

export type Pagination<T> = {
  current_page: number;
  current_page_url: string;
  data: T[];
  first_page_url: string;
  from: number;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
};

export interface DocumentType {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  title: string;
  type: "rule" | "competition";
  file_name: string;
  file_path: string;
  file_url: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  featured_image: string;
  featured_image_url: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Club {
  id: string;
  name: string;
  url: string | null;
  image_paths: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}
