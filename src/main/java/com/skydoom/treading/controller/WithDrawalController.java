package com.skydoom.treading.controller;

import com.skydoom.treading.domain.WalletTransactionType;
import com.skydoom.treading.model.User;
import com.skydoom.treading.model.Wallet;
import com.skydoom.treading.model.WalletTransaction;
import com.skydoom.treading.model.WithDrawal;
import com.skydoom.treading.service.UserService;
import com.skydoom.treading.service.WalletService;
import com.skydoom.treading.service.WithDrawalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class WithDrawalController {

    @Autowired
    private WithDrawalService withDrawalService;

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

//    @Autowired
//    private WalletTransactionService walletTransactionService;

    @PostMapping("/api/withdrawal/{amount}")
    public ResponseEntity<?> withdrawalRequest(
            @PathVariable Long amount,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Wallet userWallet = walletService.getUserWallet(user);

        WithDrawal withDrawal = withDrawalService.requestyWithdrawal(amount, user);
        walletService.addBalance(userWallet, -withDrawal.getAmount());

//        WalletTransaction walletTransaction = walletTranscationService.createTransaction
//                userWallet, WalletTransactionType.WITHDRAWAL,null,
//                "bank account withdrawal",
//                withDrawal.getAmount());

        return new ResponseEntity<>(withDrawal, HttpStatus.OK);
    }

    @PatchMapping("/api/admin/withdrawal/{id}/procced/{accept}")
    public ResponseEntity<?> proccedWithdrawal(
            @PathVariable Long id,
            @PathVariable boolean accept,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        WithDrawal withDrawal = withDrawalService.procedWithdrawal(id, accept);

        Wallet userWallet = walletService.getUserWallet(user);
        if (!accept){
        walletService.addBalance(userWallet, withDrawal.getAmount());
        }
        return new ResponseEntity<>(withDrawal, HttpStatus.OK);
    }

    @GetMapping("/api/withdrawal")
    public ResponseEntity<List<WithDrawal>> getWithdrawalHistory(
            @RequestHeader("Authorization")String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        List<WithDrawal> withDrawal = withDrawalService.getUserWithdrawalHistory(user);

        return new ResponseEntity<>(withDrawal, HttpStatus.OK);
    }

    @GetMapping("/api/admin/withdrawal")
    public ResponseEntity<List<WithDrawal>> getAllWtihdrawalRequest(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        List<WithDrawal> withDrawal = withDrawalService.getAllWithdrawalRequest();

        return new ResponseEntity<>(withDrawal, HttpStatus.OK);
    }

}
