import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

const PageOne = () => {
  return (
    <div>
      Page one
      <br />
      <Link to="/pagetwo">Page two</Link>;
    </div>
  );
};
const PageTwo = () => {
  return (
    <div>
      Page two
      <br />
      <Link to="/">Page one</Link>;
    </div>
  );
};
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={PageOne} />
        <Route path="/pagetwo" exact component={PageTwo} />
      </BrowserRouter>
    </div>
  );
};

export default App;
