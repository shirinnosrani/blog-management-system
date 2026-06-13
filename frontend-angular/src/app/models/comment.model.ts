export interface Comment {
  id: number;
  comment: string;
  createdAt: string;
  userId: number;
  userName: string;
  blogId: number;
}

export interface CommentRequest {
  comment: string;
  blogId: number;
}
