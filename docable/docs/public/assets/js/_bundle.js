// Webpack
let conf = process.env.conf; // This variable comes from webpack.config.js under `plugins`

// Vue
import Vue from "vue";
import VueRouter from "vue-router";

// Vue - Components
import VueAppRoot from "/components/vue_app_root.vue";
import GlobalComponents from "/public/assets/js/compiled_vue_global_components.js";

// Vendor
import MarkdownIt from "markdown-it";
window.markdownIt = new MarkdownIt();

// Vue - Global registration
Vue.use(VueRouter);
Vue.filter('markdown-it', function(value) {
  return window.markdownIt.render(value);
});
Vue.prototype.$app_data = window.app_data; // The `app_data` variable comes from response_service.ts
Vue.prototype.$conf = conf;
Vue.prototype.$store = window.app_data.store;

// Vue Router
import router from "/public/assets/js/router.js";

// Vue app initialization
window.app = new Vue({
  el: "#vue_app_mount",
  components: {
    VueAppRoot
  },
  router: router,
  mounted() {
  }
});
