import { Card } from "@/components/ui/card";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden p-4 sm:px-6 lg:px-8">
      <Card className=" w-full shadow-md sm:max-w-lg p-4 sm:p-6">
        <Outlet />
      </Card>
    </div>
  );
}
