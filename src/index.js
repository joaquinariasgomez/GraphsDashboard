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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <BrowserRouter>
            <Routes>
                {/* <Route
                    path="/"
                    element={<Navigate to="/GraphsDashboard" replace />}
                /> */}
                <Route
                    path="/GraphsDashboard"
                    element={<App />}
                />
            </Routes>
        </BrowserRouter>
    </>
);