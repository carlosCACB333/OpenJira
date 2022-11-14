import { Entry } from "../../interfaces";
import { EntryState } from "./EntryContext";

type EntryAction =
  | { type: "[Entry] add-entry"; payload: Entry }
  | { type: "[Entry] update-entry"; payload: Entry }
  | { type: "[Entry] load-entry"; payload: Entry[] }
  | { type: "[Entry] delete-entry"; payload: string };

export const EntryReducer = (
  state: EntryState,
  action: EntryAction
): EntryState => {
  switch (action.type) {
    case "[Entry] add-entry":
      return { ...state, entries: [...state.entries, action.payload] };

    case "[Entry] update-entry":
      return {
        ...state,
        entries: state.entries.map((en) =>
          en._id === action.payload._id ? action.payload : en
        ),
      };

    case "[Entry] load-entry":
      return { ...state, entries: action.payload };

    case "[Entry] delete-entry":
      return {
        ...state,
        entries: state.entries.filter((e) => e._id !== action.payload),
      };
    default:
      return state;
  }
};
