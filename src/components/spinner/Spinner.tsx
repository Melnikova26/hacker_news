import { CircularProgress, Box } from "@mui/material";
function Spinner() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="50vh"
    >
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
