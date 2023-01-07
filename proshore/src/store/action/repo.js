import axios from "axios";
import { REPO_START, REPO_SUCCESS, REPO_FAIL } from "../types";

import { baseUrl } from "../../components/constants/urls";

export const fetchStart = () => {
  return {
    type: REPO_START,
  };
};

export const repoSuccess = (payload) => {
  return {
    type: REPO_SUCCESS,
    data: payload,
  };
};

export const repoFailed = ({ message }) => {
  return {
    type: REPO_FAIL,
    error: message,
  };
};

export const getAllRepositoriesFromStore = (
  selectedSearchedQuery,
  setLoading
) => {
  return async function (dispatch) {
    let defaultErrorMsg = "Could not fetch repositories.";
    try {
      dispatch(fetchStart());
      const response = await axios.get(
        `${baseUrl}?q=${selectedSearchedQuery}&per_page=3000`
      );
      const { items } = response?.data;
      //   if (!status) {
      //     const { error } = response?.message;
      //     throw error;
      //   }
      //   const { data: responseData } = response.data;

      dispatch(repoSuccess(items));
      setLoading(false);
    } catch (error) {
      dispatch(repoFailed({ message: error.message ?? defaultErrorMsg }));
    }
  };
};
