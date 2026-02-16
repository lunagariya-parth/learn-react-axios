import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/routes/routes";

export interface Topic {
  id: string;
  title: string;
  description?: string;
}

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 p-6">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-3xl mb-2">My React Learning</h1>
        <p className="text-sm text-muted-foreground">
          A compact index of topics I learned. Click Visit to open a topic.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ROUTES.map((t) => (
          <Card key={t.name} className="p-0">
            <CardContent className="flex items-start justify-between p-4">
              <CardTitle className="text-lg font-medium line-clamp-2 text-left">{t.name}</CardTitle>

              <Button variant="outline" onClick={() => navigate(`/${t.path}`)}>
                <span className="hidden sm:inline-block"> Visit</span>
                <ArrowRight size={16} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
