import { html, Router } from "preact";
import { Counter } from "./counter.ts";

const HomePage = () => html`<a href="/counter">Counter</a>`;
const CounterPage = () => html`<${Counter} initial=${2} />`;
const SearchPage = () => "Search";

export const Main = () => {
  return (html`
    <main class="app-main">
      <${Router}>
        <${HomePage} path="/" />
        <${CounterPage} path="/counter" />
        <${SearchPage} path="/search/:query/:advanced?" />
      </${Router}>
    </main>`);
};
