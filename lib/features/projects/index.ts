import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    currentProject: null,
    page: 1,
}


export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers:{
        addProjects:(state, action)=>{
            console.log(action.payload)
            return {...state, list: action.payload}
        },
        setCurrentProject:(state, action)=>{
            console.log(action.payload)
            return {...state, currentProject: action.payload} 
        },
        incrementPage:(state)=>{
            return {...state, page: state.page + 1}
        }
    }
});

export const {addProjects, setCurrentProject, incrementPage} = projectsSlice.actions
export default projectsSlice.reducer