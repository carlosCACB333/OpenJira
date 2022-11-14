import { AppBar, Switch, Toolbar, Typography } from '@mui/material';
import React, { FC, useContext } from 'react';

import { UIContext } from '../../context/ui';
import Link from 'next/link';

export const NavBar: FC = () => {
  const { isDark, toggleDark } = useContext(UIContext);

  return (
    <AppBar position="static" sx={{ bgcolor: 'Background.default', height: 70 }}>
      <Toolbar>
        <Link href="/">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
            OpenGira
          </Typography>
        </Link>
        <Switch checked={isDark} onChange={() => toggleDark()} />
      </Toolbar>
    </AppBar>
  );
};
