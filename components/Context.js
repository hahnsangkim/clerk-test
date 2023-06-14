import React, {createContext, useReducer, useContext} from 'react';
const RootContext = createContext();

const initialState = {
  linkSuccess: false,
  isItemAccess: true,
  isPaymentInitiation: false,
  linkToken: "",
  accessToken: null,
  itemId: null,
  isError: false,
  backend: true,
  products: ["transactions"],
  linkTokenError: {
    error_type: "",
    error_code: "",
    error_message: "",
  },
};

function rootReducer(state, action) {
  switch (action.type) {
    case 'SET_STATE': {
      return {
        ...state,
        accessToken: action.state.accessToken,
        itemId: action.state.itemId,
      };
    }
    case 'item_access': {
      return {
        ...state,
        isItemAccess: action.state.isItemAccess,
      };
    }
    case 'products': {
      return {
        ...state,
        products: action.state.products,
        isPaymentInitiation: action.state.isPaymentInitiation,
      };
    }
    case 'backend': {
      return {
        ...state,
        backend: action.state.backend,
      };
    }
    case 'access_token': {
      return {
        ...state,
        accessToken: action.state.accessToken,
        itemId: action.state.itemId,
        isItemAccess: action.state.isItemAccess,
      };
    }
    case 'link_token': {
      return {
        ...state,
        linkToken: action.state.linkToken,
      };
    }
    case 'link_success': {
      return {
        ...state,
        linkSuccess: action.state.linkSuccess,
      };
    }
    case 'link_error': {
      return {
        ...state,
        linkToken: action.state.linkToken,
        linkTokenError: action.state.linkTokenError,
      };
    }
    default:  
      return state;
  }
}

function RootProvider(props) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const value = {state, dispatch};
  return (
    <RootContext.Provider value={value}>
        {props.children}
    </RootContext.Provider>
  );
}
function useRoot() {
  const context = useContext(RootContext);
  if (context === undefined) {
    throw new Error('useRoot must be used within a RootProvider');
  }
  return context;
}

export {RootProvider, useRoot};
