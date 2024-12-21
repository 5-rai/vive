export const POST_TEXT = {
  noComment: "댓글이 아직 없어요...\n이 포스팅의 첫 번째 댓글을 달아주세요!",
} as const;

export const POST_PLACEHOLDER = {
  comment: "댓글을 적어주세요",
} as const;

export const POST_TOAST_MESSAGE = {
  deleteComment: "댓글이 삭제되었습니다.",
  deleteCommentErr: "댓글 삭제에 실패했습니다.",
  deletePost: "포스팅이 삭제되었습니다.",
  deletePostErr: "포스팅 삭제에 실패했습니다.",
} as const;
