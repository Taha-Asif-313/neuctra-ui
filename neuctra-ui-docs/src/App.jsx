import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import "@neuctra/ui/dist/ui.css";

// Components
import GoToTop from "./components/GoToTop";

// Layouts
import SiteLayout from "./layouts/SiteLayout";
import DocsLayout from "./layouts/DocsLayout";

// Site Pages
import LandingPage from "./pages/site/LandingPage";
import TutorialsLayout from "./layouts/TutorialsLayout";
import GuidesLayout from "./layouts/GuidesLayout";

const AboutPage = lazy(() => import("./pages/site/AboutPage"));
const TermsPage = lazy(() => import("./pages/site/TermsPage"));
const ContactPage = lazy(() => import("./pages/site/ContactPage"));
const PrivacyPolicyPage = lazy(
  () => import("./pages/site/PrivacyPolicyPage"),
);

const IntroductionDocPage = lazy(
  () => import("./pages/docs/IntroductionDocPage"),
);
const QuickStartDocsPage = lazy(
  () => import("./pages/docs/QuickStartDocsPage"),
);
const FullSetupDocPage = lazy(() => import("./pages/docs/FullSetupDocPage"));
const TextDocs = lazy(() => import("./pages/docs/TextDocs"));
const ImageDocs = lazy(() => import("./pages/docs/ImageDocs"));
const ButtonDocs = lazy(() => import("./pages/docs/ButtonDocs"));
const DropdownDocs = lazy(() => import("./pages/docs/DropdownDocs"));
const InputDocs = lazy(() => import("./pages/docs/InputDocs"));
const ListDocs = lazy(() => import("./pages/docs/ListDocs"));
const TabsDocs = lazy(() => import("./pages/docs/TabsDocs"));
const BadgeDocs = lazy(() => import("./pages/docs/BadgeDocs"));
const AvatarDocs = lazy(() => import("./pages/docs/AvatarDocs"));
const RadioGroupDocs = lazy(() => import("./pages/docs/RadioGroupDocs"));
const CheckboxDocs = lazy(() => import("./pages/docs/CheckboxDocs"));
const SwitchGroupDocs = lazy(() => import("./pages/docs/SwitchDocs"));
const SelectDocs = lazy(() => import("./pages/docs/SelectDocs"));
const ContainerDocs = lazy(() => import("./pages/docs/ContainerDocs"));
const LayoutPlayground = lazy(() => import("./pages/docs/LayoutPlayground"));
const DrawerDocs = lazy(() => import("./pages/docs/DrawerDocs"));
const TextareaDocs = lazy(() => import("./pages/docs/TextareaDocs"));
const AlertDocs = lazy(() => import("./pages/docs/AlertDocs"));
const ModalDocs = lazy(() => import("./pages/docs/ModalDocs"));
const AccordionDocs = lazy(() => import("./pages/docs/AccordionDocs"));
const TableDocs = lazy(() => import("./pages/docs/TableDocs"));


const NeuctraUiChatBotPage = lazy(
  () => import("./pages/NeuctraUIBot/NeuctraUiChatBot"),
);

const App = () => {
  return (
    <BrowserRouter>
      {/* 🧭 Always scroll to top on route change */}
      <GoToTop />

      <Suspense fallback={null}>
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacypolicy" element={<PrivacyPolicyPage />} />
          </Route>

          {/* 📘 Documentation Routes */}
          <Route path="/docs" element={<DocsLayout />}>
            {/* Main introduction page */}
            <Route index element={<IntroductionDocPage />} />

            {/* Quick installation guide */}
            <Route path="quick-start" element={<QuickStartDocsPage />} />

            {/* Complete project setup guide */}
            <Route path="full-setup" element={<FullSetupDocPage />} />

            {/* Text / typography component */}
            <Route path="text" element={<TextDocs />} />

            {/* Optimized image component */}
            <Route path="image" element={<ImageDocs />} />

            {/* Button component */}
            <Route path="button" element={<ButtonDocs />} />

            {/* Dropdown / menu component */}
            <Route path="dropdown" element={<DropdownDocs />} />

            {/* Input field component */}
            <Route path="input" element={<InputDocs />} />

            {/* List component */}
            <Route path="list" element={<ListDocs />} />

            {/* Tabs navigation component */}
            <Route path="tabs" element={<TabsDocs />} />

            {/* Badge / label component */}
            <Route path="badge" element={<BadgeDocs />} />

            {/* Avatar / profile image component */}
            <Route path="avatar" element={<AvatarDocs />} />

            {/* Radio group component */}
            <Route path="radio" element={<RadioGroupDocs />} />

            {/* Checkbox component */}
            <Route path="checkbox" element={<CheckboxDocs />} />

            {/* Toggle switch component */}
            <Route path="switch" element={<SwitchGroupDocs />} />

            {/* Select / dropdown input */}
            <Route path="select" element={<SelectDocs />} />

            {/* Textarea multiline input */}
            <Route path="textarea" element={<TextareaDocs />} />

            {/* Responsive container component */}
            <Route path="container" element={<ContainerDocs />} />

            {/* Interactive layout playground */}
            <Route path="layout-playground" element={<LayoutPlayground />} />

            {/* Drawer / slide panel component */}
            <Route path="drawer" element={<DrawerDocs />} />

            {/* Alert / notification component */}
            <Route path="alert" element={<AlertDocs />} />

            {/* Modal dialog component */}
            <Route path="modal" element={<ModalDocs />} />

            {/* Accordion / collapsible content */}
            <Route path="accordion" element={<AccordionDocs />} />

            {/* Table component */}
            <Route path="table" element={<TableDocs />} />
          </Route>

          {/* 🎓 Tutorial Routes */}
          <Route path="/tutorials" element={<TutorialsLayout />}>
            <Route index element={<h1>Tutorials</h1>} />

      
          </Route>

          {/* 🧠 Guide Routes */}
          <Route path="/guides" element={<GuidesLayout />}>
            <Route index element={< h1>Guides</h1>} />

          </Route>

          <Route
            path="/neuctra-ui-chatbot"
            element={<NeuctraUiChatBotPage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
