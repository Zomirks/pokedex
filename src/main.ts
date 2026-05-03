import "./style.css";
import { getMissingByGeneration } from "./data.ts";
import { renderApp } from "./render.ts";

const root = document.querySelector<HTMLElement>("#app");
if(!root) throw new Error("#app not found");
renderApp(root, getMissingByGeneration());