package com.blog.service.impl;

import com.blog.dto.*;
import com.blog.entity.*;
import com.blog.exception.*;
import com.blog.mapper.CommentMapper;
import com.blog.repository.*;
import com.blog.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;

    @Override
    @Transactional
    public CommentResponse createComment(CommentRequest request, String userEmail) {
        User user = getUser(userEmail);
        Blog blog = blogRepository.findById(request.getBlogId())
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + request.getBlogId()));
        Comment comment = Comment.builder()
                .comment(request.getComment())
                .user(user)
                .blog(blog)
                .build();
        return commentMapper.toResponse(commentRepository.save(comment));
    }

    @Override
    @Transactional
    public CommentResponse updateComment(Long id, String commentText, String userEmail) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));
        User user = getUser(userEmail);
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You are not authorized to edit this comment");
        }
        comment.setComment(commentText);
        return commentMapper.toResponse(commentRepository.save(comment));
    }

    @Override
    @Transactional
    public void deleteComment(Long id, String userEmail) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));
        User user = getUser(userEmail);
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You are not authorized to delete this comment");
        }
        commentRepository.delete(comment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentResponse> getCommentsByBlog(Long blogId) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + blogId));
        return commentRepository.findByBlogOrderByCreatedAtDesc(blog)
                .stream()
                .map(commentMapper::toResponse)
                .collect(Collectors.toList());
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
