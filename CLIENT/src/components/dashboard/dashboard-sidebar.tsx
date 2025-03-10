"use client"; // Add this directive at the top of the file

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, FileText, LogOut, Newspaper, Menu } from "lucide-react";
import { useState } from "react";

export function BasicSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-${collapsed ? '16' : '64'} bg-gray-800 text-white transition-width duration-300`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 bg-gray-900 px-4">
          <h1 className={`text-xl font-bold ${collapsed ? 'hidden' : ''}`}>Dashboard</h1>
          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/internships" className={`flex items-center gap-2 p-2 rounded-md ${pathname === "/internships" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
                <Briefcase className="h-5 w-5" />
                <span className={`${collapsed ? 'hidden' : ''}`}>Internships</span>
              </Link>
            </li>
            <li>
              <Link href="/blogs" className={`flex items-center gap-2 p-2 rounded-md ${pathname === "/blogs" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
                <Newspaper className="h-5 w-5" />
                <span className={`${collapsed ? 'hidden' : ''}`}>Blogs</span>
              </Link>
            </li>
            <li>
              <Link href="/resume" className={`flex items-center gap-2 p-2 rounded-md ${pathname === "/resume" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
                <FileText className="h-5 w-5" />
                <span className={`${collapsed ? 'hidden' : ''}`}>Resume</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button className="flex items-center gap-2 w-full p-2 rounded-md text-red-500 hover:bg-gray-700">
            <LogOut className="h-5 w-5" />
            <span className={`${collapsed ? 'hidden' : ''}`}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
