//var fileInput;
//var ajaxPrefix = "http://localhost:8080/";
//var timeToStr = function(){};
/* img to Blob*/
/* ======== THREE_SCENE ======== */
let THREE = require('three') ;
let Stats = require('stats') ;
let Preview = require('./preview') ;
let Live = require ('./live') ;

export default {
	name: 'ThreeScene',
	data() {
		return {
			DEBUG: false,
			//layStart = 0,
			//layEnd = 100,
			//strDownloadMime = "image/octet-stream",
			statsfps: undefined,
			needsRedraw: false,
			i: 0,
			nbKey: 0,
			keys: [],
			lays: [],
			lay: 0,
			curlay: 0,
			hasGeoToRender: false,
			newStatus: {},
		}
	},
	methods: {
		initScene: function()
		{
			if(this.DEBUG)
			{
				this.statsfps = new Stats();
				this.statsfps.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
				document.body.appendChild( this.statsfps.dom );
			}
			console.log(Preview);
			console.log(Preview.initPreview);
			Preview.initPreview();
			Live.initLive();
		},
		animate: function() {
			this.statsfps.begin();
			Preview.previewControls.update();
			requestAnimationFrame( this.animate );
			if (this.hasGeoToRender || this.needsRedraw)
				Preview.previewRenderer.render( Preview.previewScene, Preview.previewCamera );
			Live.liveRenderer.render(Live.liveScene, Live.liveCamera);
			if (this.hasGeoToRender)
				Preview.renderLoop();
			if (this.needsRedraw)
				this.redrawLoop();
			//light.position.z -= 0.1;
			this.statsfps.end();
		},
		initRedraw: function()
		{
			this.needsRedraw = true;
			//layStart = parseInt($("#firstLayer")[0].value);
			//layEnd = parseInt($("#lastLayer")[0].value);
			if (this.layStart == undefined)
				this.layStart = 0;
			if (this.layEnd == undefined)
				this.layEnd = this.nbLayers;

			this.i = 0;
			this.lay = 0;
			this.nbKey = this.pointCloud.length;
			this.keys = [];
			for(var key in this.pointCloud)
			{
				if(key != "length" )
				{
					this.keys.push(key);
				}
			}
			for(var layer in this.pointCloud[this.keys[0]])
			{
				this.lays.push(layer);
			}
			var color = new THREE.Color().setHSL((this.i/this.nbKey), 0.75, 0.5);
			//console.log(key +" ("+color.r+","+color.g+","+color.b+")")
			this.pointMaterial = new THREE.LineBasicMaterial({color: color, width:2});
			this.meshMaterial = new THREE.MeshPhongMaterial({color: color});
		},
		redrawLoop: function()
		{
			if (this.i == this.keys.length)
			{
				this.needsRedraw = false;
				return;
			}
			if (this.lays[this.lay] != undefined )
			{
				var start = new Date();
				do {
					this.lay ++;
				}while ((new Date() - start < 10) && (this.lays[this.lay] != undefined ))
			} else if (this.i < this.keys.length)
			{
				this.i++;
				this.lays = [];
				for(var layer in this.pointCloud[this.keys[this.i]])
				{
					this.lays.push(layer);
				}
				var color = new THREE.Color().setHSL((this.i/this.nbKey), 0.75, 0.5);
				//console.log(key +" ("+color.r+","+color.g+","+color.b+")")
				this.pointMaterial = new THREE.LineBasicMaterial({color: color, linewidth: 2});
				this.meshMaterial = new THREE.MeshPhongMaterial({color: color});
				this.lay = 0;
			}
		},
	},
	mounted() {
		this.initScene();
		this.animate();
	}
}
/*
const
// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
}
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
}
*/
