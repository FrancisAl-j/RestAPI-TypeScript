import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <h1 className="text-2xl text-blue-700">Hello world!</h1>
      </div>
    </Router>
  );
};

export default App;
