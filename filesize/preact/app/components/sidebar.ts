import { html } from "preact";

export const Sidebar = () => {
  return (html`
    <aside class="app-sidenav">
      <div class="menu">
        <p class="menu-label">
          General
        </p>
        <ul class="menu-list">
          <li><a>Dashboard</a></li>
          <li><a>Customers</a></li>
        </ul>
        <p class="menu-label">
          Administration
        </p>
      </div>
    </aside>`);
};
