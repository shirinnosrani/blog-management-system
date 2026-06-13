package com.blog.mapper;

import com.blog.dto.CommentResponse;
import com.blog.entity.Comment;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

    public CommentResponse toResponse(Comment comment) {
        return CommentResponse.builder()
                .id(comment.getId())
                .comment(comment.getComment())
                .createdAt(comment.getCreatedAt())
                .userId(comment.getUser().getId())
                .userName(comment.getUser().getFullName())
                .blogId(comment.getBlog().getId())
                .build();
    }
}
