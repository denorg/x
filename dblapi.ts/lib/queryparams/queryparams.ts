export function parseQuery(params: any[][]): string {
    let output = "";
    for (const [param, value] of params) {
        if (output.includes('?') && value !== "") {
            output += `&${param}=${value}`;
        } else if (value !== "") {
            output += `?${param}=${value}`;
        };
    };
    return output;
};