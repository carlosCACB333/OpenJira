import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { DragEvent, FC, useContext } from "react";
import { UIContext } from "../../context/ui";
import { Entry } from "../../interfaces";
import { DateTime } from "luxon";

interface Props {
  entry: Entry;
}
export const EntryCard: FC<Props> = ({ entry }) => {
  const { toggleDragging } = useContext(UIContext);

  const created = DateTime.fromISO(entry.createdAt);
  const now = DateTime.now();
  const ho = DateTime.now().minus(now.diff(created)).toRelative();

  console.log();

  const router = useRouter();

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData("id", entry._id);
    toggleDragging(true);
  };
  const onDragEnd = (e: DragEvent) => {
    toggleDragging(false);
  };
  return (
    <Card
      variant="outlined"
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={() => router.push(`/entries/${entry._id}`)}
    >
      <CardActionArea>
        <CardContent>
          <Typography>{entry.description}</Typography>

          <CardActions sx={{ display: "flex", justifyContent: "end" }}>
            <Typography variant="subtitle2">{ho}</Typography>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
