import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Layout } from "@/components/Layout";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "유저 이상 행위 탐지 대시보드",
  description: "운영자를 위한 분석 도구",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
