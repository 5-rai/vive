const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const targetDate = new Date(dateString);
  const diffInMilliseconds = now.getTime() - targetDate.getTime();

  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays >= 1) return `${diffInDays}일 전`;
  else if (diffInHours >= 1) return `${diffInHours}시간 전`;
  else if (diffInMinutes >= 1) return `${diffInMinutes}분 전`;
  else return "방금 전";
};

export default formatTimeAgo;
