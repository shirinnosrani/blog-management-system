package com.blog.service;

import com.blog.dto.*;
import java.util.List;

public interface CommentService {
    CommentResponse createComment(CommentRequest request, String userEmail);
    CommentResponse updateComment(Long id, String commentText, String userEmail);
    void deleteComment(Long id, String userEmail);
    List<CommentResponse> getCommentsByBlog(Long blogId);
}
