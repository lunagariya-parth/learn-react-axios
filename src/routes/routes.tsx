import { AxiosGET } from "@/pages/axiosGET";
import Home from "@/pages/Home";
import UseReducerPage from "@/pages/reducer";
import ReduxToolkitPage from "@/pages/redux";
import ProductDetail from "@/pages/redux/product-detail";
import { store } from "@/pages/redux/store/store";
import { Provider } from "react-redux";

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
  {
    path: "products",
    name: "ReduxToolkit",
    component: <ReduxToolkitPage />,
  },
  {
    path: "products/:productId",
    name: "ReduxToolkit",
    component: (
      <Provider store={store}>
        <ProductDetail />
      </Provider>
    ),
  },
];
