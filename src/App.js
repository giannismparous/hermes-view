import React, { useEffect } from "react";
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
import Reservations from "./components/Reservations";
import ProjectDetail from "./components/ProjectDetail";
import NavigationBar from "./components/NavigationBar";
import SamplePage from "./components/SamplePage";
import Sample3DModel from "./components/Sample3DModel";
import Reserve from "./components/Reserve";
import ReserveTable from "./components/ReserveTable";
import Login from "./components/Login";
import ReactGA from 'react-ga';
import Samples from "./components/Samples";

function App() {


  ReactGA.initialize('G-333MCPYNT7');
  ReactGA.debug();

  const location = useLocation();

  const pathsWithoutNavBar = ["/sample", "/3d-model-sample","/360-video-sample","/login","/sample_restaurant/reservations"];

  // Check if the current path is in the array of paths without NavBar
  // or if it starts with "/projects/"
  const shouldHideNavBar = pathsWithoutNavBar.includes(location.pathname) || location.pathname.startsWith("/projects/") || location.pathname.startsWith("/reserve");

  // Dynamic styling for body's padding-top
  const bodyStyle = {
    paddingTop: shouldHideNavBar ? '0' : '60px', // Set to 0 when NavBar should be hidden
  };

  return (
    <div>
      {!shouldHideNavBar && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/samples" element={<Samples />} />
        <Route path="/sample" element={<SamplePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/sample_restaurant/reservations" element={<Reservations />} />
        <Route path="/reserve/:restaurantName/:tableNumber/:startScheduleIndex/:endScheduleIndex" element={<ReserveTable/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/projects" element={<Projects />} /> */}
        {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/sample" element={<SamplePage />} />
        <Route path="/3d-model-sample" element={<Sample3DModel />} />
        <Route path="/360-video-sample" element={<SamplePage redirectToSample={false} modelPath="/vr_projects/360_video_sample/index.htm"/>} />
        {/* kallithea */}
        <Route path="/projects/7c3c451ec900" element={<SamplePage redirectToSample={false} modelPath="https://giannismparous.github.io/vr_1/"/>} />
        <Route path="/projects/fdcdd856841f" element={<SamplePage redirectToSample={false} modelPath="https://giannismparous.github.io/vr_2/"/>} /> 
        <Route path="/projects/8hfk1021do01" element={<SamplePage redirectToSample={false} modelPath="https://giannismparous.github.io/vr_3/"/>} /> 
        <Route path="/projects/0" element={<SamplePage redirectToSample={false} modelPath="https://giannismparous.github.io/test_vr/"/>} /> 
      </Routes>
    </div>
  );
}

export default App;
