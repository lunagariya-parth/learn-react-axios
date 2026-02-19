import { AxiosGET } from "@/pages/axiosGET";
import Home from "@/pages/Home";
import UseReducerPage from "@/pages/reducer";

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
  {
    path: "use-reducer",
    name: "Reducer",
    component: <UseReducerPage />,
  },
];
