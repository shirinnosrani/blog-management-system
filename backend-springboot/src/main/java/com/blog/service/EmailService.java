package com.blog.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendOtp(String toEmail, String otp) throws MessagingException {
        System.out.println("Inside sendotp 1 method");
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
System.out.println("Inside sendotp 2 method");
        helper.setTo(toEmail);
        helper.setSubject("BlogSpace — Your Email Verification OTP");
        helper.setText("""
            <!DOCTYPE html>
            <html>
              <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px 0;">
                <div style="max-width:480px; margin:0 auto; background:#fff;
                            border-radius:12px; padding:40px; box-shadow:0 2px 12px rgba(0,0,0,.08);">
                  <h2 style="color:#1a237e; margin-top:0;">Email Verification</h2>
                  <p style="color:#444;">Thank you for registering on <strong>BlogSpace</strong>!<br>
                     Use the OTP below to verify your email address.</p>
                  <div style="text-align:center; margin:32px 0;">
                    <span style="display:inline-block; letter-spacing:10px; font-size:36px;
                                 font-weight:700; color:#1a237e; background:#e8eaf6;
                                 padding:16px 28px; border-radius:10px;">%s</span>
                  </div>
                  <p style="color:#888; font-size:13px;">
                    This code is valid for <strong>5 minutes</strong>. Do not share it with anyone.
                  </p>
                  <hr style="border:none; border-top:1px solid #eee; margin:24px 0;">
                  <p style="color:#aaa; font-size:12px; margin:0;">
                    If you did not create an account, you can safely ignore this email.
                  </p>
                </div>
              </body>
            </html>
            """.formatted(otp), true);
System.out.println("Inside sendotp 3 method");
        mailSender.send(message);
    }
}
