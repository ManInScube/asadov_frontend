import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    currentProject: null,
    page: 1,
    language: 'RU',
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
        },
        toggleLanguage:(state, action)=>{
            return {...state, language: action.payload}
        }
    }
});

export const {addProjects, setCurrentProject, incrementPage, toggleLanguage} = projectsSlice.actions
export default projectsSlice.reducer