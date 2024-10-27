import api from '../../config/api';
import * as types from './ActionType';

export const getAssetById = ({ assetId, jwt }) => async (dispatch) => {
  dispatch({ type: types.GET_ASSET_REQUEST });
  try {

    const baseUrl = "http://localhost:5456";

    const response = await api.get(`${baseUrl}/api/assets/${assetId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: types.GET_ASSET_SUCCESS,
      payload: response.data,
    });
    console.log("get asset by id", response.data)
  } catch (error) {
    dispatch({
      type: types.GET_ASSET_FAILURE,
      error: error.message,
    });
  }
};

export const getAssetDetails = ({ coinId, jwt }) => async (dispatch) => {
  dispatch({ type: types.GET_ASSET_DETAILS_REQUEST });

  try {
    const baseUrl = "http://localhost:5456";

    const response = await api.get(`${baseUrl}/api/asset/coin/${coinId}/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: types.GET_ASSET_DETAILS_SUCCESS,
      payload: response.data,
    });
    console.log("asset details --- ", response.data)
  } catch (error) {
    console.log("asset details ---", error)
    dispatch({
      type: types.GET_ASSET_DETAILS_FAILURE,
      error: error.message
    });
  }
};

export const getUserAssets = (jwt) => async (dispatch) => {
  dispatch({ type: types.GET_USER_ASSET_REQUEST });
  try {

    const baseUrl = "http://localhost:5456";

    const response = await api.get(`${baseUrl}/api/asset`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: types.GET_USER_ASSET_SUCCESS,
      payload: response.data,
    });

    console.log("user assets --- ", response.data)
  } catch (error) {
    dispatch({
      type: types.GET_USER_ASSET_FAILURE,
      error: error.message,
    });
  }
};