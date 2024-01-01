import React from "react";
import AnaSayfa from "./pages/AnaSayfa";
import { Provider } from "react-redux";
import mahzen from "./mahzen/mahzen";

const App = () => {
  return (
    <Provider store={mahzen}>
      <AnaSayfa />
    </Provider>
  );
};

export default App;
