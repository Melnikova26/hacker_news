import express, { Request, Response } from "express";
import { getNewsIds, getNewsByIds, getNewsById } from "../api";
import { Story } from "../api/types";
const storiesRouter = express.Router();

enum ROUTES {
  MAIN = "/",
  NEWS_PAGE = "/:id",
}

const storiesTimeSortFunction = (a: Story, b: Story): number => {
  return b.time - a.time;
};

storiesRouter.get(ROUTES.MAIN, async (req: Request, res: Response) => {
  const storiesIDs: number[] = await getNewsIds(true);
  const data: Story[] = await getNewsByIds(storiesIDs);
  const sortedData = data.sort(storiesTimeSortFunction);
  res.json({ data: sortedData });
});

storiesRouter.get(ROUTES.NEWS_PAGE, async (req: Request, res: Response) => {
  const storyId = Number(req.params.id);
  if (!storyId) {
    res.send({ data: "Please enter id" });
  }
  const storyInformation = await getNewsById(storyId);
  const comments = await getNewsByIds(storyInformation?.kids ?? []);
  const data = {
    story: storyInformation,
    comments,
  };
  res.json({ data });
});

export default storiesRouter;
