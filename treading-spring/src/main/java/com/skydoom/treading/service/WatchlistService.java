package com.skydoom.treading.service;

import com.skydoom.treading.model.Coin;
import com.skydoom.treading.model.User;
import com.skydoom.treading.model.Watchlist;

public interface WatchlistService {
    Watchlist findUserWatchlist(Long userId) throws Exception;
    Watchlist createWatchlist(User user);
    Watchlist findById(Long id) throws Exception;

    Coin addItemToWatchlist(Coin coin, User user) throws Exception;
}
