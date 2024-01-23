export const price = (value) => {
	if (!value)
		return '0';
	return parseFloat((Math.round(value * (Math.pow(10, 2))) / (Math.pow(10, 2))).toFixed(2));
}

export const formatTime = (seconds) => {
	let hours = Math.floor(seconds / 3600);
	let minutes = Math.floor((seconds % 3600) / 60);
	let remainingSeconds = seconds % 60;

	// 添加前导零
	hours = String(hours).padStart(2, '0');
	minutes = String(minutes).padStart(2, '0');
	remainingSeconds = String(remainingSeconds).padStart(2, '0');

	return `${hours}:${minutes}:${remainingSeconds}`;
}