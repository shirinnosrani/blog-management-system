package com.blog.mapper;

import com.blog.dto.UserProfileResponse;
import com.blog.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserProfileResponse toResponse(User user, int totalBlogs, int totalComments) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .totalBlogs(totalBlogs)
                .totalComments(totalComments)
                .build();
    }
}
