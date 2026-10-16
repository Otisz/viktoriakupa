import type { Config } from "ziggy-js";

export interface Auth {
  user: User;
}

export interface SharedData<T extends object = object> extends T {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
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

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // This allows for additional properties...
}

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
