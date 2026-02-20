"use client"

import PickDataGrid from "@/components/PickDataGrid/PickDataGrid";
import { Box, Typography } from "@mui/material";
import useStyles from "../appStyles";

const Page = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.body}>
      <Box className={classes.title}>
        <Typography className={classes.fontStyles}>Pick</Typography>
      </Box>

      <PickDataGrid />
    </Box>
  );
};
export default Page;
