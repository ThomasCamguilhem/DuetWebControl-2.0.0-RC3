/* ======== GCODE_PARSER ======== */

const DEBUG = false;
var PREVIEW = false;
var SHOW_ALL = false;
var SHOW_PREV = false;
var SHOW_MOINS_2 = false;

var pointCloud = {length: 1};

function extractGCode(args)
{
	switch (args.cmd)
	{
		
		/* ====== G Codes ====== */
		
		case "G0":
		case "G1":
			
			//console.log("move");
			/*console.log("new position: \n\t" +
			(args.x?(relative?lastPos.x+args.x:args.x):lastPos.x) + "\n\t" +
			(args.y?(relative?lastPos.y+args.y:args.y):lastPos.y) + "\n\t" +
			(args.z?(relative?lastPos.z+args.z:args.z):lastPos.z));*/
			if ((relative?lastPos.z+args.z:args.z) > lastPos.z)
			{
				extruding = false;
			}
			if(args.e)
				extruding = (lastPos.e < (relativeExtrude? lastPos.e + args.e : args.e));
			if (zLayer != lastPos.z && extruding)
			{
				zPrevLayer = zLayer;
				zLayer = lastPos.z;
				
				if(curLay === undefined)
				{
					gcodeLayers.push({gcodeLayerStart: startLayer, gcodeLayer: gcodeLayer});
					nbLayers++;
				}
				startLayer = instructionPos;
				/* if(PREVIEW) {
					/* ====== SHOW BOUNDING BOX ====== */
					/*if (gcodeLayers[curLay-1] || gcodeLayers[curLay] || ((slicer == undefined || slicer == Slicer.SLIC) && nbLayers > 0))
					{
						if (!previewScene.getObjectByName("bbox"))
						{
							var centerX = (boundingBox.max.x + boundingBox.min.x)/2;
							var centerY = (boundingBox.max.y + boundingBox.min.y)/2;
							var width = boundingBox.max.x - boundingBox.min.x;
							var length = boundingBox.max.y - boundingBox.min.y;
							previewControls.object.position.set(-centerX, 0,centerY);
							if (nbLayers && layHeight)
								previewControls.object.position.y = (nbLayers*layHeight);
						}
						previewScene.remove(previewScene.getObjectByName("bbox"));
						var geo = new THREE.Geometry();
						// bottom bbox
						geo.vertices.push(new THREE.Vector3(-boundingBox.min.x, boundingBox.min.z, boundingBox.min.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.min.x, boundingBox.min.z, boundingBox.max.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.min.x, boundingBox.min.z, boundingBox.max.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.max.x, boundingBox.min.z, boundingBox.max.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.max.x, boundingBox.min.z, boundingBox.max.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.max.x, boundingBox.min.z, boundingBox.min.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.max.x, boundingBox.min.z, boundingBox.min.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.min.x, boundingBox.min.z, boundingBox.min.y));
						
						// sides bbox
						geo.vertices.push(new THREE.Vector3(-boundingBox.min.x, boundingBox.min.z, boundingBox.min.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.min.x, boundingBox.max.z, boundingBox.min.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.min.x, boundingBox.min.z, boundingBox.max.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.min.x, boundingBox.max.z, boundingBox.max.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.max.x, boundingBox.min.z, boundingBox.max.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.max.x, boundingBox.max.z, boundingBox.max.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.max.x, boundingBox.min.z, boundingBox.min.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.max.x, boundingBox.max.z, boundingBox.min.y));
						
						//top bbox
						geo.vertices.push(new THREE.Vector3(-boundingBox.min.x, boundingBox.max.z, boundingBox.min.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.min.x, boundingBox.max.z, boundingBox.max.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.min.x, boundingBox.max.z, boundingBox.max.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.max.x, boundingBox.max.z, boundingBox.max.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.max.x, boundingBox.max.z, boundingBox.max.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.max.x, boundingBox.max.z, boundingBox.min.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.max.x, boundingBox.max.z, boundingBox.min.y));
						geo.vertices.push(new THREE.Vector3(-boundingBox.min.x, boundingBox.max.z, boundingBox.min.y));
						
						var bbox = new THREE.LineSegments(geo, new THREE.LineBasicMaterial());
						bbox.name = "bbox";
						previewScene.add(bbox);
						
						var centerX = (boundingBox.max.x + boundingBox.min.x)/2;
						var centerY = (boundingBox.max.y + boundingBox.min.y)/2;
						previewCamera.position.set(-centerX, 0,centerY);
						var width = boundingBox.max.x - boundingBox.min.x;
						var length = boundingBox.max.y - boundingBox.min.y;
						previewControls.target.x = -centerX;
						previewControls.target.z =  centerY;
						if (curLay!=undefined && layHeight)
						{
							previewControls.object.position.y =  4/6*Math.max(width, length)+(curLay*layHeight);
							previewControls.target.y = (boundingBox.max.z + boundingBox.min.z)/2;
						} else {
							previewControls.object.position.y = 4/6*Math.max(width, length)+(lastPos.z);
							previewControls.target.y = (boundingBox.max.z + boundingBox.min.z)/2;
						}
						previewControls.update();
					}
					nbKey = 0;
					for (var key in pointCloud)
					{
						var id = [];
						if (!curLay)
							for (var i in pointCloud[key])
								id.push(i);
						var pt = id.length;
						if (!SHOW_PREV && !SHOW_ALL) {
							previewScene.remove(previewScene.getObjectByName( key+"_"+(curLay!=undefined?curLay-2:id[pt-2])));
							previewScene.remove(previewScene.getObjectByName( key+"_"+(curLay!=undefined?curLay-2:id[pt-2])));
						}else if (previewScene.getObjectByName( key+"_"+(curLay!=undefined?curLay-2:id[pt-2])))
							previewScene.getObjectByName( key+"_"+(curLay!=undefined?curLay-2:id[pt-2])).material.color = {r:0, g:0, b:0};
						if (!SHOW_MOINS_2 && !SHOW_ALL){
							previewScene.remove(previewScene.getObjectByName( key+"_"+(curLay!=undefined?curLay-3:id[pt-3])));
							previewScene.remove(previewScene.getObjectByName( key+"_"+(curLay!=undefined?curLay-3:id[pt-3])));
						} else if (previewScene.getObjectByName( key+"_"+(curLay!=undefined?curLay-3:id[pt-3])))
							previewScene.getObjectByName( key+"_"+(curLay!=undefined?curLay-3:id[pt-3])).material.color =  {r:0.25, g:0.25, b:0.25};
						if (!SHOW_ALL){
							previewScene.remove(previewScene.getObjectByName( key+"_"+(curLay!=undefined?curLay-4:id[pt-4])));
							previewScene.remove(previewScene.getObjectByName( key+"_"+(curLay!=undefined?curLay-4:id[pt-4])));
							}
						else if	(previewScene.getObjectByName( key+"_"+(curLay!=undefined?curLay-4:id[pt-4])))
							previewScene.getObjectByName( key+"_"+(curLay!=undefined?curLay-4:id[pt-4])).material.color =  {r:0.5, g:0.5, b:0.5};
						if (pointCloud[key][(curLay!=undefined?curLay-1:id[pt-1])] != undefined)
						{
							nbKey++;
						}
					}
					var i = 0;						
					for (var key in pointCloud)
					{
						var id = [];
						if (curLay == undefined)
							for (var i in pointCloud[key])
								id.push(i);
						var pt = id.length;
						var color = new THREE.Color().setHSL(((i-1)/nbKey), 1, 0.5);
						//console.log(key +" ("+color.r+","+color.g+","+color.b+")")
						pointMaterial = new THREE.LineBasicMaterial({color: color, linewidth:2});
						meshMaterial = new THREE.MeshPhongMaterial({color: color});
						if (pointCloud[key][(curLay!=undefined?curLay-1:id[pt-1])] != undefined)
						{
							pointCloud[key][(curLay!=undefined?curLay-1:id[pt-1])].computeVertexNormals();
							if (fileSize < 10*1024*1024)
							{
								threeDee = (key != "MOVE"?new THREE.Mesh(
									new THREE.BufferGeometry().fromGeometry(pointCloud[key][(curLay!=undefined?curLay-1:id[pt-1])])
									, meshMaterial )
									: new THREE.LineSegments(pointCloud[key][(curLay!=undefined?curLay-1:id[pt-1])]
									, pointMaterial));
							} else {
								threeDee =  new THREE.LineSegments(pointCloud[key][(curLay!=undefined?curLay-1:id[pt-1])]
								, pointMaterial);
							}
							threeDee.castShadow = true;
							threeDee.receiveShadow = true;
							threeDee.name = key+"_"+((curLay!=undefined?curLay-1:id[pt-1]));
							previewScene.add( threeDee );
						}
						i++;
					}
					
					if (gcodeLayers.length > 1)
					{
						var imgData, imgNode;
						try {
							previewControls.update();
							previewRenderer.render( previewScene, previewCamera );
							var strMime = "image/jpeg";
							imgData = previewRenderer.domElement.toDataURL(strMime);
							savePicture(imgData, fileInput.name.substring(0,fileInput.name.lastIndexOf("."))+"_"+(curLay-1)+".jpg");
						} catch (e) {
							console.error(e);
							return;
						}
					}
				}*/
				gcodeLayer = {lBBox : {min:{x:1000,y:1000,z:1000}, max:{x:-1000,y:-1000,z:-1000}},points: []};
			}
			
			if ((lastPos.x && lastPos.y && lastPos.z) && (args.x || args.y || args.z))
			{
				var x2 = (relative?(lastPos.x + args.x):args.x);
				var y2 = (relative?(lastPos.y + args.y):args.y);
					
				var point_start = new THREE.Vector3();
				var point_end = new THREE.Vector3();
				if (args.e)
				{
					//console.log(Math.round(lastPos.z*100));
					if(!pointCloud[lastPos.t] || !pointCloud[lastPos.t][(curLay!=undefined?curLay:(Math.round(lastPos.z*100)))])
					{
						if ( !pointCloud[lastPos.t])
						{
							pointCloud[lastPos.t] = [];
							pointCloud.length++;
						}
						pointCloud[lastPos.t][(curLay!=undefined?curLay:(Math.round(lastPos.z*100)))] = new THREE.Geometry();
						pointCloud[lastPos.t][(curLay!=undefined?curLay:(Math.round(lastPos.z*100)))].name = lastPos.t+"_"+(curLay!=undefined?curLay:(Math.round(lastPos.z*100)));
					}
					point_start.x = -lastPos.x;
					point_start.y = lastPos.z; //-y2;
					point_start.z = lastPos.y;//lastPos.z;
					
					point_end.x = -x2;
					point_end.y = lastPos.z; //-y2;
					point_end.z = y2;//lastPos.z;
					if (fileSize < 10*1024*1024)
					{
						setPoly(point_start, point_end);
					} else {
						pointCloud[lastPos.t][(curLay!=undefined?curLay:(Math.round(lastPos.z*100)))].vertices.push( point_start );
						pointCloud[lastPos.t][(curLay!=undefined?curLay:(Math.round(lastPos.z*100)))].vertices.push( point_end );
					}
					
				}/* else {
					point_start.x = -lastPos.x;
					point_start.y = lastPos.z; //-y2;
					point_start.z = lastPos.y//lastPos.z;
					
					point_end.x = -x2;
					point_end.y = (args.z?(relative?(lastPos.z + args.z):args.z):lastPos.z); //-y2;
					point_end.z = y2//lastPos.z;
					if (!moves[(curLay!=undefined?curLay:(Math.round(lastPos.z*100)))])
					{
						moves[(curLay!=undefined?curLay:(Math.round(lastPos.z*100)))] = new THREE.Geometry();
						moves[(curLay!=undefined?curLay:(Math.round(lastPos.z*100)))].name = "MOVE_"+(curLay?curLay:(Math.round(lastPos.z*100)));
					}
					moves[(curLay!=undefined?curLay:(Math.round(lastPos.z*100)))].vertices.push( point_start );
					moves[(curLay!=undefined?curLay:(Math.round(lastPos.z*100)))].vertices.push( point_end );
				}*/
			}
			
			if (args.x)
			{
				lastPos.x = (relative?lastPos.x+args.x:args.x);
				if (lastPos.x < boundingBox.min.x)
					boundingBox.min.x = lastPos.x;
				if (lastPos.x > boundingBox.max.x)
					boundingBox.max.x = lastPos.x;
					
			}
			if (args.y)
			{
				lastPos.y = (relative?lastPos.y+args.y:args.y);
				if (lastPos.y < boundingBox.min.y)
					boundingBox.min.y = lastPos.y;
				if (lastPos.y > boundingBox.max.y)
					boundingBox.max.y = lastPos.y;
			}
			if (args.z)
			{
				lastPos.z = (relative?lastPos.z+args.z:args.z);
				if (lastPos.z < boundingBox.min.z)
					boundingBox.min.z = lastPos.z;
				if (lastPos.z > boundingBox.max.z)
					boundingBox.max.z = lastPos.z;
			}
			if (args.e)
			{
				lastPos.e = (relativeExtrude? lastPos.e + args.e : args.e);
			}
			if (args.f)
				lastPos.f = args.f;
			
			if(args.x || args.y)
			{
				var tmpPos ={};
				tmpPos.x = lastPos.x;
				tmpPos.y = lastPos.y;
				tmpPos.z = lastPos.z;
				tmpPos.e = lastPos.e;
				tmpPos.f = lastPos.f;
				tmpPos.w = lastPos.w;
				tmpPos.t = lastPos.t;
				gcodeLayer.points.push(tmpPos);
			}
			break;
		case "G2":
			 console.warn("clockwise rotation not implemented");
			 console.log(args);
			 
			 var rad = Math.sqrt(((args.i-args.x)*(args.i-args.x)) + ((args.y-args.j)*(args.y-args.j)))
			 var acos = Math.acos((lastPos.x-args.i)/rad);
			 var asin = Math.asin((lastPos.y-args.j)/rad);
			 var startA = 0;
			 if (acos == asin)
			 {
				 startA = acos;
			 } else if ((acos- Math.PI) == asin){
				 startA = asin;
			 } else {
				 console.error('Que faire?')
			 }
			 
			 acos = Math.acos(args.x/rad);
			 asin = Math.asin(args.y/rad);
			 var endA = 0;
			 if (acos == asin)
			 {
				 endA = acos;
			 } else {
				 console.error('Que faire?')
			 }
			 var curve = new THREE.EllipseCurve(
						args.i, args.j,   // cX, cY
						rad, rad,         // xRadius, yRadius
						startA, endA,	  // aStartAngle, aEndAngle
						true,             // aClockwise
						0                 // aRotation
					);

			var points = curve.getPoints( 50 );
			var geometry = new THREE.BufferGeometry().setFromPoints( points );

			var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

			// Create the final object to add to the scene
			var ellipse = new THREE.Line( geometry, material );
			ellipse.position.z = lastPos.z;
			liveScene.add(ellipse);
			
			lastPos.x = args.x;
			lastPos.y = args.y;
			break;
		case "G3":
			 console.warn("counterclockwise rotation not implemented");
			 console.log(args)
			 
			 var rad = Math.sqrt(((args.i-args.x)*(args.i-args.x)) + ((args.y-args.j)*(args.y-args.j)))
			 var acos = Math.acos((lastPos.x-args.i)/rad);
			 var asin = Math.asin((lastPos.y-args.j)/rad);
			 var startA = 0;
			 if (acos == asin)
			 {
				 startA = acos;
			 } else {
				 console.error('Que faire?')
			 }
			 
			 acos = Math.acos(args.x/rad);
			 asin = Math.asin(args.y/rad);
			 var endA = 0;
			 if (acos == asin)
			 {
				 endA = acos;
			 } else {
				 console.error('Que faire?')
			 }
			 var curve = new THREE.EllipseCurve(
						args.i, args.j,   // cX, cY
						rad, rad,         // xRadius, yRadius
						startA, endA,	  // aStartAngle, aEndAngle
						false,             // aClockwise
						0                 // aRotation
					);

			var points = curve.getPoints( 50 );
			var geometry = new THREE.BufferGeometry().setFromPoints( points );
				
			var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

			// Create the final object to add to the scene
			var ellipse = new THREE.Line( geometry, material );
			ellipse.position.z = lastPos.z;
			liveScene.add(ellipse);

			lastPos.x = args.x;
			lastPos.y = args.y;
			break;
			
		case "G4":
			if (DEBUG)
				console.log("Wait");
			break;
		
		case "G10":
			if (DEBUG)
				if (args.p && (args.s || args.r))
					console.log("Set tool "+ args.p +" \n\tstanby temp: "+args.r +"\n\tactive temp: " + args.s);
				else if (args.l)
					console.log("Set tool "+ args.p + " offset\n\t X:"+ args.x +"\n\t Y:" + args.y + "\n\t Z:"+args.z);
				else 
					console.log("Retracting filament");
			break;
				
		case "G21":
			if(DEBUG)
				console.log("Units set to mm");
			break;
			
		case "G28":
			if(DEBUG)
				console.log("Homing");
			lastPos.x = 0;
			lastPos.y = 0;
			lastPos.z = 0;
			break;
			
		case "G90":
			if(DEBUG)
				console.log("Absolute positioning");
			relative = false;
			break;
		
		case "G91":
			if(DEBUG)
				console.log("Relative positioning");
			relative = true;
			break;
			
		case "G92":
			if(DEBUG && (args.x || args.y || args.z))
				console.log("position set to" +
				(args.x?" \n\tX: " + args.x:"") +
				(args.y?" \n\tY: " + args.y:"") +
				(args.z?" \n\tZ: " + args.z:""));
			lastPos.x = (args.x?args.x:lastPos.x);
			lastPos.y = (args.y?args.y:lastPos.y);
			lastPos.z = (args.y?args.z:lastPos.z);
			break;
		
		/* ====== M Codes ====== */
		
		case "M42":
			if(DEBUG)
				console.log("new state "+args.s+" for Pin "+args.p);
			break;
		
		case "M82":
			if(DEBUG)
				console.log("Absolute extruder");
			relativeExtrude = false;
			break;
		
		case "M83":
		if(DEBUG)
			console.log("Relative extruder");
			relativeExtrude = true;
			break;
		
		case "M84":
			if(DEBUG)
				console.log("Steppers off");
			break;
		
		case "M104":		
			if(DEBUG)
				console.log("Extruder set to "+args.s+"°C");
			break;
		
		case "M106":
			if(DEBUG && false)
				console.log("Fan " + (args.p?args.p+" ":"")+(args.s?"set to: " +args.s:"On"));
			break;
			
		case "M107":
			if(DEBUG)
				console.log("Fan off");
			break;
			
		case "M109":
			if(DEBUG)
				console.log("wait for Extruder to reach " + args.s+"°C");
			break;
		
		case "M116":
			if(DEBUG)
				if(args.p || args.h || args.c)
					console.log("wait for "+(args.p? "Tool "+args.p+" ":"")+(args.h?"Extruder "+args.h+" ":"")+(args.c?"Chamber "+args.c+" ":"")+"to reach it's target temperature");
				else
					console.log("wait for All to reach their target temperature");
			break;
			
		case "M117":
			break;
		
		case "M140":
			if(DEBUG)
				console.log("Bed set to "+args.s+"°C");
			break;
			
		case "M141":
			if(DEBUG)
				console.log("Chamber set to "+args.s+"°C");
			break;
		
		case "M190":
			if(DEBUG)
				console.log("Wait for bed to reach "+args.s+"°C");
			break;
			
		case "M191":
			if(DEBUG)
				console.log("Wait for chamber to reach "+args.s+"°C");
			break;
			
		/* ====== T Codes ====== */
		case "T0":
			if(DEBUG){
				console.log("Tool 0 selected");
				console.log(extruders[0]);
			}
			//extWidth = extruders[0].width;
			lastPos.t = 0;
			break;
		
		case "T1":
			if(DEBUG){
				console.log("Tool 1 selected");
				console.log(extruders[1]);
			}
			//extWidth = extruders[1].width;
			lastPos.t = 1;	
			break;
			
		case "T2":
			if(DEBUG){
				console.log("Tool 2 selected");
				console.log(extruders[2]);
			}
			//extWidth = extruders[2].width;
			lastPos.t = 2;
			break;
		
		case "T3":
			if(DEBUG){
				console.log("Tool 3 selected");
				console.log(extruders[3]);
			}
			//extWidth = extruders[3].width;
			lastPos.t = 3;
			break;
			
		case "T4":
			if(DEBUG){
				console.log("Tool 4 selected");
				console.log(extruders[4]);
			}
			//extWidth = extruders[4].width;
			lastPos.t = 4;
			break;
		
		case "T5":
			if(DEBUG){
				console.log("Tool 5 selected");
				console.log(extruders[5]);
			}
			//extWidth = extruders[5].width;
			lastPos.t = 5;
			break;
			
		default :
			console.log("unknown command: "+args.cmd);
			console.log(args);
			break;
	}
}

