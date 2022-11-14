import { Box, Button, TextField } from "@mui/material";
import React, { FC, useContext, useState } from "react";
import { EntryContext } from "../../context/entries";

interface Props {
  toggleEditable: () => void;
}
export const NewEntry: FC<Props> = ({ toggleEditable }) => {
  const [value, setValue] = useState("");
  const [touch, setTouch] = useState(false);
  const { addNewEntry } = useContext(EntryContext);

  const onSave = () => {
    if (value.trim().length <= 0) return;
    addNewEntry(value);
    setValue("");
    toggleEditable();
  };

  return (
    <Box sx={{ padding: "0 1rem" }}>
      <TextField
        sx={{ width: "100%", marginBottom: 1 }}
        label="Nueva tarea"
        autoFocus
        multiline
        helperText="Ingrese su nueva tarea"
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouch(true)}
        error={value.trim().length <= 0 && touch}
      />
      <Box display="flex" justifyContent="space-between">
        <Button color="error" onClick={toggleEditable}>
          Cancelar
        </Button>
        <Button onClick={onSave}>Guardar</Button>
      </Box>
    </Box>
  );
};
