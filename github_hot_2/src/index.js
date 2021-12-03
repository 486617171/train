import React from "react";
import ReactDom from "react-dom";
import RootRouter from "./router.js";

ReactDom.render(
    <RootRouter />,
    document.getElementById('app')
)