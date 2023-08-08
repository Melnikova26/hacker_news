import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import styled from "@mui/styled-engine-sc";

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Header: React.FC = () => {
  return (
    <AppBar
      sx={{ backgroundColor: "#FFC173", zIndex: "1", position: "static" }}
    >
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          <StyledLink to="/">Hacker News</StyledLink>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
