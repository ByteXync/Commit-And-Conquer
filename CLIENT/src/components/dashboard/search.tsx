import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { fetchSearchResults } from "../../lib/api";
import { Internship, Blog } from "../../app/types/types";

export function Search() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<{ internships: Internship[]; blogs: Blog[] }>({
    internships: [],
    blogs: [],
  });

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length >= 2) {
        fetchSearchResults(query).then(setResults);
      } else {
        setResults({ internships: [], blogs: [] }); // Clear results when input is empty
      }
    }, 500); // Debounce delay

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search Internships & Blogs..."
        className="w-full pl-8 md:w-[300px] lg:w-[400px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Only show results if there are internships or blogs */}
      {(results.internships.length > 0 || results.blogs.length > 0) && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-md shadow-lg p-2">
          {results.internships.length > 0 && (
            <>
              <h3 className="text-sm font-bold text-gray-700">Internships</h3>
              <ul className="text-sm text-gray-600">
                {results.internships.map((i) => (
                  <li key={i.id} className="p-1 hover:bg-gray-100">
                    <strong>{i.title}</strong> - {i.company} ({i.location})
                  </li>
                ))}
              </ul>
            </>
          )}
          {results.blogs.length > 0 && (
            <>
              <h3 className="text-sm font-bold text-gray-700 mt-2">Blogs</h3>
              <ul className="text-sm text-gray-600">
                {results.blogs.map((b) => (
                  <li key={b.id} className="p-1 hover:bg-gray-100">
                    <strong>{b.title}</strong> - by {b.author} ({b.date})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

