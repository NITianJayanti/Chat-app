import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

import userReducer from "./userSlice";
import messageReducer from "./messageSlice";
import socketReducer from "./socketSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "message"], // don't persist socket
};

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket: socketReducer, // not persisted
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "socket/setSocket",
        ],
        ignoredPaths: ["socket.socket"],
      },
    }),
});

const persistor = persistStore(store); // ✅ THIS is what was missing

export { store as default, persistor }; // ✅ Export both store and persistor
