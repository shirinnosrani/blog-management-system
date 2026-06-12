package com.blog.service;

import com.blog.dto.*;

public interface UserService {
    UserProfileResponse getProfile(String userEmail);
    UserProfileResponse updateProfile(UpdateProfileRequest request, String userEmail);
    void changePassword(ChangePasswordRequest request, String userEmail);
}
