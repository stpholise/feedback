"use client"
import {  configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import FeedbackReducer from './FeedbackSlice'

const persistConfig = { 
    key: "feedback",
    storage,
};

const persistedReducer = persistReducer(persistConfig, FeedbackReducer )


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddlewre) => (
        getDefaultMiddlewre({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
            }
        })
    )
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;