/* ======== GCODE_READER ======== */

var instructionPos = 0;
var slicer = undefined;
var Slicer = { CURA: 0, SIMP: 1, SLIC: 2,};

var moves = [];
var preview;
var fileSize;
var meshMaterial;
var fileInput;
var lineReader;

var gcodeLayers = [];
var gcodeLayer = {lBBox : {min:{x:10000,y:10000,z:10000}, max:{x:-10000,y:-10000,z:-10000}},points: []};
var zLayer = 0;
var zPrevLayer = 0;
var lastPos = {x: undefined, y: undefined, z: undefined, e: undefined, f: undefined, w: "Unknown", t: 0};
var relative = false;
var startLayer = 0;
var relativeExtrude = false;
var extruding = false;
var boundingBox = {min:{x:10000,y:10000,z:10000}, max:{x:-10000,y:-10000,z:-10000}}

window.onload = function() {
	lineReader = new LineReader({chunkSize: 512	});
	$("#read").click(function(){lectDonnees (document.getElementById('fileInput').files[0])});
};

function lectDonnees() {
	if (!parseFiles || parseFiles.length == 0)
		return;
	var start = new Date();
	slicer = undefined;
	for(var key in pointCloud)
	{
		if(slicer==undefined || key == "Unknown" || key != "length" )
		{
			for(var gcodeLayer in pointCloud[key])
			{
				previewScene.remove(previewScene.getObjectByName(key+"_"+gcodeLayer));
			}
		}
	}
	pointCloud = {length: 1};
	moves = [];
	zLayer = 0;
	zPrevLayer = 0;
	parseRows[parsedFileCount].find(".glyphicon").removeClass("glyphicon-asterisk").addClass("glyphicon-cloud-upload");
	
	pointMaterial = new THREE.LineBasicMaterial({color : 0xff0000});
	var moveMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
	fileInput = parseFiles[parsedFileCount];
	fileSize = fileInput.size;
	//jQuery.get(ajaxPrefix + "rr_mkdir?dir=0:/www/img/GCodePreview");
	var name = fileInput.name.substring(0,fileInput.name.lastIndexOf("."));
	while (name.includes(" "))
		name = name.replace(" ", "_");
	jQuery.get(ajaxPrefix + "rr_mkdir?dir=0:/www/img/GCodePreview/"+ name);
	parseRows[parsedFileCount].find("#status")[0].innerHTML = "Parsing";
	var lastPrct = -1;
	var totalCount = 1;
	var output = $('#fileDisplayArea');
	boundingBox = {min:{x:1000,y:1000,z:1000}, max:{x:-1000,y:-1000,z:-1000}};
	gcodeLayers = [];
	gcodeLayer = {lBBox : {min:{x:1000,y:1000,z:1000}, max:{x:-1000,y:-1000,z:-1000}},points: []};
	lastPos = {x: undefined, y: undefined, z: undefined, e: undefined, f: undefined, w:"Unknown", t: 0};
	relativeExtrude = false;
	extruding = false;
	lineReader.on('line', function(line, next) {
		line = parseGCode(line, lineReader.offset);
		var output = $('#fileDisplayArea');
		if (line)
		{
			totalCount++;
		}
		instructionPos = lineReader.GetReadPos();
		if (Math.ceil((instructionPos/fileSize)*100) > lastPrct)
		{
			var progress = Math.ceil((instructionPos/fileSize)*100);
			parseRows[parsedFileCount].find(".progress-bar").css("width", progress + "%");
			parseRows[parsedFileCount].find(".progress-bar > span").text(progress + " %");
			
			lastPrct = Math.ceil((instructionPos/fileSize)*100);
			var ELT = ((new Date() - start)/(instructionPos/fileSize));
			var ERT = ELT * (1-(instructionPos/fileSize))
			parseRows[parsedFileCount].find("#eta")[0].innerHTML = "eta: " + toHMS(Math.round(ERT/1000), true);
		}
		//if (totalCount < 100)
			next();
	});		
	
	lineReader.on('abort', function(abo){
		console.warn("read aborted");
		console.warn(abo);
		lineReader = new LineReader({chunkSize: 512	});
	})
	
	lineReader.on('error', function(err) {
		console.log(err);
	});
	
	lineReader.on('end', function() {
		console.log("Read complete!\n"+totalCount+" lines parsed\n took " +  toHMS(Math.round((new Date() - start)/1000), true));
		parseRows[parsedFileCount].find("#eta")[0].innerHTML = "Done took: " + toHMS(Math.round((new Date() - start)/1000), true)
		var threeDee;
		hasGeoToRender = true;
		pointCloud["MOVE"] = moves;
		pointCloud.length ++;
		/*$("#firstLayer")[0].value = 0;
		$("#lastLayer")[0].value = nbLayers;
		$("#firstLayer")[0].max = nbLayers;
		$("#lastLayer")[0].max = nbLayers;*/
		initRender();		
		// Update glyphicon and progress bar
		parseRows[parsedFileCount].find(".glyphicon").removeClass("glyphicon-cloud-upload").addClass( "glyphicon-ok" );
		parseRows[parsedFileCount].find(".progress-bar").removeClass("progress-bar-info progress-bar-warning").addClass( "progress-bar-success").css("width", "100%");
		parseRows[parsedFileCount].find(".progress-bar > span").text( "100 %");

		// Go on with parse logic if we're still busy
		parsedFileCount++;
		if (parseFiles.length > parsedFileCount) {
			// Parse the next file
			lectDonnees();
		} 
	});
	
	lineReader.read(fileInput);
}


