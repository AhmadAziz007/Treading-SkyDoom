package com.skydoom.treading.service;

import com.skydoom.treading.model.PaymentDetails;
import com.skydoom.treading.model.User;

public interface PaymentDetailsService {

    public PaymentDetails addPaymentDetails(String accountNumber,
                                            String accountHolderName,
                                            String ifac,
                                            String bankName,
                                            User user);

    public PaymentDetails getUsersPaymentDetails(User user);

}
