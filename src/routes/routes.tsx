import { AxiosGET } from "@/pages/AxiosGET";
import Home from "@/pages/Home";

export const ROUTES = [
  {
    path: "/",
    name: "Home",
    component: <Home />,
  },
  {
    path: "axios-get",
    name: "AxiosGet",
    component: <AxiosGET />,
  },
];
