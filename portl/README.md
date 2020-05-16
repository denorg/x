# portl

0 configuration backend, for serving js functions and generators

## Usage

1. Create a file that exports the functions you want to expose.

    ```javascript
    // serve.js

    export const fn = (input) => input + " postfix";

    export const it = async function*(mul) {
        const arr = [1, 2, 3];

        while (arr.length) {
            yield new Promise((resolve) => {
                setTimeout(() => resolve(mul * arr.shift()), 1000);
            });
        }
    };
    ```
2. Run the server script with the file `./serve.js` as argument

    ```bash
    deno --allow-net --allow-read https://deno.land/x/portl/portl-server.js ./serve.js
    ```
3. Import the client script and call the functions
   ```js
    import portl from "https://gitcdn.xyz/repo/FalkZ/portl/master/portl-client.js";

    portl.fn('from client').then(console.log)
    // => from client postfix

    portl.it(3).subscribe(console.log)
    // => 3
    // => 6
    // => 9

   ```
