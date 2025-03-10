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