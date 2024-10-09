package com.skydoom.treading.service;

import com.razorpay.RazorpayException;
import com.skydoom.treading.domain.PaymentMethod;
import com.skydoom.treading.model.PaymentOrder;
import com.skydoom.treading.model.User;
import com.skydoom.treading.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentOrder createOrder(User user,
                             Long amount,
                             PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    Boolean ProccedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException;

    PaymentResponse createRazorpayPaymentLink(User user, Long amount) throws RazorpayException;

    PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;

}
