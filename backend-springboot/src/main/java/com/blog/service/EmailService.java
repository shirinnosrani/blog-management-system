package com.blog.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

//    @Value("${spring.mail.username}")
//    private String fromEmail;

    @Value("${BREVO_API_KEY}")
    private String brevoApiKey;

    private static final String BREVO_URL =
            "https://api.brevo.com/v3/smtp/email";

    private final OkHttpClient client = new OkHttpClient();

//    private final JavaMailSender mailSender;

    public void sendOtp(String toEmail, String otp) {
        try {

            String html = """
                <!DOCTYPE html>
                <html>
                  <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px 0;">
                    <div style="max-width:480px; margin:0 auto; background:#fff;
                                border-radius:12px; padding:40px;">
                      <h2 style="color:#1a237e;">Email Verification</h2>

                      <p>Thank you for registering on <strong>BlogSpace</strong>.</p>

                      <p>Your OTP is:</p>

                      <div style="text-align:center;margin:30px 0;">
                        <span style="font-size:36px;font-weight:bold;color:#1a237e;">
                          %s
                        </span>
                      </div>

                      <p>This OTP is valid for 5 minutes.</p>
                    </div>
                  </body>
                </html>
                """.formatted(otp);

            String json = """
                {
                  "sender": {
                    "name": "BlogSpace",
                    "email": "nosranijuned@gmail.com"
                  },
                  "to": [
                    {
                      "email": "%s"
                    }
                  ],
                  "subject": "BlogSpace - Email Verification OTP",
                  "htmlContent": %s
                }
                """.formatted(
                    toEmail,
                    "\"" + html.replace("\"", "\\\"")
                            .replace("\n", "\\n") + "\""
            );

            RequestBody body =
                    RequestBody.create(
                            json,
                            MediaType.parse("application/json")
                    );

            Request request =
                    new Request.Builder()
                            .url(BREVO_URL)
                            .post(body)
                            .addHeader("accept", "application/json")
                            .addHeader("content-type", "application/json")
                            .addHeader("api-key", brevoApiKey)
                            .build();

            Response response =
                    client.newCall(request).execute();

            if (!response.isSuccessful()) {

                String error =
                        response.body() != null
                                ? response.body().string()
                                : "Unknown error";

                throw new RuntimeException(error);
            }

            log.info("OTP email sent successfully to {}", toEmail);

        } catch (Exception e) {

            log.error("Failed to send OTP email", e);

            throw new RuntimeException(
                    "Unable to send OTP email. Please try again."
            );
        }
    }
}
