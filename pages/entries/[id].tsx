import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Layout from "../../components/layouts/Layout";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetServerSideProps, NextPage } from "next";
import { dbEntries } from "../../database";
import { Entry, EntryStatus } from "../../interfaces/entry";

import { EntryContext } from "../../context/entries";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

interface Props {
  entry: Entry;
}
const EntryPage: NextPage<Props> = ({ entry }) => {
  const [value, setValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touch, setTouch] = useState(false);
  const { updateEntry, deleteEntry } = useContext(EntryContext);
  const created = DateTime.fromISO(entry.createdAt);
  const now = DateTime.now();
  const ho = DateTime.now().minus(now.diff(created)).toRelative();
  const router = useRouter();

  const onSave = () => {
    updateEntry({
      _id: entry._id,
      description: value,
      status,
      createdAt: entry.createdAt,
    });
  };
  return (
    <Layout title="OpenGira | Editar">
      <Container maxWidth="sm">
        <Card>
          <CardHeader
            title={`Entrada: ${value.substring(0, 20)}  ${
              value.length < 20 ? "" : "..."
            }`}
            subheader={`Creado ${ho}`}
          />

          <CardContent>
            <FormControl fullWidth margin="normal">
              <TextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => !touch && setTouch(true)}
                fullWidth
                label="Editar entrada"
                autoFocus
                multiline
                helperText="Ingrese la entrada"
                error={touch && value.trim().length <= 0}
              />
            </FormControl>

            <FormControl margin="normal">
              <FormLabel id="demo-row-radio-buttons-group-label">
                Estado
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setStatus(e.target.value as EntryStatus)}
                value={status}
              >
                <FormControlLabel
                  value="pending"
                  control={<Radio />}
                  label="Pendiente"
                />
                <FormControlLabel
                  value="in-progress"
                  control={<Radio />}
                  label="En proceso"
                />
                <FormControlLabel
                  value="finished"
                  control={<Radio />}
                  label="Finalizado"
                />
              </RadioGroup>
            </FormControl>

            <Box
              sx={{
                marginY: "8px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                color="error"
                onClick={() =>
                  router.isFallback ? router.back() : router.push("/")
                }
              >
                Cancelar
              </Button>
              <Button onClick={onSave} disabled={value.trim().length === 0}>
                Guardar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <IconButton
        aria-label="delete"
        color="error"
        size="large"
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          borderColor: "primary.main",
          border: 1,
        }}
        onClick={() => deleteEntry(entry._id)}
      >
        <DeleteIcon />
      </IconButton>
    </Layout>
  );
};

export default EntryPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: { entry } };
};
