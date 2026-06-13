package com.blog.controller;

import com.blog.dto.*;
import com.blog.service.BlogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<List<BlogResponse>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getBlogById(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }

    @PostMapping
    public ResponseEntity<BlogResponse> createBlog(
            @Valid @RequestBody BlogRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(blogService.createBlog(request, userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogResponse> updateBlog(
            @PathVariable Long id,
            @Valid @RequestBody BlogRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(blogService.updateBlog(id, request, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        blogService.deleteBlog(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my-blogs")
    public ResponseEntity<List<BlogResponse>> getMyBlogs(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(blogService.getMyBlogs(userDetails.getUsername()));
    }
}
