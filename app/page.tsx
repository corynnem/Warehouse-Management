

import { Box, Typography } from "@mui/material";
import WarehouseGrid from "@/components/DataGrid/DataGrid";
import { DataGridProvider } from "@/context/DataGridContext";

const Home = () => {
  


  return (
    <DataGridProvider>
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "10px",
            alignContent: "center",
            width: "100%",
          }}
        >
          <Typography sx={{ fontSize: "2rem" }}>Pick</Typography>
        </Box>

        <WarehouseGrid />
      </Box>
    </div>
    </DataGridProvider>
  );
};
export default Home;
