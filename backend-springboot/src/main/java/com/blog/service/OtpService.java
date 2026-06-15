package com.blog.service;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpStore otpStore;
    private final EmailService emailService;
    private final SecureRandom random = new SecureRandom();

    public void generateAndSend(String email) throws MessagingException {
        String otp = String.format("%06d", random.nextInt(1_000_000));
        System.out.println("Inside generateAndSend method");
        otpStore.save(email, otp);
        emailService.sendOtp(email, otp);
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
