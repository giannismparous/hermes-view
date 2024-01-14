import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from './components/ProductDetail';
import Contact from "./components/Contact";
import About from "./components/About";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import NavigationBar from "./components/NavigationBar";

function SamplePage() {
  return (
    <div>
      {/* You can use an iframe or another component to embed your 3D Vista project */}
      <iframe
        title="3D Vista Project"
        src="/samples/sample1/index.htm"  // Update the path accordingly
        width="100%"
        height="1000px"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function App() {
  return (
    <div>
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
      <NavigationBar />
    </div>
  );
}

export default App;