import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Learn from "./pages/staples/Learn";
import Edit from "./pages/staples/Edit";
import { StapleProvider } from "./provider/StapleProvider";

function App() {
  return (
    <StapleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staple/edit/:id" element={<Edit />} />
          <Route path="/staple/learn/:id" element={<Learn />} />
        </Routes>
      </Router>
    </StapleProvider>
  );
};

export default App;
