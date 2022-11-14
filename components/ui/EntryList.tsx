import { Paper } from "@mui/material";
import React, { DragEvent, FC, useContext, useMemo } from "react";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";

import { EntryContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
interface Props {
  status: EntryStatus;
  height?: string;
}
export const EntryList: FC<Props> = ({
  status,
  height = "calc(100vh - 220px)",
}) => {
  const { entries, updateEntry } = useContext(EntryContext);
  const { isDragging, toggleDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((en) => en.status === status),
    [entries, status]
  );

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("id");
    const ent = entries.find((e) => e._id === id)!;
    ent.status = status;
    updateEntry(ent);
    toggleDragging(false);
  };

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      style={{
        borderRadius: "10px",
        border: isDragging ? "2px dashed #2196f3" : "none",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 1,
          height,
          overflowY: "auto",
          opacity: isDragging ? 0.7 : 1,
        }}
        className="scroll"
      >
        {entriesByStatus.map((entry) => (
          <EntryCard key={entry._id} entry={entry} />
        ))}
      </Paper>
    </div>
  );
};
