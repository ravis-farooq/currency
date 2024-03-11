import { Toaster } from "react-hot-toast";
import "./App.css";

import HomePage from "./pages/homepage";

import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <>
      <HomePage />
      <Toaster />
    </>
  );
}

export default App;
