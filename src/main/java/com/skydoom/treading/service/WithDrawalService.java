package com.skydoom.treading.service;

import com.skydoom.treading.model.User;
import com.skydoom.treading.model.WithDrawal;

import java.util.List;

public interface WithDrawalService {
    WithDrawal requestyWithdrawal(Long amount, User user);

    WithDrawal procedWithdrawal(Long withdrawalId, boolean accept) throws Exception;

    List<WithDrawal> getUserWithdrawalHistory(User user);

    List<WithDrawal> getAllWithdrawalRequest();
}
