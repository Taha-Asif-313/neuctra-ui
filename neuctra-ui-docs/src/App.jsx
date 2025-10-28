import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import DocsLayout from "./layouts/DocsLayout";
import LandingPage from "./pages/SitePages/LandingPage";
import GetStarted from "./pages/DocsPages/GetStarted";
import AboutPage from "./pages/DocsPages/AboutPage";
import ButtonDocs from "./pages/DocsPages/ButtonDocs";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Site */}
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* Docs Section */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<GetStarted />} />
          <Route path="button" element={<ButtonDocs />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
