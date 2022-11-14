import { UIState } from './UIContext';

type UIAction =
  | { type: 'UI-toggle-isadding'; payload: boolean }
  | { type: 'UI-toggle-dragging'; payload: boolean }
  | { type: 'UI-toggle-dark' };

export const UIReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'UI-toggle-isadding':
      return { ...state, isAdding: action.payload };

    case 'UI-toggle-dragging':
      return { ...state, isDragging: action.payload };

    case 'UI-toggle-dark':
      return { ...state, isDark: !state.isDark };

    default:
      return state;
  }
};
