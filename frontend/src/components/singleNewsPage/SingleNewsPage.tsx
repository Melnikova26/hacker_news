import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Comments from "../comments/Comments";
import { Paths } from "../app/App";
import getTime from "../../utils/timeModify";
import { useAppSelector, useAppDispatch } from "../../store/hooksTyped";
import { fetchNewsItems } from "../../store/reducer";
import Spinner from "../spinner/Spinner";

function SingleNewsPage() {
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const { id } = useParams<string>();

  const newId = +id!;

  const loading = useAppSelector((state) => state.newsIds.newsLoadingStatus);
  const newsItem = useAppSelector((state) =>
    state.newsIds.newsItems?.find((item) => item.id == newId)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNewsItems());
    const IntervalId = setInterval(() => {
      setShouldUpdate(true);
      setShouldUpdate(false);
    }, 60000);
    return () => clearInterval(IntervalId);
  }, []);
  useEffect(() => {
    if (shouldUpdate) {
      dispatch(fetchNewsItems());
      setShouldUpdate(false);
    }
  }, [dispatch, shouldUpdate]);

  const { title, by, time, url, descendants, kids } = newsItem ?? {};

  const resultTime = getTime(time!);

  if (loading === "loading") {
    return <Spinner />;
  } else if (loading === "error") {
    return <h5>Ошибка загрузки</h5>;
  }

  return (
    <Container sx={{ pt: 5, backgroundColor: "#fff" }}>
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
            zIndex: "8",
            "&:hover": {
              backgroundColor: "#BF8030",
            },
          }}
          startIcon={<AutorenewIcon />}
          onClick={() => setShouldUpdate(true)}
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
