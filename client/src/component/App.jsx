import React, { useState } from "react";
import Header from "./Header";
import Chat from "./Chat";
import "./global.scss";

function App(params) {
  return(
    <div className = "app">
      <Header/>
      <Chat/>
    </div>
  )
}

export default App;