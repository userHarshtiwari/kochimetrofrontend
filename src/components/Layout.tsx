import { ReactNode } from "react";
import { Header } from "./Header";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      <Header title={title} />
      <div className="flex">
        <Navigation />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};