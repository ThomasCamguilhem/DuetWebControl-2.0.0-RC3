<template>
	<v-card>
		<v-card-title class="pt-2 pb-0 nowrap">

			<v-spacer class="hidden-sm-and-down"></v-spacer>

			<v-icon small class="mr-1">visibility</v-icon> Gcode Visualizer
			<v-spacer></v-spacer>
		</v-card-title>
		<div style="width: 600px; height: 520px; overflow: hidden; margin:auto"  @mouseenter="zoomIn()" @mouseleave="zoomOut()" v-on:mousemove="centerSvg(e)" v-on:mousewheel="zoomSvg(e)" v-on:wheel="zoomSvg(e)">
				<div id="liveDisplay" style="width: 600px; height: 520px; transform: scale(0.5); transform-origin: 0% 0%"><canvas></canvas></div>
		</div>
  </v-card>
</template>
<script>
	export default {
		name: 'gcode-viewer',
		data() {
			console.log(this);
			return {
				zoomLevel: 2,
			}
		},
		methods: {
			zoomIn: function()
			{
					document.getElementById("liveDisplay").firstElementChild.style.transform = "scale("+ (this.zoomLevel) +")";
					document.getElementById("liveDisplay").firstElementChild.style.transition = "transform .5s"
			},
			zoomOut: function()
			{
					document.getElementById("liveDisplay").firstElementChild.style.transform = "scale("+1+")";
			},
			centerSvg: function(event)
			{
				var cX = (event.offsetX)/12;
				var cY = (event.offsetY)/10.4;
				//console.log("X = " + cX + "%")
				//console.log("Y = " + cY + "%")
				document.getElementById("liveDisplay").firstElementChild.style["transform-origin"] = cX + "% " + cY + "%";
			},
			zoomSvg: function(event)
			{
				var  dir = event.deltaY;
				//var fast = event.shiftKey
				if ((dir < 0) && (this.zoomLevel < 4)) // forward
				{
					document.getElementById("liveDisplay").firstElementChild.style.transform = "scale("+ (this.zoomLevel *= 1.1) +")";
				} else if ((dir > 0) && (this.zoomLevel > 1)) {
					document.getElementById("liveDisplay").firstElementChild.style.transform = "scale("+ (this.zoomLevel /= 1.1) +")";
				}
				event.preventDefault();
			},
		}
	}
</script>
<script	src="../../lynxmod/threeScene.js">
</script>
