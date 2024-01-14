import React from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from './components/ProductDetail';
import Contact from "./components/Contact";
import About from "./components/About";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import NavigationBar from "./components/NavigationBar";
import SamplePage from "./components/SamplePage";

function App() {

  const location = useLocation();

  // Define an array of paths where you want to hide the NavigationBar
  const pathsWithoutNavBar = ["/sample"];

  // Check if the current path is in the array of paths without NavBar
  const shouldHideNavBar = pathsWithoutNavBar.includes(location.pathname);

  // Dynamic styling for body's padding-top
  const bodyStyle = {
    paddingTop: shouldHideNavBar ? '0' : '60px', // Set to 0 when NavBar should be hidden
  };

  return (
    <div style={bodyStyle}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/projects" element={<Projects />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} /> */}
        <Route path="/sample" element={<SamplePage />} />
      </Routes>
      {!shouldHideNavBar && <NavigationBar />}
    </div>
  );
}

export default App;
