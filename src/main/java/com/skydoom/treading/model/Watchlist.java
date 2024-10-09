package com.skydoom.treading.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "watch_list", schema = "public")
public class Watchlist {
    @Id
    @SequenceGenerator(name = "watch_list_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "watch_list_seq")
    private Long id;

    @OneToOne
    private User user;

    @ManyToOne
    private List<Coin> coins = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Coin> getCoins() {
        return coins;
    }

    public void setCoins(List<Coin> coins) {
        this.coins = coins;
    }
}
