import { Typography, Button, SvgIconProps, SvgIcon } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styled from "@mui/styled-engine-sc";
import { useAppDispatch, useAppSelector } from "../../store/hooksTyped";
import { fetchCommentItem } from "../../store/reducer";

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

const CustomButton = styled(Button)`
  text-align: start;
  text-transform: none;
  background-color: #fff;
`;

const RotateIcon = styled(ExpandLessIcon)<{ expand: string }>`
  transform: ${({ expand }) =>
    expand === "true" ? "rotate(180deg)" : "rotate(0)"};
`;

const Comments: React.FC<CommentIDProp> = ({ id, getTime }) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const commentItem = useAppSelector((state) =>
    state.newsIds.comments?.find((item) => item.id === id)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCommentItem(id));
  }, []);

  const toggleExpand = () => {
    setIsExpand(!isExpand);
  };

  const { text, by, time, kids } = commentItem ?? {};

  const resultTime = time ? getTime(time) : 0;

  return (
    <CommentContainer>
      <CustomButton
        color="inherit"
        startIcon={<RotateIcon expand={isExpand ? "true" : "false"} />}
        sx={{
          width: "98%",
          mt: 2,
          textTransform: "none",
          display: "flex",
          justifyContent: "start",
        }}
        onClick={toggleExpand}
      >
        <Typography variant="caption" component="div">
          {by} {resultTime} ago.
          <Typography variant="subtitle2" component="div">
            {text}
          </Typography>
        </Typography>
      </CustomButton>
      {isExpand && kids
        ? kids.map((id) => {
            return <Comments key={id} id={id} getTime={getTime} />;
          })
        : null}
    </CommentContainer>
  );
};
export default Comments;
