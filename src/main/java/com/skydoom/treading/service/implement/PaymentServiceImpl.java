package com.skydoom.treading.service.implement;

import com.paypal.core.PayPalEnvironment;
import com.paypal.core.PayPalHttpClient;
import com.paypal.http.HttpResponse;
import com.paypal.orders.*;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.skydoom.treading.domain.PaymentMethod;
import com.skydoom.treading.domain.PaymentOrderStatus;
import com.skydoom.treading.model.PaymentOrder;
import com.skydoom.treading.model.User;
import com.skydoom.treading.repository.PaymentOrderRepository;
import com.skydoom.treading.response.PaymentResponse;
import com.skydoom.treading.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    @Value("${stipe.api.key}")
    private String stipeSecretKey;

//    @Value("${razorpay.api.key}")
//    private String apiKey;
//
//    @Value("${razorpay.api.secret}")
//    private String apiSecretKey;

    @Value("${paypal.client.id}")
    private String paypalClientId;

    @Value("${paypal.client.secret}")
    private String paypalSecret;

    @Value("${paypal.mode}")
    private String paypalMode;

    @Override
    public PaymentOrder createOrder(User user,
                                    Long amount,
                                    PaymentMethod paymentMethod) {

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setUser(user);
        paymentOrder.setAmount(amount);
        paymentOrder.setPaymentMethod(paymentMethod);
        paymentOrder.setStatus(PaymentOrderStatus.PENDING);

        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        return paymentOrderRepository.findById(id).orElseThrow(
                ()-> new Exception("payment order not found"));
    }

    @Override
    public Boolean ProccedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws IOException {
        if (paymentOrder.getStatus() == null) {
            paymentOrder.setStatus(PaymentOrderStatus.PENDING);
        }
        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.PAYPAL)) {
                // Initialize PayPal environment (sandbox/live)
                PayPalEnvironment environment = new PayPalEnvironment.Sandbox(paypalClientId, paypalSecret);
                PayPalHttpClient client = new PayPalHttpClient(environment);

                // Retrieve the PayPal order based on the paymentId
                OrdersGetRequest request = new OrdersGetRequest(paymentId);
                HttpResponse<Order> response = client.execute(request);
                Order order = response.result();

                // Check the status of the PayPal payment
                String status = order.status();
                if ("COMPLETED".equals(status)) {
                    paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                    paymentOrderRepository.save(paymentOrder);
                    return true;
                } else {
                    paymentOrder.setStatus(PaymentOrderStatus.FAILED);
                    paymentOrderRepository.save(paymentOrder);
                    return false;
                }
            }
            // If the payment method is something else (e.g., Stripe)
            paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
            paymentOrderRepository.save(paymentOrder);
            return true;
        }
        return false;
    }

    @Override
    public PaymentResponse createPaypalPaymentLink(User user, Long amount, Long orderId) throws Exception {
        try {
            // Inisialisasi environment PayPal (sandbox/live)
            PayPalEnvironment environment = new PayPalEnvironment.Sandbox(paypalClientId, paypalSecret);
            PayPalHttpClient client = new PayPalHttpClient(environment);

            // Membangun permintaan pembayaran
            AmountWithBreakdown amountBreakdown = new AmountWithBreakdown()
                    .currencyCode("USD")
                    .value(String.format("%.2f", amount / 100.0));

            List<PurchaseUnitRequest> purchaseUnits = new ArrayList<>();
            purchaseUnits.add(new PurchaseUnitRequest().amountWithBreakdown(amountBreakdown));

            OrderRequest orderRequest = new OrderRequest();
            orderRequest.checkoutPaymentIntent("CAPTURE");
            orderRequest.purchaseUnits(purchaseUnits);

            // Membuat order
            OrdersCreateRequest request = new OrdersCreateRequest().requestBody(orderRequest);
            HttpResponse<Order> response = client.execute(request);
            Order order = response.result();

            // Mendapatkan link persetujuan dari PayPal
            String approvalLink = order.links().stream()
                    .filter(link -> "approve".equals(link.rel()))
                    .findFirst()
                    .map(LinkDescription::href)
                    .orElseThrow(() -> new Exception("Approval link not found"));

            // Membuat response yang berisi URL pembayaran
            PaymentResponse res = new PaymentResponse();
            res.setPayment_url(approvalLink);

            return res;

        } catch (Exception e) {
            System.out.println("Error creating PayPal payment link: " + e.getMessage());
            throw new Exception("PayPal Payment creation failed", e);
        }
    }

    @Override
    public PaymentResponse createStripePaymentLink(
            User user,
            Long amount,
            Long orderId) throws StripeException {

        Stripe.apiKey = stipeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/wallet?order_id=" +orderId)
                .setCancelUrl("http://localhost:5173/payment/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                        .setCurrency("usd")
                                        .setUnitAmount(amount*100)
                                        .setProductData(SessionCreateParams
                                                .LineItem
                                                .PriceData
                                                .ProductData
                                                .builder()
                                                .setName("Top up wallet")
                                                .build()
                                        ).build()
                        ).build()
                ).build();

        Session session = Session.create(params);

        System.out.println("session _____" + session);

        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(session.getUrl());

        return res;
    }
}
