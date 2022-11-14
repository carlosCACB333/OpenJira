import { createContext, FC, PropsWithChildren, useReducer } from 'react';

import { UIReducer } from './UIReducer';

interface UIContextProps {
  isAdding: boolean;
  toggleAdding: (isAdd: boolean) => void;

  isDragging: boolean;
  toggleDragging: (isd: boolean) => void;

  isDark: boolean;
  toggleDark: () => void;
}

export interface UIState {
  isAdding: boolean;
  isDragging: boolean;
  isDark: boolean;
}

export const UI_INITIAL_STATE: UIState = {
  isAdding: false,
  isDragging: false,
  isDark: true,
};

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const toggleAdding = (isAdding: boolean) => {
    dispatch({ type: 'UI-toggle-isadding', payload: isAdding });
  };

  const toggleDragging = (isDd: boolean) => {
    dispatch({ type: 'UI-toggle-dragging', payload: isDd });
  };

  const toggleDark = () => dispatch({ type: 'UI-toggle-dark' });

  return (
    <UIContext.Provider value={{ ...state, toggleAdding, toggleDragging, toggleDark }}>{children}</UIContext.Provider>
  );
};
