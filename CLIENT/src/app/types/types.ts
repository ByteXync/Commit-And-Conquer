export interface Internship {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  stipend: number;
  duration: number;
}

export interface Blog {
  id: number;
  user_id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

