package com.blog.service;

import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpStore {

    private record OtpEntry(String otp, LocalDateTime expiresAt) {}

    private final Map<String, OtpEntry> store = new ConcurrentHashMap<>();

    public void save(String email, String otp) {
        System.out.println("Inside save method");
        store.put(email.toLowerCase(), new OtpEntry(otp, LocalDateTime.now().plusMinutes(5)));
    }

    public boolean verify(String email, String otp) {
        OtpEntry entry = store.get(email.toLowerCase());
        if (entry == null) return false;
        if (LocalDateTime.now().isAfter(entry.expiresAt())) {
            store.remove(email.toLowerCase());
            return false;
        }
        if (entry.otp().equals(otp)) {
            store.remove(email.toLowerCase());
            return true;
        }
        return false;
    }

    public boolean isVerified(String email) {
        OtpEntry entry = store.get("verified:" + email.toLowerCase());
        if (entry == null) return false;
        if (LocalDateTime.now().isAfter(entry.expiresAt())) {
            store.remove("verified:" + email.toLowerCase());
            return false;
        }
        return true;
    }

    public void markVerified(String email) {
        store.put("verified:" + email.toLowerCase(),
                new OtpEntry("OK", LocalDateTime.now().plusMinutes(15)));
    }

    public void clearVerified(String email) {
        store.remove("verified:" + email.toLowerCase());
    }
}
