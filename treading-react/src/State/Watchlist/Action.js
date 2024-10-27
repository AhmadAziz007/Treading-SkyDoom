import * as types from './ActionType';
import api from '../../config/api';

export const getUserWarchlist = ({ jwt }) => async (dispatch) => {

  dispatch({ type: types.GET_USER_WATCHLIST_REQUEST });
  try {
    const baseUrl = "http://localhost:5456";

    const response = await api.get(`${baseUrl}/api/watchlist/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: types.GET_USER_WATCHLIST_SUCCESS,
      payload: response.data,
    });
    console.log("user watchlist", response.data);
  } catch (error) {
    console.log("error", error)
    dispatch({
      type: types.GET_USER_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};

export const addItemToWatchlist = ({ coinId, jwt }) => async (dispatch) => {
  try {
    const baseUrl = "http://localhost:5456";
    const response = await api.patch(`${baseUrl}/api/watchlist/add/coin/${coinId}`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("API Response:", response);

    if (response && response.data) {
      dispatch({
        type: types.ADD_COIN_TO_WATCHLIST_SUCCESS,
        payload: response.data,
      });
      console.log("add coin to watchlist", response.data);
    } else {
      throw new Error("Response data is undefined");
    }
  } catch (error) {
    console.log("error", error.message);
    dispatch({
      type: types.ADD_COIN_TO_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};

export const removeItemFromWatchlist = ({ coinId, jwt }) => async (dispatch) => {
  try {
    const baseUrl = "http://localhost:5456";
    await api.delete(`${baseUrl}/api/watchlist/remove/coin/${coinId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: types.REMOVE_COIN_FROM_WATCHLIST_SUCCESS,
      payload: coinId,
    });
    console.log(`Removed coin ${coinId} from watchlist`);
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: types.REMOVE_COIN_FROM_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};