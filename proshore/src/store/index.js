import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import { encryptTransform } from "redux-persist-transform-encrypt";
// import { PersistGate } from "redux-persist/integration/react";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import repoReducer from "./reducer/repo";

const reducers = combineReducers({
  repo: repoReducer,
});

const persistConfig = {
  key: "rootv2",
  storage,
  stateReconciler: hardSet,
  whitelist: ["repo"],
  transforms: [
    encryptTransform({
      secretKey: "someSuperSecret",
      onError: function (error) {
        // console.log(error);
      },
    }),
  ],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export const persistor = persistStore(store);
