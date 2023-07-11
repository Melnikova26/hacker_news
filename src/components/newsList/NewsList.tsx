import { Typography, ListItem, List, Divider, Container } from "@mui/material";

export default function NewsList() {
  return (
    <Container sx={{ pt: 15 }}>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-label="mailbox folders"
      >
        <ListItem>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Hacker News
            <Typography variant="subtitle2" component="div">
              1 point by mikece 0 minutes ago
            </Typography>
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Hacker News
            <Typography variant="subtitle2" component="div">
              1 point by mikece 0 minutes ago
            </Typography>
          </Typography>
        </ListItem>
        <Divider light />
        <ListItem>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Hacker News
            <Typography variant="subtitle2" component="div">
              1 point by mikece 0 minutes ago
            </Typography>
          </Typography>
        </ListItem>
        <Divider light />
      </List>
    </Container>
  );
}
