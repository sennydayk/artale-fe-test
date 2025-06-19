// components/Layout.tsx
import Link from "next/link";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4">
        <h1 className="text-xl font-bold text-blue-600">
          유저 이상 행위 탐지 대시보드
        </h1>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 border-r hidden md:block">
          <nav className="space-y-2">
            <Link href="/cases" className="block hover:text-blue-500">
              케이스 목록
            </Link>
            {/* 향후 추가 메뉴 */}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};
