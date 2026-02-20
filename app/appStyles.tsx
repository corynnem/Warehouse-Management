import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  body: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%",
  },

  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10px",
    alignContent: "center",
    width: "100%",
  },
  fontStyles: { fontSize: "2rem" },
}));
export default useStyles;
