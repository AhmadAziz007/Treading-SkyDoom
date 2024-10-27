package com.skydoom.treading.controller;

import com.skydoom.treading.service.UserService;
import com.skydoom.treading.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

//    @Autowired
//    private  TransactionService transactionService;
}
