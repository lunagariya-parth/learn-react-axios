import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
  contentClass?: string;
}

export function PageWrapper({ title, children, className, contentClass }: PageWrapperProps) {
  const navigate = useNavigate();

  return (
    <div className={cn("min-h-screen bg-transparent", className)}>
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm py-3 max-w-4xl mx-auto px-4 flex items-center justify-between">
        <h2 className="text-lg">{title}</h2>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Back
          <ArrowRight size={16} />
        </Button>
      </header>

      <main className={cn("flex-1 max-w-4xl mx-auto mt-6 px-4", contentClass)}>
        <div className="border-2 border-dashed rounded-lg p-6 bg-background">{children}</div>
      </main>
    </div>
  );
}

export default PageWrapper;
