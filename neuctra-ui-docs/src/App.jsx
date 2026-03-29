import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import "@neuctra/ui/dist/ui.css";

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
import BadgeDocs from "./pages/DocsPages/BadgeDocs";
import AvatarDocs from "./pages/DocsPages/AvatarDocs";
import RadioGroupDocs from "./pages/DocsPages/RadioGroupDocs";
import CheckboxGroupDocs from "./pages/DocsPages/CheckboxGroupDocs";
import SwitchGroupDocs from "./pages/DocsPages/SwitchGroupDocs";
import DropdownDocs from "./pages/DocsPages/DropdownDocs";
import ContainerDocs from "./pages/DocsPages/ContainerDocs";

import DrawerDocs from "./pages/DocsPages/DrawerDocs";

import AlertDocs from "./pages/DocsPages/AlertDocs";
import ModalDocs from "./pages/DocsPages/ModalDocs";
import AccordionDocs from "./pages/DocsPages/AccordionDocs";
import TableDocs from "./pages/DocsPages/TableDocs";
import TemplatesLayout from "./layouts/TemplatesLayout";
import TemplateHomePage from "./pages/TemplatePages/TemplateHomePage";
import TemplatePage from "./pages/TemplatePages/TemplatePage";

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
          <Route path="badge" element={<BadgeDocs />} />
          <Route path="avatar" element={<AvatarDocs />} />
          <Route path="radio" element={<RadioGroupDocs />} />
          <Route path="checkbox" element={<CheckboxGroupDocs />} />
          <Route path="switch" element={<SwitchGroupDocs />} />
          <Route path="dropdown" element={<DropdownDocs />} />
          <Route path="container" element={<ContainerDocs />} />
          <Route path="drawer" element={<DrawerDocs />} />
  
          <Route path="alert" element={<AlertDocs />} />
          <Route path="modal" element={<ModalDocs />} />
          <Route path="accordion" element={<AccordionDocs />} />
          <Route path="table" element={<TableDocs />} />
        </Route>

          <Route path="/templates" element={<TemplatesLayout />}>
          <Route index element={<TemplateHomePage />} />
          <Route path=":slug" element={<TemplatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
