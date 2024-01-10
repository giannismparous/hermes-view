import React from "react";
import {
  BrowserRouter as Router,
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

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/projects" element={<Projects />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
