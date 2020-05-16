#### Wrapper of [novelCOVID API](https://disease.sh) for Deno

#### Wrapper of covid-19 API for easy use in deno

[![deno documentation](https://img.shields.io/badge/deno-documentation-tomato?style=flat)](https://doc.deno.land/https/deno.land/x/novelcovid_wrapper/mod.ts)[![chat](https://img.shields.io/badge/chat-discord-tomato)](https://discord.gg/CCFbnrP)



## Usage

All methods return a promise



For more documentation see the [Doc](https://doc.deno.land/https/deno.land/x/novelcovid_wrapper/mod.ts)



```javascript
import { Wrapper } from 'https://deno.land/x/novelcovid_wrapper/mod.ts';

const wrapper = new Wrapper();

wrapper
    .country('co')
    .then((data) => console.log); // Print data of colombia
```



### Countries

```javascript
/**
 * Get all affected countries data
 * Return and object of type Countries like { data: [Country] }
 */
wrapper
    .countries().then((data) => console.log);

/**
 * Get all affected countries ordered data (order by country, cases, todayCases, deaths, todayDeaths, ...)
 * Return and object of type Countries like { data: [Country] }
 */
wrapper
    .countries({ sort: 'country' }).then((data) => console.log);

/**
 * Get yesterday data of affected countries
 * Return and object of type Countries like { data: [Country] }
 */
wrapper
    .countries({ yesterday: true }).then((data) => console.log);

/**
 * Get data of continents
 * Return and object of type Countries like { data: [Country] }
 * the data can be ordered sending { sort: 'continent' }
 */
wrapper
    .continents().then((data) => console.log);
```



### Continents

```javascript
/**
 * Get data of continents
 * Return and object of type Countries like { data: [Continent] }
 */
wrapper
    .continents().then((data) => console.log(data));


/**
 * Get data of specific continent
 */
wrapper
    .continent('North America').then((data) => console.log(data));


```

### States

```javascript
/**
 * Get data of states
 */
wrapper
    .states().then((data) => console.log(data));

/**
 * Get data of specific state
 */
wrapper
    .state('Northern Mariana Islands').then((data) => console.log(data));
```

### Historical

```javascript
/**
 * Get all historical list
 */
wrapper
    .historical()
    .then((d: any) => console.log);

/**
 * Get all historical for a country
 */
wrapper
    .historical({ country: 'USA' })
    .then((d: any) => console.log);

/**
 * Get all historical for a province
 */
wrapper
    .historical({ country: 'China', province: 'guangdong' })
    .then((d: any) => console.log);

/**
 * Get 5 last days of historical for a province (also works for the country history)
 */
wrapper
    .historical({ country: 'China', province: 'guangdong', days: 5 })
    .then((d: any) => console.log);
```