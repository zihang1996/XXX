var c = document.getElementById("c");
var c1 = document.getElementById("c1");
var lis = document.getElementsByTagName("li");
c.addEventListener("touchstart", function(ev) {
	ev.preventDefault();
})
var w = lis[0].clientWidth;
var disx;
var leftp = 0;
c1.addEventListener("touchstart", function(ev) {
	disx = ev.changedTouches[0].pageX;
	console.log(disx);
	leftp = this.offsetLeft;
})
c1.addEventListener("touchmove", function(ev) {
	c1.style.left = (ev.changedTouches[0].pageX - disx) + leftp + "px";
})
c1.addEventListener("touchend", function(ev) {
	var n = Math.round(this.offsetLeft / w);
	c1.style.left = n * w + "px";
})
