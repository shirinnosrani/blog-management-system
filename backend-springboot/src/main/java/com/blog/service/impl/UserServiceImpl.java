package com.blog.service.impl;

import com.blog.dto.*;
import com.blog.entity.User;
import com.blog.exception.*;
import com.blog.mapper.UserMapper;
import com.blog.repository.*;
import com.blog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BlogRepository blogRepository;
    private final CommentRepository commentRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Override
    @Transactional(readOnly = true)
    public UserProfileResponse getProfile(String userEmail) {
        User user = getUser(userEmail);
        int totalBlogs = blogRepository.countByUserId(user.getId());
        int totalComments = commentRepository.countByUserId(user.getId());
        return userMapper.toResponse(user, totalBlogs, totalComments);
    }

    @Override
    @Transactional
    public UserProfileResponse updateProfile(UpdateProfileRequest request, String userEmail) {
        User user = getUser(userEmail);
        user.setFullName(request.getFullName());
        userRepository.save(user);
        int totalBlogs = blogRepository.countByUserId(user.getId());
        int totalComments = commentRepository.countByUserId(user.getId());
        return userMapper.toResponse(user, totalBlogs, totalComments);
    }

    @Override
    @Transactional
    public void changePassword(ChangePasswordRequest request, String userEmail) {
        User user = getUser(userEmail);
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("New passwords do not match");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
