import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import styled from "@mui/styled-engine-sc";
const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;
const Header = () => {
  return (
    <AppBar sx={{ backgroundColor: "#FFC173", zIndex: "1" }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          <StyledLink to="/">Hacker News</StyledLink>
        </Typography>

        {/* <Button
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
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
