/**
 * This file provides a minimal API for loading DataFormsJS standard framework plugins
 * and running them when using Web Components. Common plugins such as [sort.js], [filter.js]
 * will work however not all plugins will work. For example usage, see the file
 * [DataFormsJS\examples\log-table-web.htm].
 */

/* Validates with both [jshint] and [eslint] */
/* jshint strict: true */
/* eslint-env browser */
/* eslint quotes: ["error", "single", { "avoidEscape": true }] */
/* eslint strict: ["error", "function"] */
/* eslint spaced-comment: ["error", "always"] */
/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

(function() {
    'use strict';

    // Private property for this scope to prevent
    // updates from running out of order.
    var isUpdating = false;

    // Run a plugin function. Logic for plugins when using React works 
    // differently than the standard DataFormsJS Framework. Bascially all
    // Plugin functions run at the same time in the expected order. When
    // using the standard DataFormsJS Framework plugins run at specific
    // times related to url changes and view rendering.
    function runPluginFunction(plugin, fn, callback) {
        if (typeof app.plugins[plugin][fn] === 'function') {
            try {
                if (callback === undefined) {
                    app.plugins[plugin][fn]();
                } else {
                    app.plugins[plugin][fn](callback);
                }
            } catch (e) {
                app.showErrorAlert('Error from Plugin [' + plugin + '] on [' + fn + '()]: ' + e.toString());
            }
        }
    }

    // Used by [app.showError] and [app.showErrorAlert]
    function createElement(type, textContent, className) {
        var el = document.createElement(type);
        el.textContent = textContent;
        if (className) {
            el.className = className;
        }
        return el;
    }

    /**
     * Define the [app] Object. This allows for the framework standard API call
     * [app.addPlugin(name, object)] to be used and allows for code from a React
     * app to call [app.refreshJsPlugins()] to run the plugins.
     * 
     * Additionally several common functions and properties such as [showErrorAlert()]
     * are copied from the standard DataFormsJS framework so they can be used here
     * and by React code.
     */
    var app = {
        // Plugins are saved to a plain JavaScript Object
        plugins: {},

        // Error element properties and css
        errorClass: 'dataformsjs-error',
        fatalErrorClass: 'dataformsjs-fatal-error',
        errorStyleId: 'dataformsjs-style-errors',
        errorCss: [
            '.dataformsjs-error,.dataformsjs-fatal-error{',
            'color:#fff;',
            'background-color:red;',
            'box-shadow:0 1px 5px 0 rgba(0,0,0,.5);',
            'background-image:linear-gradient(#e00,#c00);',
            '/*white-space:pre;*/', // See comments in [DataFormsJS.js]
            'text-align:left;',
            '}',

            '.dataformsjs-error{',
            'padding:10px;',
            'font-size:1em;',
            'margin:5px;',
            'display:inline-block;',
            '}',

            '.dataformsjs-fatal-error{',
            'z-index:1000000;',
            'padding:20px;',
            'font-size:1.5em;',
            'margin:20px;',
            'position:fixed;',
            'top:10px;',
            '}',

            '@media only screen and (min-width:1000px){',
            '.dataformsjs-fatal-error{',
            'max-width:1000px;',
            'left:calc(50% - 520px);',
            '}',
            '}',

            '.dataformsjs-fatal-error span{',
            'padding:5px 10px;',
            'float:right;',
            'border:1px solid darkred;',
            'cursor:pointer;',
            'margin-left:10px;',
            'box-shadow:0 0 2px 1px rgba(0,0,0,0.3);',
            'background-image:linear-gradient(#c00,#a00);',
            'border-radius:5px;',
            '}',
        ].join(''),        
    
        /**
         * Add a Plugin object. This version is minimal and does not include
         * validation from the standard Framework so plugins should be correctly
         * defined.
         * 
         * @param {string} name 
         * @param {object} plugin 
         */
        addPlugin: function(name, plugin) {
            if (typeof plugin === 'function') {
                this.plugins[name] = { onRendered: plugin };
            } else {
                this.plugins[name] = plugin;
            }
            return this;
        },
    
        /**
         * Call this to run all loaded plugins.
         */
        refreshJsPlugins: function() {
            // Only update if not already running
            if (isUpdating) {
                return;
            }
            isUpdating = true;
    
            // Call Plugins
            for (var plugin in app.plugins) {
                if (window.app.plugins.hasOwnProperty(plugin)) {
                    // jshint loopfunc:true
                    runPluginFunction(plugin, 'onRouteLoad', function(loadRoute) {
                        if (loadRoute === false) {
                            return;
                        }
                        runPluginFunction(plugin, 'onRendered');
                    });
                    runPluginFunction(plugin, 'onBeforeRender');
                    runPluginFunction(plugin, 'onRendered');
                }
            }
            isUpdating = false;
        },

        /**
         * Append CSS to a Style Sheet in the Document if it does not yet exist.
         */
        loadCss: function(id, css) {
            var style = document.getElementById(id);
            if (style === null) {
                style = document.createElement('style');
                style.id = id;
                style.innerHTML = css;
                document.head.appendChild(style);
            }
        },

        /**
         * Show an error alert message above other elements.
         * A close [x] buttton is provided for the user to close the alert.
         * 
         * @param {string} message 
         */
        showErrorAlert: function(message) {
            app.loadCss(app.errorStyleId, app.errorCss);
            if (typeof message === 'string' && message.toLowerCase().indexOf('error') === -1) {
                message = 'Error: ' + message;
            }
            
            var div = document.createElement('div');
            div.textContent = message;
            div.className = app.fatalErrorClass;

            var closeButton = createElement('span', '✕');
            closeButton.onclick = function () {
                document.body.removeChild(div);
            };
            
            div.insertBefore(closeButton, div.firstChild);
            document.body.appendChild(div);
            console.error(message);
        },
    };

    // Assign to the global Window Object
    if (window.app === undefined) {
        window.app = app;
    } else {
        app.showErrorAlert('Error loading [jsPlugins.js]. The global [window.app] object is already defined');
    }
})();
