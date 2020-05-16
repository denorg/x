# Dinja

Dinja is a scalable, modular, and easy to use web framework built specificially for Deno. Dinja is cross platform, easy to install, and very easy to quickly get up to speed with. 

The Dinja framework relies on a series of technologies typically used in web development:

 * [**Pogo**](https://deno.land/x/pogo): Pogo is the web API and server underlying Dinja
 * [**Denjucks**](https://deno.land/x/denjucks): a templating engine used to render templates based on Mozilla's Nunjucks
 * [**Dex**](https://deno.land/x/dex): An SQL query builder for deno based on knex.js
 * [**Dexecutor**](https://deno.land/x/dexecutor): An SQL query executor for deno which works with MySQL/MariaDB, Postgres, and Sqlite3


## Installation

To install Dinja, simply copy and paste the contents of the **dinja.js** file in this repository. For systems with curl installed, Dinja can be downloaded on the command line via the curl command:

```javascript
curl "https://raw.githubusercontent.com/denjucks/dinja/master/dinja.js" > dinja.js
```


## Usage

The **dinja.js** file acts as a command line interface for Dinja. To create a new Dinja project, run this command:

```javascript
deno run -A dinja.js createproject
```

This will create a Dinja project in the current directory with the following structure:

```
|--applets
|   |--main
|      |--templates
|      |  |--_base.html
|      |  |--index.html
|      |
|      |--static
|      |  |--dinja.png
|      |
|      |--router.js
|      |--models.js
|
|--utilities
|   |--util.js
|   |--dbconfig.js
|
|--server.js
|--dinja.js
```

The web server can be run via the following command:

```
deno run -A server.js 44444
```

This will start the web server on port 44444. You can connect to the web server using the browser at the following URL:

```
http://localhost:44444/main
```


# Understanding the Dinja file structure

Each dinja project starts with the following structure:

```
|--applets
|   |--main
|      |--templates
|      |  |--_base.html
|      |  |--index.html
|      |
|      |--static
|      |  |--dinja.png
|      |
|      |--router.js
|      |--models.js
|
|--utilities
|   |--util.js
|   |--dbconfig.js
|
|--server.js
|--dinja.js
```

At the base directory, the following 2 files and 2 folders are found:

 * **/applets**: This folder contains all the applets available for this Dinja project. Dinja uses and applet, making it very easy to register/deregister, and understand the different pieces of the Dinja project.
* **/utilities**: This folder contains utility scripts used within the Dinja project elsewhere (such as in the applets), as well as a file that contains database configurations.
* **/server.js**: This file is the entry point of the server, and contains configurations for the web server. You'll register new applets you create within this file.
* **/dinja.js**: This file is the command line interface you'll use to interact with your Dinja project


Let's look at **server.js** more. The contents of this file are as follows:

```javascript
import pogo from "https://deno.land/x/dinja/lib/pogo/main.ts";
import Dexecutor from "https://deno.land/x/dinja/lib/dexecutor/mod.ts";
import {dbconfig} from "./utilities/dbconfig.js";

// Creating the server and setting the port
let port = 55555;
if (Deno.args[0]) {
    port = Number.parseInt(Deno.args[0]);
}

const server = pogo.server({
    port: port
});

// Creating a database for the webapp
export const database = new Dexecutor(dbconfig);
database.connect();

// Importing routers and adding routers to the server
import * as main from "./applets/main/router.js";
server.router.add(main.router);

// Starting the server
console.log("Starting server at port " + port);
server.start();
```

You can see the server will set a default port if none is specified, will use Dexecutor to connect to a database, will register all the applets and add their routers to the server router, and will start the server. Comments in this file describe different sections of this file, and you can remove pieces that you don't need. For example, if you don't need a database for your dinja project, you can simply remove the database section.


## Applets

Notice that when a Dinja project is created, it creates an applet for you, called **main**, and will add it to the server router. Let's look at the **router.js** and **models.js** files:

**router.js**:

```javascript
import * as path from "https://deno.land/x/dinja/lib/std/path/mod.ts";
import pogo from "https://deno.land/x/dinja/lib/pogo/main.ts";
import denjucks from "https://deno.land/x/dinja/lib/denjucks/mod.js";
import * as utilities from "../../utilities/util.js"
import {database} from "../../server.js"

// Creating and exporting the router
export const router = pogo.router();

// Creating a denjucks environment
const __dirname = utilities.crossPlatformPathConversion(new URL(".", import.meta.url).pathname);
const denjucksEnv = new denjucks.Environment(new denjucks.FileSystemLoader(path.join(__dirname, "templates")));

// Setting the path prefix for this route
const pathPrefix = "/main";

// Creating the static file route for this router
router.get(pathPrefix + "/static/{filename}", async (request, handler) => {
    const fileName = request.params.filename;
    const buffer = await Deno.readFile(path.join(__dirname, "static", fileName));
    const mimetype = utilities.determineMimeType(fileName)
    
    return handler.response(buffer).type(mimetype);
});

// Creating a route for this router
router.get(pathPrefix + "", (request) => {
    return denjucksEnv.render("index.html");
});
```

In this file, first a Pogo router is created, then a Denjucks environment is set to specify where templates will be loaded from. Generally you won't need to change these lines of code.

Next, the **pathPrefix** variable is set. This variable creates a prefix that all routes within this applet will need to take to reach the applet. In the case of the default applet, the pathPrefix is set to **"main"**, meaning that all routes within this router will be found at **localhost:55555/main**. This variable can be changed to another value to change the prefix for the router.

After that, a route is created for this applet for all static files in the applet. The static files for an applet can be found within their **static** folder. This route can be removed if this applet won't be serving any static content (for example if this applet is a REST API applet).

Finally, a base route is created for this applet. In this case, the route will render the **index.html** file within the applet's template folder. The index.html file contains a Denjucks template:

```html
{% extends "_base.html" %}

{% block content %}
    <style>
        html, body {
            margin: 0px;
        }
    </style>
    
    <div style="display: flex; width: 100vw; height: 100vh;">
        <div style="margin: auto;">
            <h1 style="text-align: center; font-family: sans-serif">Welcome to:</h1>
            <img src="/main/static/dinja.png">
            <p style="font-family: sans-serif">
                Dinja is based on several libraries:
                <ul>
                    <li><a href="https://deno.land/x/pogo/">Pogo</a>: the web framework used for dinja</li>
                    <li><a href="https://deno.land/x/denjucks/">Denjucks</a>: the templating engine used for dinja</li>
                    <li><a href="https://deno.land/x/dex/">Dex</a>: an SQL query builder for deno based on knex.js</li>
                    <li><a href="https://deno.land/x/sqlite/">Dexecutor</a>: an SQL query executor for deno</li>
                </ul>
            </p>
            
            <p>Documentation for Dinja can be found <a href="https://deno.land/x/dinja">here</a>.</p>
        </div>
    </div>
{% endblock content %}
```

Notice how index.html extends off the parent template **_base.html**, which contains the following:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>My Webpage</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        {% block content %}
        
        {% endblock content %}
    </body>
</html>
```

Denjucks templates make it easy to scale the applet for multiple routes, as they can extend from other templates. More information and documentation for Denjucks can be found [here](https://github.com/denjucks/denjucks)


## Adding more routes to an applet

New routes can be added in the **router.js**. Let's say we want to add a new route:

```javascript
router.get(pathPrefix + "/newroute", (request) => {
    return denjucksEnv.render("newtemplate.html");
});
```

In this case, we can access the route at this URL:

```
http://localhost:55555/main/newroute
```

And the result will be the rendered file **newtemplate.html**.

Internally Dinja uses **Pogo** for it's web server, and more information and documentation for Pogo can be found [here](https://github.com/sholladay/pogo)


## Creating more applets

To create a new applet, simply run the following Dinja command:

```
deno run -A dinja.js createapp newapp
```

This will create a new applet within the **applets** folder called **newapp**. It will have the same contents as **main** when it was first created, but won't by default be registered. To register it, add the following code to **server.js**:

```javascript
// Importing routers and adding routers to the server
import * as main from "./applets/main/router.js";
server.router.add(main.router);

import * as newapp from "./applets/newapp/router.js";
server.router.add(newapp.router);
```

And now you'll have access to all the routes created for the applet.


## Using a database

By default Dinja uses Dex and Dexecutor to create and execute SQL queries. This allows you to easily switch been databases like Sqlite3 (which is useful for development environments) and databases like Postgres or MySQL/MariaDB.

Each applet contains a **models.js** file which contains all the schemas for the Sqlite database for this applet. The contents of the **models.js** include the following:

```javascript
import Dex from "https://deno.land/x/dinja/lib/dex/mod.ts";
import {dbconfig} from "../../utilities/dbconfig.js";

const dex = Dex({client: dbconfig.client});

export const models = [
    dex.schema.createTable("mainUsers", (table) => {
        table.increments("id").primary();
        table.string("username");
        table.string("hashedPassword");
        table.string("firstname", 64);
        table.string("lastname", 64);
        table.string("email");
        table.string("phoneNumber", 32);
        table.timestamps(null, true);
    }).toString(),
]
```

All models for the applet are created using the Dex SQL Query Builder within the **models** array. New models can be added by simply adding them to this array. For more information on how to use Dex to create queries, see the Dex repository [here](https://deno.land/x/dex)

To migrate all models within all applets, we can use this Dinja command:

```
deno run -A dinja.js migrate
```

Notice that the **router.js** files contain an exported **database** variable from the **server.js** file. The database can be accessed within the routes in the router using this variable.

Finally, note that the **models.js** files imports a **dbconfig** variable from the **dbconfig.js** file. This file contains a variable that you can use to change your database configurations to, for example, switch to a different database. The contents of the **dbconfig.js** file includes the following:

```javascript
export const dbconfig = {
    client: "sqlite3",
    connection: {
        filename: "sqlite.db",
    }
}
```

This config is used in Dex and Dexecutor, and to find out how to configure it, see the [Dexecutor Repo](https://deno.land/x/dexecutor) and [Dex Repo](https://deno.land/x/dex).


## Future Features of Dinja

Plans for future updates to Dinja include:

 - [x] Using an ORM for the database engine allowing multiple databases to be used and allowing databases to be easily interchanged
 - [x] Update Dinja with any new changes to the Deno API after Deno 1.0 releases
 - [ ] Ability to package all dependencies into a dinja project
 - [ ] Optimize and further document the code internally
 - [ ] Add more commands to the dinja.js CLI as more features are added to Dinja
 - [ ] Adding Typescript types to everything
