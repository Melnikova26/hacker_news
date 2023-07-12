import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#FFC173" }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Hacker News
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#A65C00",
            "&:hover": {
              backgroundColor: "#BF8030",
            },
          }}
          startIcon={<AutorenewIcon />}
        >
          Update
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
