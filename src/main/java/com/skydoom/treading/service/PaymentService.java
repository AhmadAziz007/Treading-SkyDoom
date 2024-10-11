package com.skydoom.treading.service;

import com.razorpay.RazorpayException;
import com.skydoom.treading.domain.PaymentMethod;
import com.skydoom.treading.model.PaymentOrder;
import com.skydoom.treading.model.User;
import com.skydoom.treading.response.PaymentResponse;
import com.stripe.exception.StripeException;

import java.io.IOException;

public interface PaymentService {

    PaymentOrder createOrder(User user,
                             Long amount,
                             PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    Boolean ProccedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException, IOException;

    PaymentResponse createPaypalPaymentLink(User user, Long amount, Long orderId) throws Exception;

    PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;

}
