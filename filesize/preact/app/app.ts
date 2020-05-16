export * as preact from "preact";
import { html } from "preact";
import { Header } from "./components/header.ts";
import { Sidebar } from "./components/sidebar.ts";
import { Main } from "./components/main.ts";

export const App = () => (
  html`
    <div class="app-grid-container">
      <${Header} />
      <${Sidebar} />
      <${Main} />
      <footer class="app-footer">Footer</footer>
    </div>`
);
