export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
}

export interface CartItem extends Product {
  quantity: number;
}
export interface State {
  products: Product[];
  cart: CartItem[];
}

interface Action {
  type: string;
  payload: State | Product[] | Product | number | { productId: number };
}
const initialState: State = {
  products: [],
  cart: [],
};
const ProductReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const ProductToAdd = action.payload as Product;
      const ProductIsPresent = state.cart.find((item) => item.id === ProductToAdd.id);
      if (ProductIsPresent) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (item.id === ProductToAdd.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...ProductToAdd, quantity: 1 }],
      };
    }
    case "ADD_QUANTITY_BY_ONE": {
      const { productId } = action.payload as { productId: number };
      const ProductToUpdate = state.cart.find((item) => item.id === productId);
      if (!ProductToUpdate || ProductToUpdate.quantity <= 0) return state;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      };
    }
    case "REMOVE_QUANTITY_BY_ONE": {
      const { productId } = action.payload as { productId: number };
      const ProductToUpdate = state.cart.find((item) => item.id === productId);
      if (!ProductToUpdate || ProductToUpdate.quantity <= 0) return state;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      };
    }
    case "REMOVE_FROM_CART": {
      const productId = action.payload as number;
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== productId),
      };
    }
    case "SET_PRODUCTS": {
      return {
        ...state,
        products: action.payload as Product[],
      };
    }
    default:
      return state;
  }
};

export { initialState, ProductReducer };
