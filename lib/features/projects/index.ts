import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    currentProject: null,
    page: 1,
    language: typeof window !== "undefined" ? localStorage.getItem('language') : 'RU',
    isSearchMode: false,
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
        toggleSearchMode: (state, action) => {
            return { ...state, isSearchMode: action.payload };
        },
    },
});

export const { addProjects, setCurrentProject, incrementPage, toggleLanguage, toggleSearchMode } = projectsSlice.actions;
export default projectsSlice.reducer;
