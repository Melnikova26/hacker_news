import { Story, StoryTypes } from "./types";
import { getNewsById, getNewsByIds } from "./stories";

/**
 *
 * @param commentId
 * @returns
 */
export const getCommentById = async (
  commentId: number
): Promise<Story | null> => {
  const storyComment: Story | null = await getNewsById(commentId);

  if (storyComment != null && storyComment?.type == StoryTypes.COMMENT) {
    return storyComment;
  }

  return null;
};

/**
 *
 * @param parentStory
 * @returns
 */
export const getCommentsByParentStory = async (
  parentStory: Story
): Promise<Story[]> => {
  const commentsIDs = parentStory?.kids ?? [];

  const comments: Story[] = await getNewsByIds(commentsIDs);

  return comments;
};
