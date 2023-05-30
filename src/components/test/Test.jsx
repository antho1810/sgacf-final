import React, { useContext, createContext, useReducer, Children } from "react";

const StoreContext = createContext();

const StoreProvider = ({ children }) => (
  <div>
    <StoreContext.Provider value={useReducer(StoreReducer, initialStore)}>
      {children}
    </StoreContext.Provider>
  </div>
);

const useStore = () => useContext(StoreContext)[0];
const useDispatch = () => useContext(StoreContext)[1];

const initialStore = {
  user: { id: 1, name: "Luis" },
  products: [
    { id: 1, title: "product #1" },
    { id: 2, title: "product #2" },
  ],
};

const types = {
  authLogin: "auth - login",
  authLogout: "auth - logout",
  productDeleteAll: "product - delete all",
  productChange: "product - change",
};

const StoreReducer = (state, action) => {
  switch (action.type) {
    case types.authLogout:
      return {
        ...state,
        user: null,
      };
    case types.authLogin:
      return {
        ...state,
        user: action.payload,
      };
    case types.productDeleteAll:
      return {
        ...state,
        products: [],
      };

    case types.productChange:
      return {
        ...state,
        products: [{ id: 3, title: "numero 3" }],
      };
    default:
      return state;
  }
};

const MyComponent = () => {
  // const [store, dispatch] = useContext(StoreContext);
  const { user, products } = useStore();
  const dispatch = useDispatch();

  return (
    <div>
      <h1>MyComponent</h1>
      <h2>User: {user?.name}</h2>
      <button onClick={() => dispatch({ type: types.authLogout })}>
        logout
      </button>
      <button
        onClick={() =>
          dispatch({ type: types.authLogin, payload: { id: 1, name: "Luis" } })
        }
      >
        login
      </button>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: types.productDeleteAll })}>
        Delete all
      </button>
      <button onClick={() => dispatch({ type: types.productChange })}>
        Change
      </button>
    </div>
  );
};

const Formulario = () => {
  return (
    <StoreProvider>
      <MyComponent></MyComponent>
    </StoreProvider>
  );
};

export default Formulario;
