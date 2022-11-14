import { Card, CardContent, CardHeader, Grid, IconButton } from '@mui/material';
import type { NextPage } from 'next';
import Layout from '../components/layouts/Layout';
import { EntryList, NewEntry } from '../components/ui';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box } from '@mui/system';
import { UIContext } from '../context/ui';
import { useContext } from 'react';

const Home: NextPage = () => {
  const { isAdding, toggleAdding } = useContext(UIContext);

  return (
    <Layout title="OpenJira">
      <Grid container spacing={2} height="calc(100vh - 70px)">
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title={
                <Box display="flex" justifyContent="center" alignItems="center">
                  Pendientes
                  <IconButton color="primary" onClick={() => toggleAdding(!isAdding)}>
                    {isAdding ? <AddCircleIcon /> : <AddCircleOutlineIcon />}
                  </IconButton>
                </Box>
              }
              sx={{ color: 'primary.main', textAlign: 'center' }}
            />

            {isAdding && <NewEntry toggleEditable={() => toggleAdding(!isAdding)} />}

            <CardContent sx={{ height: '100%' }}>
              <EntryList status="pending" height={isAdding ? 'calc(100vh - 330px)' : 'calc(100vh - 220px)'} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="En progreso" sx={{ color: 'primary.main', textAlign: 'center' }} />
            <CardContent sx={{ height: '100%' }}>
              <EntryList status="in-progress" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Finalizadas" sx={{ color: 'primary.main', textAlign: 'center' }} />
            <CardContent sx={{ height: '100%' }}>
              <EntryList status="finished" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
