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
import TextDocs from "./pages/DocsPages/TextDocs";
import ImageDocs from "./pages/DocsPages/ImageDocs";
import InputDocs from "./pages/DocsPages/InputDocs";
import ListDocs from "./pages/DocsPages/ListDocs";
import TabsDocs from "./pages/DocsPages/TabsDocs";

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
          <Route path="text" element={<TextDocs />} />
             <Route path="image" element={<ImageDocs />} />
          <Route path="button" element={<ButtonDocs />} />
                <Route path="input" element={<InputDocs />} />
                 <Route path="list" element={<ListDocs />} />
                  <Route path="tabs" element={<TabsDocs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
