import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    // mode: "light",
    primary: { main: "#CE0E2D" }, // red/maroon
    secondary: { main: "#8CA292" }, // dark maroon
    success: { main: "#7BD389" },
    background: {
      default: "#720026", // red/maroon
      paper: "#F1E3D3", //  light peach
    },
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: [
      "Avenir",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Arial",
      "Noto Sans",
      "Apple Color Emoji",
      "Segoe UI Emoji",
    ].join(","),
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 14,
          textTransform: "none",
          fontWeight: 700,
          paddingInline: 20,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: "#F1E3D3",
        },
      },
    },
  },
});
