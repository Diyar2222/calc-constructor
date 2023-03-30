import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector,useDispatch } from "react-redux";
import {calcSlice} from "./calcSlice";

export const store = configureStore({
    reducer:{
        calculator:calcSlice.reducer,
    }
})
export const useAppDispatch:() => typeof store.dispatch = useDispatch
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector