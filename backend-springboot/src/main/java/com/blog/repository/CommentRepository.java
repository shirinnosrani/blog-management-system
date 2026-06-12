package com.blog.repository;

import com.blog.entity.Comment;
import com.blog.entity.Blog;
import com.blog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBlogOrderByCreatedAtDesc(Blog blog);
    List<Comment> findByUser(User user);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.user.id = :userId")
    int countByUserId(Long userId);
}
