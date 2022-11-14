import { createContext, FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntryReducer } from './EntryReducer';
import { ax } from '../../api';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

interface EntryContextProps {
  entries: Entry[];
  addNewEntry: (desc: string) => void;
  updateEntry: (e: Entry) => void;
  deleteEntry: (e: string) => void;
}

export interface EntryState {
  entries: Entry[];
}

export const ENTRY_INITIAL_STATE: EntryState = {
  entries: [],
};

export const EntryContext = createContext<EntryContextProps>({} as EntryContextProps);

export const EntryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(EntryReducer, ENTRY_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const addNewEntry = async (description: string) => {
    const res = await ax.post<Entry>('/entries', { description });
    dispatch({
      type: '[Entry] add-entry',
      payload: res.data,
    });
    enqueueSnackbar('Se creó correctamente !!', {
      variant: 'info',
      anchorOrigin: { horizontal: 'right', vertical: 'top' },
    });
  };

  const updateEntry = async (entry: Entry) => {
    const res = await ax.put<Entry>(`/entries/update?id=${entry._id}`, entry);
    dispatch({ type: '[Entry] update-entry', payload: res.data });
    enqueueSnackbar('Se actualizó correctamente !!', {
      variant: 'success',
      anchorOrigin: { horizontal: 'right', vertical: 'top' },
    });
  };

  const deleteEntry = async (id: string) => {
    try {
      const res = await ax.delete(`/entries/delete?id=${id}`);
      dispatch({ type: '[Entry] delete-entry', payload: id });
      enqueueSnackbar('Se eliminó correctamente !!', {
        variant: 'success',
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
      });
      router.replace('/');
    } catch (error) {
      const e = error as AxiosError<{ msg: string }>;
      enqueueSnackbar(e.response?.data.msg || '', {
        variant: 'error',
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
      });
    }
  };

  const refreshEntries = () => {
    ax.get<Entry[]>('/entries').then((res) => {
      dispatch({ type: '[Entry] load-entry', payload: res.data });
    });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntryContext.Provider value={{ ...state, addNewEntry, updateEntry, deleteEntry }}>
      {children}
    </EntryContext.Provider>
  );
};
