import * as coloring from "https://deno.land/std@v0.11.0/colors/mod.ts"
import "./stringInterface.ts"

String.prototype.bgBlack = function (): string  {
    return coloring.bgBlack(this)
};

String.prototype.bgBlue = function (): string  {
    return coloring.bgBlue(this)
};

String.prototype.bgCyan = function (): string  {
    return coloring.bgCyan(this)
};

String.prototype.bgGreen = function (): string  {
    return coloring.bgGreen(this)
};

String.prototype.bgMagenta = function (): string  {
    return coloring.bgMagenta(this)
};

String.prototype.bgRed = function (): string  {
    return coloring.bgRed(this)
};

String.prototype.bgWhite = function (): string  {
    return coloring.bgWhite(this)
};

String.prototype.bgYellow = function (): string  {
    return coloring.bgYellow(this)
};

String.prototype.black = function (): string  {
    return coloring.black(this)
};

String.prototype.blue = function (): string  {
    return coloring.blue(this)
};

String.prototype.bold = function (): string  {
    return coloring.bold(this)
};

String.prototype.cyan = function (): string  {
    return coloring.cyan(this)
};

String.prototype.dim = function (): string  {
    return coloring.dim(this)
};

String.prototype.gray = function (): string  {
    return coloring.gray(this)
};

String.prototype.green = function (): string  {
    return coloring.green(this)
};

String.prototype.hidden = function (): string  {
    return coloring.hidden(this)
};

String.prototype.inverse = function (): string  {
    return coloring.inverse(this)
};

String.prototype.italic = function (): string  {
    return coloring.italic(this)
};

String.prototype.magenta = function (): string  {
    return coloring.magenta(this)
};

String.prototype.red = function (): string  {
    return coloring.red(this)
};

String.prototype.reset = function (): string  {
    return coloring.reset(this)
};

String.prototype.strikethrough = function (): string  {
    return coloring.strikethrough(this)
};

String.prototype.underline = function (): string  {
    return coloring.underline(this)
};

String.prototype.white = function (): string  {
    return coloring.white(this)
};

String.prototype.yellow = function (): string  {
    return coloring.yellow(this)
};