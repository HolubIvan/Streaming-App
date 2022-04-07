import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StreamCreate from "./components/streams/StreamCreate";
import StreamEdit from "./components/streams/StreamEdit";
import StreamList from "./components/streams/StreamList";
import StreamShow from "./components/streams/StreamShow";
import StreamDelete from "./components/streams/StreamDelete";

const App = () => {
  return (
    <div>
      <header>Header</header>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<StreamList />} />
          <Route path="/streams/new" exact element={<StreamCreate />} />
          <Route path="/streams/edit" exact element={<StreamEdit />} />
          <Route path="/streams/delete" exact element={<StreamDelete />} />
          <Route path="/streams/show" exact element={<StreamShow />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
