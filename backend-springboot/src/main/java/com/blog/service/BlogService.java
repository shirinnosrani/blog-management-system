package com.blog.service;

import com.blog.dto.*;
import java.util.List;

public interface BlogService {
    List<BlogResponse> getAllBlogs();
    BlogResponse getBlogById(Long id);
    BlogResponse createBlog(BlogRequest request, String userEmail);
    BlogResponse updateBlog(Long id, BlogRequest request, String userEmail);
    void deleteBlog(Long id, String userEmail);
    List<BlogResponse> getMyBlogs(String userEmail);
}
