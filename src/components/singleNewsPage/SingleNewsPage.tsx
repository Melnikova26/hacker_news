import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Comments from "../comments/Comments";
import { Paths } from "../app/App";
import getTime from "../../utils/timeModify";
import { useAppSelector, useAppDispatch } from "../../store/hooksTyped";
import { fetchNewsItem } from "../../store/reducer";

function SingleNewsPage() {
  const { id } = useParams<string>();
  const dispatch = useAppDispatch();
  const newsItem = useAppSelector((state) => state.newsIds.storyItem);
  useEffect(() => {
    if (id) dispatch(fetchNewsItem(id));
  }, []);

  const { title, by, time, url, descendants, kids } = newsItem ?? {};

  const resultTime = useMemo(() => {
    if (time) return getTime(time);
  }, [time]);

  return (
    <Container sx={{ pt: 15, backgroundColor: "#fff" }}>
      <Box display="flex" justifyContent="space-between">
        <Link to={Paths.MAIN}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#A65C00",
              transform: "translateY(-80%)",
              "&:hover": {
                backgroundColor: "#BF8030",
              },
            }}
            startIcon={<ArrowBackIcon />}
          >
            To main
          </Button>
        </Link>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#A65C00",
            position: "fixed",
            right: "100px",
            top: "0",
            transform: "translateY(40%)",
            zIndex: "5",
            "&:hover": {
              backgroundColor: "#BF8030",
            },
          }}
          startIcon={<AutorenewIcon />}
          onClick={() => {
            if (id) dispatch(fetchNewsItem(id));
          }}
        >
          Update Comments
        </Button>
      </Box>

      <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        {title}
        <Typography variant="subtitle2" component="div">
          <Link to={url!}>{url}</Link>
        </Typography>
        <Typography variant="subtitle2" component="div">
          Author: {by}. Created: {resultTime} ago.
        </Typography>
        <Typography variant="subtitle2" component="div">
          Comments: {descendants}.
        </Typography>
      </Typography>
      {kids
        ? kids.map((id) => {
            return <Comments key={id} id={id} getTime={getTime} />;
          })
        : null}
    </Container>
  );
}
export default SingleNewsPage;
