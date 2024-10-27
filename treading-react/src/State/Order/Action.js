
import api from '../../config/api';
import * as types from './ActionType';

export const payOrder = ({ jwt, orderData, amount }) => async (dispatch) => {
  dispatch({ type: types.PAY_ORDER_REQUEST });
  try {

    const baseUrl = "http://localhost:5456";

    const response = await api.post(`${baseUrl}/api/orders/pay`, orderData, {
      headers: {
        Authorization: `Bearer ${jwt}`
      },
    });
    dispatch({
      type: types.PAY_ORDER_SUCCESS,
      payload: response.data,
      amount
    });
    console.log("order success", response.data)
  } catch (error) {
    console.log("error", error)
    dispatch({
      type: types.PAY_ORDER_FAILURE,
      error: error.message,
    });
  }
};

export const getAllOrdersForUser = ({ jwt, orderType, assetSymbol }) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_ORDERS_REQUEST });
  try {

    const baseUrl = "http://localhost:5456";

    const response = await api.get(`${baseUrl}/api/orders`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      },
      params: {
        order_type: orderType,
        asset_symbol: assetSymbol,
      },
    });
    dispatch({
      type: types.GET_ALL_ORDERS_SUCCESS,
      payload: response.data,
    });
    console.log("order success", response.data)
  } catch (error) {
    console.log("error ", error)
    dispatch({
      type: types.GET_ALL_ORDERS_FAILURE,
      error: error.message,
    });
  }
};
