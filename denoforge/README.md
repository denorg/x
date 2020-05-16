# DenoForge

DenoForge is a port of data transformation library **data-forge**. data-forge is a library similar to Python's Pandas library, which allows you to organize data into Series and DataFrames for much easier manipulation. Additionally, data-forge takes features from C#'s LINQ, making the library easy to use in a functional programming style.

This port is a port of the webpacked browser version of data-forge. Within the repository, there are 2 versions of DenoForge, with the only difference being how dependencies are linked:

 * **denoforge.js**: this version uses frozen dependencies contained within this repository. As long as the repository remains up and there are no breaking changes in Deno or the underlying V8 engine used by Deno, then this version should remain usable indefinitely in the future.

* **denoforge-dynamic.js**: this version uses dynamic dependencies pulled from [jspm.io](https://jspm.io/) using the same semantic versioning of the node version of the data-forge library. There is no guarantee that this version will work in the future (for example if jspm.io goes down or if there are breaking changes in the dependencies), but any non-breaking bug fixes or changes that improve the underlying performance of the dependencies may improve this library as well, and this version will take advantage of those changes.


## Installation

To install DenoForge, simply import the github repository:

```JavaScript
import * as denoforge from "https://raw.githubusercontent.com/denjucks/denoforge/master/denoforge.js";
```


## Quick start

DenoForge can load CSV, JSON or arbitrary data sets. 

Here's an example of creating a Series and a DataFrame:

```JavaScript
import * as denoforge from "https://raw.githubusercontent.com/denjucks/denoforge/master/denoforge.js";

// Creating a Series
let ser = new denoforge.Series([1, 2, 3, 4]);

console.log(ser.toString());
console.log("Average of the Series is: %s", ser.average());

// Creating a DataFrame
let df = new denoforge.DataFrame([
	{colA: 1, colB: 2},
	{colA: 3, colB: 4},
]);

console.log(df.toString());
console.log("Minimum value of column A: %s", df.getSeries("colA").min());
```


## Features

- Or work with arbitrary JavaScript data.
- Many options for working with your data:
    - Filtering
    - Transformation
    - Extracting subsets
    - Grouping, aggregation and summarization
    - Sorting
    - And much more
- Great for slicing and dicing tabular data:
    - Add, remove, transform and generate named columns (series) of data.
- Great for working with time series data.
- Your data is indexed so you have the ability to merge and aggregate.
- Your data is immutable! Transformations and modifications produce a new dataset.
- Build data pipeline that are evaluated lazily.
- Inspired by Pandas and LINQ, so it might feel familiar!


## Documentation

Since this library is a port of Data-Forge, full documentation on how to use this library and additional information can be found at the following links:

- [Changes](https://github.com/data-forge/data-forge-ts/blob/master/docs/changes.md)
- [The guide](https://github.com/data-forge/data-forge-ts/blob/master/docs/guide.md)
- [Key concepts](https://github.com/data-forge/data-forge-ts/blob/master/docs/concepts.md)
- [API docs](https://data-forge.github.io/data-forge-ts/)


