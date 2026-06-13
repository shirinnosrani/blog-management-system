package com.blog.mapper;

import com.blog.dto.BlogResponse;
import com.blog.entity.Blog;
import org.springframework.stereotype.Component;

@Component
public class BlogMapper {

    public BlogResponse toResponse(Blog blog) {
        int commentCount = blog.getComments() != null ? blog.getComments().size() : 0;
        return BlogResponse.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .content(blog.getContent())
                .createdAt(blog.getCreatedAt())
                .authorId(blog.getUser().getId())
                .authorName(blog.getUser().getFullName())
                .commentCount(commentCount)
                .build();
    }
}
