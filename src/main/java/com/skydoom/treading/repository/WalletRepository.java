package com.skydoom.treading.repository;

import com.skydoom.treading.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {

    Wallet findByUserId(Long userId);
}
