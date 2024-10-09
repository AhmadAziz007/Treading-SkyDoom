package com.skydoom.treading.controller;

import com.skydoom.treading.domain.VerificationType;
import com.skydoom.treading.model.ForgotPasswordToken;
import com.skydoom.treading.model.User;
import com.skydoom.treading.model.VerificationCode;
import com.skydoom.treading.request.ForgotPasswordTokenRequest;
import com.skydoom.treading.request.ResetPasswordRequest;
import com.skydoom.treading.response.ApiResponse;
import com.skydoom.treading.response.AuthResponse;
import com.skydoom.treading.service.EmailService;
import com.skydoom.treading.service.ForgotPasswordService;
import com.skydoom.treading.service.UserService;
import com.skydoom.treading.service.VerificationCodeService;
import com.skydoom.treading.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @Autowired
    private EmailService emailService;
    private String jwt;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PostMapping("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(
            @RequestHeader("Authorization") String jwt,
            @PathVariable VerificationType verificationType) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        VerificationCode verificationCode = verificationCodeService
                .getVerificationCodeByUser(user.getId());

        if (verificationCode == null) {
            verificationCode = verificationCodeService
                   .sendVerificationCode(user, verificationType);
        }

        if (verificationType.equals(VerificationType.EMAIL)) {
            emailService.sendVerificationOtpEmail(user.getEmail(),verificationCode.getOtp());
        }

        return new ResponseEntity<>("verification otp sent successfully", HttpStatus.OK);
    }

    @PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuthentication(
            @PathVariable String otp,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

        String sendTo = verificationCode.getVerificationType().equals(VerificationType.EMAIL)?
                verificationCode.getEmail():verificationCode.getMobile();

        boolean isVerified = verificationCode.getOtp().equals(otp);

        if(isVerified) {
            User updateUser = userService.enableTwoFactorAuthentication(
                    verificationCode.getVerificationType(),sendTo, user);

            verificationCodeService.deleteVerificationCodeById(verificationCode);
            return new ResponseEntity<>(updateUser, HttpStatus.OK);
        }
        throw  new Exception("wrong otp");
    }

    @PostMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp(
            @RequestBody ForgotPasswordTokenRequest req) throws Exception {

        User user = userService.findUserByEmail(req.getSendTo());
        String otp = OtpUtils.generateOTP();
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

        ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());
        if (token == null) {
            token = forgotPasswordService.createToken(user,id,otp,req.getVerificationType(),req.getSendTo());
        }

        if(req.getVerificationType().equals(VerificationType.EMAIL)) {
            emailService.sendVerificationOtpEmail(user
                    .getEmail(),
                    token.getOtp());
        }
        AuthResponse response = new AuthResponse();
        response.setSession(token.getId());
        response.setMessage("Password reset otp sent successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPasswordOtp(
            @PathVariable String id,
            @RequestBody ResetPasswordRequest req,
            @RequestHeader("Authorization") String jwt) throws Exception {

        ForgotPasswordToken forgotPasswordToken = forgotPasswordService.findById(id);

        boolean isVerified = forgotPasswordToken.getOtp().equals(req.getOtp());

        if (isVerified) {
            userService.updatePassword(forgotPasswordToken.getUser(), req.getPassword());
            ApiResponse res = new ApiResponse();
            res.setMessage("password update successfully");
            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        }
        throw new Exception("wrong otp");
    }

}