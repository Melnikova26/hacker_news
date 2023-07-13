import { Typography, Button } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styled from "@mui/styled-engine-sc";
import { getNews } from "../../hook/http.hook";
const CommentContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 96%;
`;
interface CommentIDProp {
  id: number;
  getTime: (arg: number) => string;
}
interface CommentItemData {
  text: string;
  by: string;
  time: number;
  kids: number[];
}
function Comments({ id, getTime }: CommentIDProp) {
  const CustomButton = styled(Button)`
    text-align: start;
    text-transform: none;
    background-color: #fff;
  `;
  const [expand, setExpand] = useState(false);
  const [commentItem, setCommentItem] = useState<CommentItemData>({
    text: "",
    by: "",
    time: 0,
    kids: [],
  });
  useEffect(() => {
    getNews(id).then(({ data }) => data && setCommentItem(data));
    console.log(commentItem);
  }, []);
  const getExpand = () => {
    setExpand(!expand);
  };
  const RotateIcon = styled(ExpandLessIcon)`
    transform: ${expand ? "rotate(180deg)" : "rotate(0)"};
  `;
  const { text, by, time, kids } = commentItem;

  const resultTime = useMemo(() => {
    return getTime(time);
  }, [time]);
  return (
    <CommentContainer>
      <CustomButton
        color="inherit"
        startIcon={<RotateIcon />}
        sx={{
          width: "98%",
          mt: 2,
          textTransform: "none",
          display: "flex",
          justifyContent: "start",
        }}
        onClick={getExpand}
      >
        <Typography variant="caption" component="div">
          {by} {resultTime} ago.
          <Typography variant="subtitle2" component="div">
            {text}
          </Typography>
        </Typography>
      </CustomButton>
      {expand && kids
        ? kids.map((id) => {
            return <Comments key={id} id={id} getTime={getTime} />;
          })
        : null}
    </CommentContainer>
  );
}
export default Comments;
