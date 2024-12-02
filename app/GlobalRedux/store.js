'use client'

import { configureStore } from "@reduxjs/toolkit"
import couterReducer from '@/app/GlobalRedux/Features/counter/CounterSlice'
import cartReducer from '@/app/GlobalRedux/Features/cart/CartSlice'
import { useDispatch, useSelector, useStore } from "react-redux"

const store = configureStore({
    reducer: {
        counter: couterReducer,
        cart: cartReducer
    }
})


export const useAppDispatch = useDispatch
export const useAppSelector = useSelector
export const useAppStore = useStore

export default store