export interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId: number;
  authorName: string;
  commentCount: number;
}

export interface BlogRequest {
  title: string;
  content: string;
}
