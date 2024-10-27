package com.skydoom.treading.repository;

import com.skydoom.treading.model.Coin;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoinRepository extends JpaRepository<Coin, String> {
    @Query(value = "select distinct a.* from coin a where a.id = :id",nativeQuery = true)
    Coin findByCoinId(@Param("id") String id);

    @Query(value = "select distinct a.* from coin a order by a.id asc",nativeQuery = true)
    List<Coin> findAll();
}
