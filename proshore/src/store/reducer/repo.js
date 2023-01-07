import { REPO_FAIL, REPO_START, REPO_SUCCESS } from "../types";
import { updateObject } from "../utility";

const initial_state = { loading: false, error: null, data: null };

const repoStart = (state, action) =>
  updateObject(state, { error: null, loading: true });

const repoSuccess = (state, action) =>
  updateObject(state, { error: null, loading: false, data: action.data });

const repoFail = (state, action) =>
  updateObject(state, { error: action.error, loading: false });

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case REPO_SUCCESS:
      return repoSuccess(state, action);
    case REPO_START:
      return repoStart(state, action);
    case REPO_FAIL:
      return repoFail(state, action);
    default:
      return state;
  }
}
