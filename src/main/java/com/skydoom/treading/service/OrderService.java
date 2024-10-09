package com.skydoom.treading.service;

import com.skydoom.treading.domain.OrderType;
import com.skydoom.treading.model.Coin;
import com.skydoom.treading.model.Order;
import com.skydoom.treading.model.OrderItem;
import com.skydoom.treading.model.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user, OrderItem ordeorderItemritem, OrderType orderType);

    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrderOfUser(Long userId, OrderType orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;

}
