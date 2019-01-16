let $ = require('jquery') ;
let THREE = require('three') ;

export default {
	name: 'PreviewScene',
	data() {
		return {
			previewCamera: undefined,
			previewScene: undefined,
			previewRenderer: undefined,
			previewControls: undefined,
		}
	},
	methods: {
	initPreview: function()
		{
			this.previewScene = new THREE.Scene();
			this.previewCamera = new THREE.PerspectiveCamera( 75, 600 / 600, 0.1, 10000 );
			var previewSpace = $("#threeDisplay")[0];
			this.previewRenderer = new THREE.WebGLRenderer({
					preserveDrawingBuffer: true,
					alpha: true
				});
			this.previewRenderer.setSize( 600, 600 );

			this.previewRenderer.shadowMapEnabeled = true;
			this.previewRenderer.shadowMap.type = THREE.BasicShadowMap;
			previewSpace.appendChild( this.previewRenderer.domElement );
			var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
			this.previewScene.add(ambientLight);

			var light = new THREE.PointLight( 0xffffff, 1, 600);
			light.position.set( 0, 295, 0 );
			light.castShadow = true;
			light.shadow.camera.near = 0.1;
			light.shadow.camera.far = 1000
			this.previewScene.add( light );

			var geometry = new THREE.CircleGeometry( 180, 30);
			var material = new THREE.MeshPhongMaterial({ color: 0xf0f0f0 } );
			var buildPlate = new THREE.Mesh(new THREE.CircleGeometry( 200, 30), new THREE.MeshBasicMaterial({ color: 0xf0f0f0 }));
			buildPlate.receiveShadow = true;
			buildPlate.rotation.x = -Math.PI/2;
			buildPlate.position.y = -0.1;
			var buildSurface = new THREE.Mesh( geometry, material );
			buildSurface.receiveShadow = true;
			buildSurface.rotation.x = -Math.PI/2;
			buildSurface.position.y = 0.1;
			var topMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff,	side: THREE.BackSide} );
			var topCircle = new THREE.Mesh( geometry, topMaterial );
			topCircle.rotation.x = -Math.PI/2;
			topCircle.position.y = 600;
			//this.previewScene.add( topCircle );
			this.previewScene.add( buildSurface );
			this.previewScene.add( buildPlate );
			geometry = new THREE.CylinderGeometry( 200, 200, 600, 32, 1, true, 0, Math.PI );
			material = new THREE.MeshBasicMaterial({color: 0xe0e0e0, side: THREE.BackSide} );
			var buildVolume = new THREE.Mesh( geometry, material );

			buildVolume.position.y = 300;
			this.previewScene.add( buildVolume );

			this.previewControls = new THREE.OrbitControls( this.previewCamera , $("#threeDisplay")[0]);

			var gridPrimeGeo = new THREE.Geometry();
			var gridSecGeo = new THREE.Geometry();
			var materPrime = new THREE.LineBasicMaterial({ color: 0x7f7f7f});
			var materSec = new THREE.LineBasicMaterial({ color: 0xafafaf});

			this.prepareGridBPGeoPreview(gridPrimeGeo, gridSecGeo);

			this.previewScene.add(new THREE.LineSegments(gridPrimeGeo, materPrime));
			this.previewScene.add(new THREE.LineSegments(gridSecGeo, materSec));

			// this.previewCamera center
			this.previewCamera.position.set(-400, 575, 0);
			//this.previewCamera positive
			//this.previewCamera.position.set(-100, 150, 100);
			this.previewCamera.rotation.set(-Math.PI/2, -1, -Math.PI/2);
		},
	prepareGridBPGeoPreview: function(gridPrime, gridSec)
	{
		for (var posY = -200; posY < 180; posY += 100)
		{
			var miniX = -180 * Math.sqrt(1 - ((posY/180) * (posY/180)));
			var maxiX =	180 * Math.sqrt(1 - ((posY/180) * (posY/180)));
			gridPrime.vertices.push(new THREE.Vector3(miniX, 1, posY));
			gridPrime.vertices.push(new THREE.Vector3(maxiX, 1, posY));
			gridPrime.vertices.push(new THREE.Vector3(posY, 1, miniX));
			gridPrime.vertices.push(new THREE.Vector3(posY, 1, maxiX));
			for (var posX = posY + 20; posX < posY + 100; posX += 20)
			{
				miniX = -180 * Math.sqrt(1 - ((posX/180) * (posX/180)));
				maxiX =	180 * Math.sqrt(1 - ((posX/180) * (posX/180)));
				gridSec.vertices.push(new THREE.Vector3(miniX, 1, posX));
				gridSec.vertices.push(new THREE.Vector3(maxiX, 1, posX));
				gridSec.vertices.push(new THREE.Vector3(posX, 1, miniX));
				gridSec.vertices.push(new THREE.Vector3(posX, 1, maxiX));
			}
		}
	},
	initRender: function()
	{
		this.i = 0;
		this.lay = 0;
		this.nbKey = this.pointCloud.length;
		this.keys = [];
		for(let key in this.pointCloud)
		{
			if(key != "length" )
			{
				this.keys.push(key);
			}
		}
		for(let gcodeLayer in this.pointCloud[this.keys[0]])
		{
			this.lays.push(gcodeLayer);
		}
		var color = new THREE.Color().setHSL((this.i/this.nbKey), 0.75, 0.5);
		//console.log(key +" ("+color.r+","+color.g+","+color.b+")")
		this.pointMaterial = new THREE.LineBasicMaterial({color: color, linewidth:2});
		this.meshMaterial = new THREE.MeshPhongMaterial({color: color});

		for(let key in this.pointCloud)
		{
			if(this.slicer==undefined || key == "Unknown" || key != "length" )
			{
				for(let gcodeLayer in this.pointCloud[key])
				{
					this.previewScene.remove(this.previewScene.getObjectByName(key+"_"+gcodeLayer));
				}
			}
		}

		if(this.previewScene.getObjectByName("bbox"))
		{
			this.previewScene.remove(this.previewScene.getObjectByName("bbox"));
		}
		var geo = new THREE.Geometry();
		// bottom bbox
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.min.x, this.boundingBox.min.z, this.boundingBox.min.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.min.x, this.boundingBox.min.z, this.boundingBox.max.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.min.x, this.boundingBox.min.z, this.boundingBox.max.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.max.x, this.boundingBox.min.z, this.boundingBox.max.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.max.x, this.boundingBox.min.z, this.boundingBox.max.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.max.x, this.boundingBox.min.z, this.boundingBox.min.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.max.x, this.boundingBox.min.z, this.boundingBox.min.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.min.x, this.boundingBox.min.z, this.boundingBox.min.y));
		// sides bbox
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.min.x, this.boundingBox.min.z, this.boundingBox.min.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.min.x, this.boundingBox.max.z, this.boundingBox.min.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.min.x, this.boundingBox.min.z, this.boundingBox.max.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.min.x, this.boundingBox.max.z, this.boundingBox.max.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.max.x, this.boundingBox.min.z, this.boundingBox.max.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.max.x, this.boundingBox.max.z, this.boundingBox.max.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.max.x, this.boundingBox.min.z, this.boundingBox.min.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.max.x, this.boundingBox.max.z, this.boundingBox.min.y));
		//top bbox
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.min.x, this.boundingBox.max.z, this.boundingBox.min.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.min.x, this.boundingBox.max.z, this.boundingBox.max.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.min.x, this.boundingBox.max.z, this.boundingBox.max.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.max.x, this.boundingBox.max.z, this.boundingBox.max.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.max.x, this.boundingBox.max.z, this.boundingBox.max.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.max.x, this.boundingBox.max.z, this.boundingBox.min.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.max.x, this.boundingBox.max.z, this.boundingBox.min.y));
		geo.vertices.push(new THREE.Vector3(-this.boundingBox.min.x, this.boundingBox.max.z, this.boundingBox.min.y));

		var bbox = new THREE.LineSegments(geo, new THREE.LineBasicMaterial());
		bbox.name = "bbox";
		this.previewScene.add(bbox);
		this.newStatus = this.parseRows[this.parsedFileCount].find("#status");
	},
	renderLoop: function()
	{
		if (this.i == this.keys.length)
		{
			this.hasGeoToRender = false;
			this.newStatus[0].innerHTML = "Done ";
			this.initRedraw();
			setTimeout(function(){
			this.newStatus[0].innerHTML = "";
			}, 1000);
			var imgData;
			try {
				this.previewCamera.position.set(-400, 575, 0);
				this.previewControls.target.set(0, 300, 0);
				this.previewControls.update();
				this.previewRenderer.render( this.previewScene, this.previewCamera );
				var strMime = "image/jpeg";
				imgData = this.previewRenderer.domElement.toDataURL(strMime);
				this.savePicture(imgData.replace(strMime, this.strDownloadMime), this.fileInput.name.substring(0,this.fileInput.name.lastIndexOf("."))+"_bp.jpg");

				var centerX = (this.boundingBox.max.x + this.boundingBox.min.x)/2;
				var centerY = (this.boundingBox.max.y + this.boundingBox.min.y)/2;
				var centerZ = (this.boundingBox.max.z + this.boundingBox.min.z)/2;
				var width = this.boundingBox.max.x - this.boundingBox.min.x;
				var length = this.boundingBox.max.y - this.boundingBox.min.y;
				var height = this.boundingBox.max.z - this.boundingBox.min.z;
				let dFromC = 3/5*Math.sqrt(width*width+length*length);
				this.previewControls.object.position.set(-centerX+dFromC*Math.cos(Math.PI/4), 4/5*(centerZ+Math.max(width, length, height)), centerY+dFromC*Math.sin(Math.PI/4));
				this.previewControls.target.set(-centerX, centerZ, centerY);
				this.previewControls.update();
				this.previewRenderer.render(this.previewScene, this.previewCamera);
				imgData = this.previewRenderer.domElement.toDataURL(strMime);
				this.savePicture(this.imgData.replace(strMime, this.strDownloadMime), this.fileInput.name.substring(0,this.fileInput.name.lastIndexOf("."))+"_ico.jpg");
			} catch (e) {
				console.error(e);
				return;
			}
			return;
		}
		if (this.lays[this.lay] != undefined )
		{
			var start = new Date();
			do {
				this.renderGeo(this.keys[this.i], this.lays[this.lay]);
				this.lay ++;
			}while ((new Date() - start < 50) && (this.lays[this.lay] != undefined ))
		} else if (this.i < this.keys.length)
		{
			this.i++;
			this.lays = [];
			for(var gcodeLayer in this.pointCloud[this.keys[this.i]])
			{
				this.lays.push(gcodeLayer);
			}
			var color = new THREE.Color(this.tempChartOptions.colors[parseInt(this.keys[this.i])]);
			//console.log(key +" ("+color.r+","+color.g+","+color.b+")")
			this.pointMaterial = new THREE.LineBasicMaterial({color: color, linewidth: 2});
			this.meshMaterial = new THREE.MeshPhongMaterial({color: color});
			this.lay = 0;
			this.newStatus[0].innerHTML = "Drawing "+this.keys[this.i];
		} else {
			this.hasGeoToRender = false;
			this.newStatus[0].innerHTML = "Done ";
		}
	},
	redrawScene: function(key, layer, visible)
	{
		if (this.previewScene.getObjectByName(key+"_"+layer))
			this.previewScene.getObjectByName(key+"_"+layer).visible = visible;
	},
	renderGeo: function(key, gcodeLayer)
	{
    let threeDee;
		if (this.pointCloud[key] && this.pointCloud[key][gcodeLayer])
		{
			this.pointCloud[key][gcodeLayer].computeVertexNormals();
			if (this.fileSize < 10*1024*1024)
			{
			threeDee = (key != "MOVE"?new THREE.Mesh(
				new THREE.BufferGeometry().fromGeometry(this.pointCloud[key][gcodeLayer])
				, this.meshMaterial )
				: new THREE.LineSegments(this.pointCloud[key][gcodeLayer]
				, this.pointMaterial ));
			} else {
				threeDee =	new THREE.LineSegments(this.pointCloud[key][gcodeLayer]
				, this.pointMaterial );
			}
			if (key == "MOVE")
				threeDee.visible = false;
			threeDee.castShadow = true;
			threeDee.receiveShadow = true;
			threeDee.name = key+"_"+gcodeLayer;
			this.previewScene.add( threeDee );
		}
	},
	b64toBlob: function(e,t,n){t=t||"",n=n||512;for(var o=atob(e),r=[],a=0;a<o.length;a+=n){for(var l=o.slice(a,a+n),i=new Array(l.length),s=0;s<l.length;s++)i[s]=l.charCodeAt(s);var c=new Uint8Array(i);r.push(c)}return new Blob(r,{type:t})},
	savePicture: function(e,t){document.getElementById("myAwesomeForm");var n=e.split(";"),o=n[0].split(":")[1],r=this.b64toBlob(n[1].split(",")[1],o);var f = this.fileInput.name.substring(0,this.fileInput.name.lastIndexOf("."));while(f.includes(" ")||t.includes(" ")){f=f.replace(" ","_");t=t.replace(" ","_");}$.ajax({url:this.ajaxPrefix+"rr_upload?name=0:/www/img/GCodePreview/"+f+"/"+t+"&time="+encodeURIComponent(this.timeToStr(new Date)),data:r,type:"POST",contentType:!1,processData:!1,cache:!1,dataType:"json",async:0,error:function(e){console.error(e)},success:function(){console.log(e)},complete:function(){console.log("Request finished.")}})},
	}
}
