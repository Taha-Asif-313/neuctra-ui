import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import GoToTop from "./components/GoToTop";

// Layouts
import SiteLayout from "./layouts/SiteLayout";
import DocsLayout from "./layouts/DocsLayout";

// Site Pages
import LandingPage from "./pages/SitePages/LandingPage";
import AboutPage from "./pages/SitePages/AboutPage";
import TermsPage from "./pages/SitePages/TermsPage";
import ContactPage from "./pages/SitePages/ContactPage";
import PrivacyPolicyPage from "./pages/SitePages/PrivacyPolicyPage";

// Docs Pages
import GetStarted from "./pages/DocsPages/GetStarted";
import ButtonDocs from "./pages/DocsPages/ButtonDocs";

const App = () => {
  return (
    <BrowserRouter>
      {/* 🧭 Always scroll to top on route change */}
      <GoToTop />

      <Routes>
        {/* 🌐 Public Website Layout */}
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacypolicy" element={<PrivacyPolicyPage />} />
        </Route>

        {/* 📘 Documentation Layout */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<GetStarted />} />
          <Route path="button" element={<ButtonDocs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
