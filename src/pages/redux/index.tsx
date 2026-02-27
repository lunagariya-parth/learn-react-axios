import PageWrapper from "@/components/ui/page-wrapper";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProductListing from "./product-listing";
export default function ReduxToolkitPage() {
  return (
    <PageWrapper
      title="cart using Redux Toolkit"
      className="h-screen overflow-hidden"
      contentClass="flex flex-col flex-1 min-h-0 h-full overflow-y-auto"
    >
      <Provider store={store}>
        <ProductListing />
      </Provider>
    </PageWrapper>
  );
}
