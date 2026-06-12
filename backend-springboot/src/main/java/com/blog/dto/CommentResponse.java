package com.blog.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponse {
    private Long id;
    private String comment;
    private LocalDateTime createdAt;
    private Long userId;
    private String userName;
    private Long blogId;
}
