import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import "@neuctra/ui/dist/ui.css";

// Components
import GoToTop from "./components/GoToTop";

// Layouts
import SiteLayout from "./layouts/site/SiteLayout";
import DocsLayout from "./layouts/docs/DocsLayout";
import BlogsLayout from "./layouts/blog/BlogsLayout";

// Context
import { AdminProvider } from "./layouts/blog/contexts/AdminContext";

// Blog Pages
const LoginPage = lazy(() => import("./layouts/blog/pages/LoginPage"));
const AdminPage = lazy(() => import("./layouts/blog/pages/AdminPage"));
const BlogPostPage = lazy(() => import("./layouts/blog/pages/BlogPostPage"));

// Site Pages
import LandingPage from "./layouts/site/pages/LandingPage";
import AllBlogsPage from "./layouts/blog/pages/AllBlogsPage";
import CreateBlogPage from "./layouts/blog/pages/CreateBlogPage";
import { ReactSignedIn } from "@neuctra/authix";
const AboutPage = lazy(() => import("./layouts/site/pages/AboutPage"));
const TermsPage = lazy(() => import("./layouts/site/pages/TermsPage"));
const ContactPage = lazy(() => import("./layouts/site/pages/ContactPage"));
const PrivacyPolicyPage = lazy(
  () => import("./layouts/site/pages/PrivacyPolicyPage"),
);

// Documentation Pages
const IntroductionDocPage = lazy(
  () => import("./layouts/docs/pages/IntroductionDocPage"),
);
const QuickStartDocsPage = lazy(
  () => import("./layouts/docs/pages/QuickStartDocsPage"),
);
const FullSetupDocPage = lazy(
  () => import("./layouts/docs/pages/FullSetupDocPage"),
);
const TextDocs = lazy(() => import("./layouts/docs/pages/TextDocs"));
const ImageDocs = lazy(() => import("./layouts/docs/pages/ImageDocs"));
const ButtonDocs = lazy(() => import("./layouts/docs/pages/ButtonDocs"));
const DropdownDocs = lazy(() => import("./layouts/docs/pages/DropdownDocs"));
const InputDocs = lazy(() => import("./layouts/docs/pages/InputDocs"));
const ListDocs = lazy(() => import("./layouts/docs/pages/ListDocs"));
const TabsDocs = lazy(() => import("./layouts/docs/pages/TabsDocs"));
const BadgeDocs = lazy(() => import("./layouts/docs/pages/BadgeDocs"));
const AvatarDocs = lazy(() => import("./layouts/docs/pages/AvatarDocs"));
const RadioGroupDocs = lazy(
  () => import("./layouts/docs/pages/RadioGroupDocs"),
);
const CheckboxDocs = lazy(() => import("./layouts/docs/pages/CheckboxDocs"));
const SwitchGroupDocs = lazy(() => import("./layouts/docs/pages/SwitchDocs"));
const SelectDocs = lazy(() => import("./layouts/docs/pages/SelectDocs"));
const ContainerDocs = lazy(() => import("./layouts/docs/pages/ContainerDocs"));
const LayoutPlayground = lazy(
  () => import("./layouts/docs/pages/LayoutPlayground"),
);
const DrawerDocs = lazy(() => import("./layouts/docs/pages/DrawerDocs"));
const TextareaDocs = lazy(() => import("./layouts/docs/pages/TextareaDocs"));
const AlertDocs = lazy(() => import("./layouts/docs/pages/AlertDocs"));
const ModalDocs = lazy(() => import("./layouts/docs/pages/ModalDocs"));
const AccordionDocs = lazy(() => import("./layouts/docs/pages/AccordionDocs"));
const TableDocs = lazy(() => import("./layouts/docs/pages/TableDocs"));

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
          <Route path="/blog" element={<BlogsLayout />}>
            <Route index element={<AllBlogsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="admin">
              <Route
                index
                element={
                  <ReactSignedIn fallback={<Navigate to={"/blog/login"} />}>
                    <AdminPage />
                  </ReactSignedIn>
                }
              />
              <Route path="create" element={<CreateBlogPage />} />
            </Route>
            <Route path=":id" element={<BlogPostPage />} />
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
