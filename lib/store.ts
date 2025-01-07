import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "./services/projectApi";
import projectsSlice  from "./features/projects";

export const store = configureStore({
    reducer:{
        projectsSlice,
        [projectApi.reducerPath]: projectApi.reducer,
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(projectApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch