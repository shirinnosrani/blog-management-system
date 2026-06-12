package com.blog.repository;

import com.blog.entity.Blog;
import com.blog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByUserOrderByCreatedAtDesc(User user);
    List<Blog> findAllByOrderByCreatedAtDesc();

    @Query("SELECT COUNT(b) FROM Blog b WHERE b.user.id = :userId")
    int countByUserId(Long userId);
}
