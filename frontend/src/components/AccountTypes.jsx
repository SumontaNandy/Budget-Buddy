import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function AccountTypes() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
      MUI
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/" onClick={handleClick}>
      Core
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];

  return (
    <Breadcrumbs m={1} separator="›" aria-label="breadcrumb">
        {breadcrumbs}
    </Breadcrumbs>
  );
}