import PickDataGrid from "@/components/PickDataGrid/PickDataGrid";
import { Box, Typography } from "@mui/material";

 const Page = () => {


    return (
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
  
          <PickDataGrid />
        </Box>
    )
}
export default Page;