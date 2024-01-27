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
import Sample3DModel from "./components/Sample3DModel";

function App() {

  const location = useLocation();

  const pathsWithoutNavBar = ["/sample", "/3d-model-sample"];

  // Check if the current path is in the array of paths without NavBar
  // or if it starts with "/projects/"
  const shouldHideNavBar = pathsWithoutNavBar.includes(location.pathname) || location.pathname.startsWith("/projects/");

  // Dynamic styling for body's padding-top
  const bodyStyle = {
    paddingTop: shouldHideNavBar ? '0' : '60px', // Set to 0 when NavBar should be hidden
  };

  return (
    <div style={bodyStyle}>
      {!shouldHideNavBar && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/projects" element={<Projects />} /> */}
        {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/sample" element={<SamplePage />} />
        <Route path="/3d-model-sample" element={<Sample3DModel />} />
        {/* kallithea */}
        <Route path="/projects/7c3c451ec900" element={<SamplePage redirectToSample={false} modelPath="/vr_projects/1/index.htm"/>} />
        <Route path="/projects/fdcdd856841f" element={<SamplePage redirectToSample={false} modelPath="/vr_projects/2/index.htm"/>} /> 
      </Routes>
    </div>
  );
}

export default App;
