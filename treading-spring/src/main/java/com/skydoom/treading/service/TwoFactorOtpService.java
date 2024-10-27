package com.skydoom.treading.service;

import com.skydoom.treading.model.TwoFactorOTP;
import com.skydoom.treading.model.User;
import org.springframework.stereotype.Service;

@Service
public interface TwoFactorOtpService {

    TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt);

    TwoFactorOTP findByUser(Long userId);

    TwoFactorOTP findById(String id);

    boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOTP, String otp);

    void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP);
}
