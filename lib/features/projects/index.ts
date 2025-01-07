import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    currentProject: null
}


export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers:{
        addProjects:(state, action)=>{
            // return action.payload
            return {...state, list: action.payload}
        },
        setCurrentProject:(state, action)=>{
            console.log(action.payload)
            return {...state, currentProject: action.payload} 
        }
    }
});

export const {addProjects, setCurrentProject} = projectsSlice.actions
export default projectsSlice.reducer