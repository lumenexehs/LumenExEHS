/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import About from './pages/About';
import Article from './pages/Article';
import Careers from './pages/Careers';
import ClientPortal from './pages/ClientPortal';
import Contact from './pages/Contact';
import Home from './pages/Home';
import KnowledgeHub from './pages/KnowledgeHub';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Services from './pages/Services';
import TermsAndConditions from './pages/TermsAndConditions';
import BusinessCard from './pages/BusinessCard';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Article": Article,
    "Careers": Careers,
    "ClientPortal": ClientPortal,
    "Contact": Contact,
    "Home": Home,
    "KnowledgeHub": KnowledgeHub,
    "PrivacyPolicy": PrivacyPolicy,
    "Services": Services,
    "TermsAndConditions": TermsAndConditions,
    "BusinessCard": BusinessCard,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};