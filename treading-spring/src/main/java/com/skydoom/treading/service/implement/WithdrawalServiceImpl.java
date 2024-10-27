package com.skydoom.treading.service.implement;

import com.skydoom.treading.domain.WithDrawalStatus;
import com.skydoom.treading.model.User;
import com.skydoom.treading.model.WithDrawal;
import com.skydoom.treading.repository.WithDrawalRepository;
import com.skydoom.treading.service.WithDrawalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WithdrawalServiceImpl implements WithDrawalService {

    @Autowired
    private WithDrawalRepository withDrawalRepository;

    @Override
    public WithDrawal requestyWithdrawal(Long amount, User user) {
        WithDrawal withDrawal = new WithDrawal();
        withDrawal.setAmount(amount);
        withDrawal.setUser(user);
        withDrawal.setStatus(WithDrawalStatus.PENDING);

        return withDrawalRepository.save(withDrawal);
    }

    @Override
    public WithDrawal procedWithdrawal(Long withdrawalId, boolean accept) throws Exception {
        Optional<WithDrawal> withDrawal = withDrawalRepository.findById(withdrawalId);
        if (withDrawal.isEmpty()){
            throw new Exception("withdrawal not found");
        }
        WithDrawal withDrawal1 = withDrawal.get();

        withDrawal1.setDate(LocalDateTime.now());

        if(accept){
            withDrawal1.setStatus(WithDrawalStatus.SUCCESS);
        } else {
            withDrawal1.setStatus(WithDrawalStatus.PENDING);
        }
        return withDrawalRepository.save(withDrawal1);
    }

    @Override
    public List<WithDrawal> getUserWithdrawalHistory(User user) {
        return withDrawalRepository.findByUserId(user.getId());
    }

    @Override
    public List<WithDrawal> getAllWithdrawalRequest() {
        return withDrawalRepository.findAll();
    }
}
