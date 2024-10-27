package com.skydoom.treading.repository;

import com.skydoom.treading.model.WithDrawal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WithDrawalRepository extends JpaRepository<WithDrawal, Long> {
    List<WithDrawal> findByUserId(Long userId);
}
