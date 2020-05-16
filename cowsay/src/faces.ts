let modes = [
	{
		eyes: "oo",
		tongue: "  "
	},
	{
		eyes : "==",
		tongue : "  "
	},
	{
		eyes : "xx",
		tongue : "U "
	},
	{
		eyes : "$$",
		tongue : "  "
	},
	{
		eyes : "@@",
		tongue : "  "
	},
	{
		eyes : "**",
		tongue : "U "
	},
	{
		eyes : "--",
		tongue : "  "
	},
	{
		eyes : "OO",
		tongue : "  "
	},
	{
		eyes : "..",
		tongue : "  "
	}
];

export const faces = function (options): any {
	if (options.mode) {
		let m = modes[options.mode]
		return m;
	}
	return {
		eyes : options.eyes || "oo",
		tongue : options.tongue || "  "
	};
};
