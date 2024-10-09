package com.skydoom.treading.service;

import com.skydoom.treading.domain.VerificationType;
import com.skydoom.treading.model.User;
import com.skydoom.treading.model.VerificationCode;

public interface VerificationCodeService {
    VerificationCode sendVerificationCode(User user, VerificationType verificationType);

    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode getVerificationCodeByUser(Long userId);

    void deleteVerificationCodeById(VerificationCode verificationCode);
}