function parseGCode(line)
{
	var cmdLine = line.replace(/;.*$/, '').trim(); // Remove comments
	var comLine = "";
	if (line.indexOf(";") > -1)
		comLine = line.replace(/[a-zA-Z0-9| |.|-]*[;]/, '').trim();
	if (cmdLine)
	{
		var tokens = cmdLine.split(' ');
		if (tokens) {
		  var cmd = tokens[0];
		  var args = {
			'cmd': cmd
		  };
		  tokens.splice(1).forEach(function(token) {
			if (token)
			{
				var key = token[0].toLowerCase();
				var value = parseFloat(token.substring(1));
				args[key] = value;
			}
		  });
		  extractGCode(args);	  
		}
	}
	if (comLine)
	{
		if (slicer === undefined)
		{
			if (comLine.toUpperCase().includes("CURA"))
			{
				console.log("Cura detected");
				//$("#form_cura")[0].style.display = "block"
				slicer = Slicer.CURA;
			} else if (comLine.toUpperCase().includes("SIMPLIFY3D"))
			{
				console.log("Simplify 3D detected");
				//$("#form_simp")[0].style.display = "block"
				slicer = Slicer.SIMP;
			} else if (comLine.toUpperCase().includes("SLIC3R"))
			{
				console.log("Slic3r detected");
				//$("#form_slic")[0].style.display = "block"
				slicer = Slicer.SLIC;
			}else {
				// try Cura as the slicer name is at line 5
				var tokens = comLine.split(':');
					if (tokens) {
						var cmd = tokens[0].toUpperCase();
						var args = {
						'cmd': cmd
						};
						var key = 0;
						tokens.splice(1).forEach(function(token) {
						if (token)
						{
							key++;
							var value = token;
							args[key] = value;
						}
					});
					decodeCuraCom(args);
					}
				//console.log(comLine);
			}
		} else {
			switch (slicer)
			{
				case Slicer.CURA:
					var tokens = comLine.split(':');
					if (tokens) {
						var cmd = tokens[0];
						var args = {
						'cmd': cmd
						};
						var key = 0;
						tokens.splice(1).forEach(function(token) {
						if (token)
						{
							key++;
							var value = token;
							args[key] = value;
						}
					});
					decodeCuraCom(args);
					}
					break;
				case Slicer.SIMP:
					decodeSimpCom(comLine);
					break;
				case Slicer.SLIC:
					decodeSlicCom(comLine);
					break;
				default:
					console.log(comLine);
					break;
			}
		}
	}
	return cmdLine;
}