function setPoly(e,t){var a,E=pointCloud[lastPos.t][void 0!=curLay?curLay:Math.round(100*lastPos.z)].vertices,h=pointCloud[lastPos.t][void 0!=curLay?curLay:Math.round(100*lastPos.z)].faces,n=E.length,c=-(t.x-e.x),s=t.z-e.z;0!=c?(a=(t.z-e.z)/(e.x-t.x),e.z,e.x):(a=(e.x-t.x)/(t.z-e.z),e.x,e.z);var H,w,R,T,i=Math.atan(a);0!=c?(H=e.x+extWidth/2*Math.sin(i),w=t.x+extWidth/2*Math.sin(i),R=e.z+extWidth/2*Math.cos(i),T=t.z+extWidth/2*Math.cos(i)):(H=e.x+extWidth/2*Math.cos(i),w=t.x+extWidth/2*Math.cos(i),R=e.z+extWidth/2*Math.sin(i),T=t.z+extWidth/2*Math.sin(i));var o=new THREE.Vector3(H,e.y,R),x=new THREE.Vector3(w,t.y,T),r=new THREE.Vector3(w,t.y-(layHeight||lastPos.z-zPrevLayer),T),F=new THREE.Vector3(H,e.y-(layHeight||lastPos.z-zPrevLayer),R);0!=c?(H=e.x-extWidth/2*Math.sin(i),w=t.x-extWidth/2*Math.sin(i),R=e.z-extWidth/2*Math.cos(i),T=t.z-extWidth/2*Math.cos(i)):(H=e.x-extWidth/2*Math.cos(i),w=t.x-extWidth/2*Math.cos(i),R=e.z-extWidth/2*Math.sin(i),T=t.z-extWidth/2*Math.sin(i));var z,u,d,y,M,p,l,W,P=new THREE.Vector3(H,e.y,R),v=new THREE.Vector3(w,t.y,T),L=new THREE.Vector3(w,t.y-(layHeight||lastPos.z-zPrevLayer),T),V=new THREE.Vector3(H,e.y-(layHeight||lastPos.z-zPrevLayer),R),g=1/0;if(n>4){var f=o.x-E[n-4].x,C=o.z-E[n-4].z;g=Math.sqrt(f*f+C*C)}(n<4||g>extWidth/2)&&(E.push(o),E.push(F),E.push(P),E.push(V)),E.push(x),E.push(r),E.push(v),E.push(L),n>=4&&g<extWidth/2&&(n-=4),c<0?(z=new THREE.Face3(n,n+5,n+4),u=new THREE.Face3(n,n+1,n+5),d=new THREE.Face3(n+2,n+6,n+7),y=new THREE.Face3(n+2,n+7,n+3),M=new THREE.Face3(n,n+4,n+6),p=new THREE.Face3(n,n+6,n+2),l=new THREE.Face3(n+5,n+1,n+3),W=new THREE.Face3(n+5,n+3,n+7)):c>0?(z=new THREE.Face3(n,n+4,n+5),u=new THREE.Face3(n,n+5,n+1),d=new THREE.Face3(n+2,n+7,n+6),y=new THREE.Face3(n+2,n+3,n+7),M=new THREE.Face3(n,n+6,n+4),p=new THREE.Face3(n,n+2,n+6),l=new THREE.Face3(n+5,n+3,n+1),W=new THREE.Face3(n+5,n+7,n+3)):0==c&&(s<0?(z=new THREE.Face3(n,n+5,n+4),u=new THREE.Face3(n,n+1,n+5),d=new THREE.Face3(n+2,n+6,n+7),y=new THREE.Face3(n+2,n+7,n+3),M=new THREE.Face3(n,n+4,n+6),p=new THREE.Face3(n,n+6,n+2),l=new THREE.Face3(n+5,n+1,n+3),W=new THREE.Face3(n+5,n+3,n+7)):s>0&&(z=new THREE.Face3(n,n+4,n+5),u=new THREE.Face3(n,n+5,n+1),d=new THREE.Face3(n+2,n+7,n+6),y=new THREE.Face3(n+2,n+3,n+7),M=new THREE.Face3(n,n+6,n+4),p=new THREE.Face3(n,n+2,n+6),l=new THREE.Face3(n+5,n+3,n+1),W=new THREE.Face3(n+5,n+7,n+3))),z&&u&&(h.push(z),h.push(u)),d&&y&&(h.push(d),h.push(y)),M&&p&&(h.push(M),h.push(p)),l&&W&&(h.push(l),h.push(W)),z&&u&&d&&y&&M&&p&&l&&W||console.error("C'est possible!")}