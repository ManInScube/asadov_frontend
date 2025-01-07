'use client'
import { Provider } from "react-redux"
import { store } from "./store"
import { ReactElement, ReactNode } from "react"

interface IStoreProvider{
    children: ReactNode
}

export const StoreProvider = ({children}:IStoreProvider) =>{
    return <Provider store={store}>{children}</Provider>
}