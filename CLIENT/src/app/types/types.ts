export interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  stipend: number;
  duration: number;
  admin?: {
    name: string;
    email: string;
  };
}

export interface Blog {
  id: number;
  user_id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

