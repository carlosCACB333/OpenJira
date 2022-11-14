import { Box } from '@mui/system';
import Head from 'next/head';

import React, { FC, PropsWithChildren } from 'react';

import { NavBar } from '../ui';
interface Props extends PropsWithChildren {
  title?: string;
}
const Layout: FC<Props> = ({ title = '', children }) => {
  return (
    <Box sx={{ flexFlow: 1, height: '100vh' }}>
      <Head>
        <title>{title || 'OpenJira'}</title>
      </Head>
      <NavBar />

      <main style={{ padding: 5 }}>{children}</main>
    </Box>
  );
};

export default Layout;
