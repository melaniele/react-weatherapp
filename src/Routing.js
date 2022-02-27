import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Alert } from "react-bootstrap";
import App from './App';

const NotFound = () => {
    return <Alert variant="info" style={{ textAlign: "center" }}>Page is not found</Alert>

}
export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/City/:id" element={<App />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>

    )
}
