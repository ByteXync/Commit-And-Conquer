import { Internship, Blog } from "../app/types/types";

export async function fetchSearchResults(query: string): Promise<{ internships: Internship[]; blogs: Blog[] }> {
  const response = await fetch(`http://localhost:8000/search?query=${query}`);
  return await response.json();
}

