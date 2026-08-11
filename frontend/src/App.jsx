import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Foods from "./pages/Foods.jsx";
import Culture from "./pages/Culture.jsx";
import Regions from "./pages/Regions.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/regions" element={<Regions />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
