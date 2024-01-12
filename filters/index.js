export const price = (value) => {
	if (!value)
		return '0';
	return parseFloat((Math.round(value * (Math.pow(10, 2))) / (Math.pow(10, 2))).toFixed(2));
}