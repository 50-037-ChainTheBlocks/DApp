import React from 'react';
import { createContext, Dispatch, useReducer } from 'react';
import { ApplicationState } from './type';

const initialState: ApplicationState = {
  username: null,
  role: null,
  isLogin: false,
};

const AppContext = createContext<{
  state: ApplicationState;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const reducer = (
  state: ApplicationState,
  action: any | null
): ApplicationState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.data['username'],
        role: action.data['role'],
        isLogin: action.data['isLogin'],
      };
    default:
      return initialState;
  }
};

const AppContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
