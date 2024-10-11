package com.skydoom.treading.controller;

import com.razorpay.RazorpayException;
import com.skydoom.treading.domain.PaymentMethod;
import com.skydoom.treading.model.PaymentOrder;
import com.skydoom.treading.model.User;
import com.skydoom.treading.response.PaymentResponse;
import com.skydoom.treading.service.PaymentService;
import com.skydoom.treading.service.UserService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PaymentController {

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/api/payment/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(
            @PathVariable PaymentMethod paymentMethod,
            @PathVariable Long amount,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        PaymentResponse paymentResponse;

        PaymentOrder order = paymentService.createOrder(user, amount, paymentMethod);

        if (paymentMethod.equals(PaymentMethod.PAYPAL)) {
            paymentResponse = paymentService.createPaypalPaymentLink(user, amount, order.getId());
        } else {
            paymentResponse = paymentService.createStripePaymentLink(user, amount, order.getId());
        }
        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);

    }
}