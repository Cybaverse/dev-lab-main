import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/main";
import NewItemPage from "./pages/new";
import ResultsPage from "./pages/results";

class AppRoutes extends Component {
    render() {
        return (
            <>
                <BrowserRouter basename="">
                    <Routes>
                        <Route exact path="/" element={<MainPage />} />
                        <Route exact path="/new" element={<NewItemPage />} />
                        <Route exact path="/results" element={<ResultsPage />} />
                        <Route path="*" element={<MainPage />} />
                    </Routes>
                </BrowserRouter>
            </>
        )
    }
}

export default function routes() {
    return <AppRoutes />;
}