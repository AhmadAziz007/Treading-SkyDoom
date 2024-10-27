package com.skydoom.treading.service;

import com.skydoom.treading.domain.VerificationType;
import com.skydoom.treading.model.ForgotPasswordToken;
import com.skydoom.treading.model.User;

public interface ForgotPasswordService {

    ForgotPasswordToken createToken(User user,
                                    String id,
                                    String otp,
                                    VerificationType verificationType,
                                    String sendTo);

    ForgotPasswordToken findById(String id);

    ForgotPasswordToken findByUser(Long userId);

    void deleteToken(ForgotPasswordToken token);
}
