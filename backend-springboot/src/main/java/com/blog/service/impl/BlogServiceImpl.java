package com.blog.service.impl;

import com.blog.dto.*;
import com.blog.entity.Blog;
import com.blog.entity.User;
import com.blog.exception.*;
import com.blog.mapper.BlogMapper;
import com.blog.repository.*;
import com.blog.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final BlogMapper blogMapper;

    @Override
    @Transactional(readOnly = true)
    public List<BlogResponse> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(blogMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BlogResponse getBlogById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));
        return blogMapper.toResponse(blog);
    }

    @Override
    @Transactional
    public BlogResponse createBlog(BlogRequest request, String userEmail) {
        User user = getUser(userEmail);
        Blog blog = Blog.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .user(user)
                .build();
        return blogMapper.toResponse(blogRepository.save(blog));
    }

    @Override
    @Transactional
    public BlogResponse updateBlog(Long id, BlogRequest request, String userEmail) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));
        User user = getUser(userEmail);
        if (!blog.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You are not authorized to edit this blog");
        }
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        return blogMapper.toResponse(blogRepository.save(blog));
    }

    @Override
    @Transactional
    public void deleteBlog(Long id, String userEmail) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));
        User user = getUser(userEmail);
        if (!blog.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You are not authorized to delete this blog");
        }
        blogRepository.delete(blog);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BlogResponse> getMyBlogs(String userEmail) {
        User user = getUser(userEmail);
        return blogRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(blogMapper::toResponse)
                .collect(Collectors.toList());
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
