export const SORT_OPTIONS: SortOption[] = [
  { id: "latest", name: "최신순" },
  { id: "popular", name: "인기순" },
  { id: "comments", name: "댓글순" },
] as const;

export const DASHBOARD_MESSAGE = {
  error: "카테고리의 포스트를 불러오는 데 실패했습니다.",
  none: "아직 작성된 포스트가 없어요...\n이 카테고리의 첫 포스팅을 올려보세요!",
} as const;
