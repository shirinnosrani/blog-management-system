package com.blog.service;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Slf4j
@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpStore otpStore;
    private final EmailService emailService;
    private final SecureRandom random = new SecureRandom();

    public void generateAndSend(String email) {
        String otp = String.format("%06d", random.nextInt(1_000_000));
        System.out.println("Inside generateAndSend method");
        try {
            otpStore.save(email, otp);
            System.out.println("Save otp complete");
            emailService.sendOtp(email, otp);
            System.out.println("OTP send complete");
        } catch (Exception e) {
            System.out.println("Error Message : "+e.getMessage());
            e.printStackTrace();
            log.error("Error Message : ",e);
            throw new RuntimeException(e);
        }

    }

    public boolean verify(String email, String otp) {
        boolean valid = otpStore.verify(email, otp);
        if (valid) {
            otpStore.markVerified(email);
        }
        return valid;
    }

    public boolean isEmailVerified(String email) {
        return otpStore.isVerified(email);
    }

    public void clearVerification(String email) {
        otpStore.clearVerified(email);
    }
}
