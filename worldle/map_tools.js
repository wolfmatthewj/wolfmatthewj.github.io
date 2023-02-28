function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
function randomLat() {
	// Don't bother with the arctic and antarctic circles
	// exclude 67 and above and -67 and below
	return getRandomInt(134) - 67;
}
function randomLng() {
	return getRandomInt(360) - 180;
}