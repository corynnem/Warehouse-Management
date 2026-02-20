"use client"

import PackDataGrid from "@/components/PackDataGrid/PackDataGrid";

import { Box, Typography } from "@mui/material";
import useStyles from "../appStyles";

const Page = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.body}>
      <Box className={classes.title}>
        <Typography className={classes.fontStyles}>Pack</Typography>
      </Box>

      <PackDataGrid/>
    </Box>
  );
};
export default Page;
