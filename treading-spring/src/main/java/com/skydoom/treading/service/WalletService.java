package com.skydoom.treading.service;

import com.skydoom.treading.model.Order;
import com.skydoom.treading.model.User;
import com.skydoom.treading.model.Wallet;

public interface WalletService {
    Wallet getUserWallet (User user);

    Wallet addBalance(Wallet wallet, Long money);

    Wallet findWalletById(Long id) throws Exception;

    Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception;

    Wallet payOrderPayment(Order order, User user) throws Exception;
}
