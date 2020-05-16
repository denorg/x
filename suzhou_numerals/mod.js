const hangzhou = [
    "〇",
    "〡",
    "〢",
    "〣",
    "〤",
    "〥",
    "〦",
    "〧",
    "〨",
    "〩",
];
const hangzhou_alternative = [
    "一",
    "二",
    "三",
];
export function decode(s) {
    return [...s].map((c) => {
        if (hangzhou_alternative.indexOf(c) === -1) {
            if (hangzhou.indexOf(c) === -1) {
                throw new TypeError(`failed to decode ${c}`);
            }
            else {
                return hangzhou.indexOf(c).toString();
            }
        }
        else {
            return (hangzhou_alternative.indexOf(c) + 1).toString();
        }
    }).join("");
}
function rewrite_with_alternatives(without_alternatives) {
    without_alternatives.forEach((c, i, arr) => {
        const one_two_three = hangzhou.slice(1, 4);
        if (one_two_three.includes(c)) {
            if (one_two_three.includes(arr[i - 1])) {
                arr[i] = hangzhou_alternative[hangzhou.indexOf(c) - 1];
            }
        }
    });
    return without_alternatives;
}
export function encode(n) {
    return rewrite_with_alternatives([...n.toString()].map((d) => hangzhou[parseInt(d)]))
        .join("");
}
