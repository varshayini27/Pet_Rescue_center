import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistCombineReducers, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import {authSlice} from "./authSlice";
import { rescueCenterSlice } from "./rescueCenterSlice";


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistCombineReducers(persistConfig, {
     auth: authSlice.reducer,
     rescueCenter: rescueCenterSlice.reducer,
}); 

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);
export default store;