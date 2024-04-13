import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/styles.css';
import {
    BrowserRouter,
    Navigate,
    Routes,
    Route
} from "react-router-dom";
import App from './App';
import { GlobalStateProvider } from './context/GlobalStateProvider';
import globalReducer, { initialState } from './context/globalReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalStateProvider
        initialState={initialState}
        globalReducer={globalReducer}
    >
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/GraphsDashboard" replace />}
                />
                <Route
                    path="/GraphsDashboard"
                    element={<App />}
                />
            </Routes>
        </BrowserRouter>
    </GlobalStateProvider>
);