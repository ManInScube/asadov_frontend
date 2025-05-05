import { createSlice } from "@reduxjs/toolkit";

let savedLanguage;
if (typeof window !== "undefined") {
    savedLanguage = localStorage.getItem('language') || 'RU';
  }


const initialState = {
    list: [],
    currentProject: null,
    page: 1,
    language: savedLanguage,
};

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProjects: (state, action) => {
            return { ...state, list: action.payload };
        },
        setCurrentProject: (state, action) => {
            return { ...state, currentProject: action.payload };
        },
        incrementPage: (state) => {
            return { ...state, page: state.page + 1 };
        },
        toggleLanguage: (state, action) => {
            const lang = action.payload;
            localStorage.setItem('language', lang); // сохраняем
            return { ...state, language: lang };
        },
    },
});

export const { addProjects, setCurrentProject, incrementPage, toggleLanguage } = projectsSlice.actions;
export default projectsSlice.reducer;
