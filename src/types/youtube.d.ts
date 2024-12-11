interface YoutubeVideoType {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: ThumbnailType;
      medium: ThumbnailType?;
      high: ThumbnailType?;
      standard: ThumbnailType?;
      maxres: ThumbnailType?;
    };
    channelTitle: string;
    tags: string[];
  };
}

interface ThumbnailType {
  url: string;
  width: number;
  height: number;
}
