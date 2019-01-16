/* ======== GCOM_PARSER ======== */

var nbLayers = 0;
var layHeight = 0;
var curLay;
var extruders = [];
var extruder = {name: "", number: undefined, diameter: undefined, width: undefined, primary: false};
var extWidth = 0.4;

function decodeCuraCom(args)
{
	if(args.cmd.includes("SETTING_3"))
	{
		var cmd = args.cmd;
		args.cmd = cmd.substring(0, cmd.indexOf(' '));
		args.setting = cmd.substring(cmd.indexOf(' ')+1);
	}
	
	switch (args.cmd)
	{
		case "LAYER":
			if(DEBUG)
				console.log("Layer " + parseInt(args[1]) + "/" + nbLayers+"( "+ Math.round(parseInt(args[1])*layHeight*100)/100 + "/" + Math.round(nbLayers*layHeight*100)/100+"mm )");
			var layNum = parseInt(args[1]);
			if (layNum != 0)
				gcodeLayers[layNum] = {gcodeLayerStart: startLayer, gcodeLayer: gcodeLayer};
			curLay = layNum;
			break;
		case "LAYER_COUNT" :
			nbLayers = parseInt(args[1]);
			if(DEBUG)
				console.log("model height: " + Math.round((layHeight*nbLayers)*100)/100 + "mm");
			break;
		case "TYPE":
			if(DEBUG)
				console.log("wall type: " + args[1]);
			lastPos.w = args[1];
			break;
		case "TIME_ELAPSED":
			if(DEBUG)
				console.log("T+ " + toHMS(parseInt(args[1]), true));
			break;
		case "SETTING_3":
			break;
		case "TIME":
			console.log("Estimated print time: "+toHMS(parseInt(args[1]), true));
			break;
		case "LAYER HEIGHT":
			if(DEBUG)
				console.log("Layer height: "+args[1] +"mm");
			layHeight = parseFloat(args[1]);
			break;
		default:
			console.log(args);
	}
}

function decodeSimpCom(comLine)
{
	var cmd = comLine;
	if (comLine.includes(','))
	{
		cmd = comLine.substring(0,comLine.indexOf(','));
		while(cmd.indexOf(' ') == 0)
			cmd = cmd.substring(cmd.indexOf(' ')+1);
	}
	var args = {
	'cmd': cmd
	};
	var tokens = comLine.substring(cmd.length);
	tokens = tokens.substring(tokens.indexOf(',')+1);
	tokens = tokens.split(',');
	for(var token in tokens) 
	{
		if (tokens[token])
		{
			var value = tokens[token];
			while(value.indexOf(' ') == 0)
				value = value.substring(value.indexOf(' ')+1);
			args[token] = value;
		}
	}
	parseSimpCom(args);
	//console.log(args);
}

function parseSimpCom(args)
{
	if (args.cmd.includes("layer "))
	{
		var cmd = args.cmd;
		args.cmd = cmd.substring(0, cmd.indexOf(' '));
		args.layNum = cmd.substring(cmd.indexOf(' ')+1);
		if (args[0] && args[0].includes('Z = '))
		{
			var z = args[0];
			args[0] = "Z";
			args.zHeight = z.substring(z.lastIndexOf(' ')+1);
			//console.log(args);
		}
	}
	
	if(args.cmd.includes("tool"))
	{
		var cmd = args.cmd;
		args.cmd = cmd.substring(0, cmd.indexOf(' '));
		cmd = cmd.substring(cmd.indexOf(' ')+1);
		var tokens = cmd.split(' ')
		for(var token in tokens)
		{
			var key = tokens[token][0];
			var value = parseFloat(tokens[token].substring(1));
			args[key] = value;
		}
		//console.log(args);
	}
	
	switch (args.cmd)
	{
		case "printMaterial":
		case "printQuality":
			break;
		/* ====== WALL TYPES ======*/
		case "bridge":
			if(DEBUG)
				console.log("wall type: " + "BRIDGE");
			lastPos.w = "BRIDGE";
			break;
		case "gap fill":
			if(DEBUG)
				console.log("wall type: " + "GAP_FILL");
			lastPos.w = "GAP_FILL";
			break;
		case "skirt":
			if(DEBUG)
				console.log("wall type: " + "SKIRT");
			lastPos.w = "SKIRT";
			break;
		case "infill":
			if(DEBUG)
				console.log("wall type: " + "INFILL");
			lastPos.w = "INFILL";
			break;
		case "inner perimeter":
			if(DEBUG)
				console.log("wall type: " + "INNER_PERIMETER");
			lastPos.w = "INNER_PERIMETER";
			break;
		case "outer perimeter":
			if(DEBUG)
				console.log("wall type: " + "OUTER_PERIMETER" );
			lastPos.w = "OUTER_PERIMETER";
			break;
		case "solid layer":
			if(DEBUG)
				console.log("wall type: " + "SOLID_LAYER");
			lastPos.w = "SOLID_LAYER";
			break;
		case "support":
			if(DEBUG)
				console.log("wall type: " + "SUPPORT");
			lastPos.w = "SUPPORT";
			break;
		case "dense support":
			if(DEBUG)
				console.log("wall type: " + "DENSE_SUPPORT");
			lastPos.w = "DENSE_SUPPORT";
			break;
			
		/* ====== LAYERS ====== */
		case "layer":
			if(DEBUG)
				console.log("Layer " + args.layNum +(nbLayers?"/"+nbLayers:""));
			var layNum = parseInt(args.layNum);
			if (layNum != 0)
				gcodeLayers[layNum] = {gcodeLayerStart: startLayer, gcodeLayer: gcodeLayer};
			nbLayers++;
			curLay = layNum;
			break;
		case "layerHeight":
			if(DEBUG)
				console.log("Layer height: "+args[0] +"mm");
			layHeight = parseFloat(args[0]);
			break;
			
		/* ====== TOOLS PARAMETERS ====== */
		case "tool":
			if (layHeight === undefined)
				layHeight = args.H;
			if (extWidth === undefined)
				extWidth = args.W;
			break;
		case "extruderName":
			var i = 0;
			while (args[i] !== undefined)
			{
				if(extruders[i] === undefined)
				{
					extruders[i] = {};
				}
				extruders[i].name = args[i];
				i++;
			}
			break;
		case "extruderToolheadNumber":
			var i = 0;
			while (args[i] !== undefined)
			{
				if(extruders[i] === undefined)
				{
					extruders[i] = {};
				}
				extruders[i].number = parseInt(args[i]);
				i++;
			}
			break;
		case "extruderWidth":
			var i = 0;
			while (args[i] !== undefined)
			{
				if(extruders[i] === undefined)
				{
					extruders[i] = {};
				}
				extruders[i].width = parseFloat(args[i]);
				i++;
			}
			break;
		case "extruderDiameter":
			var i = 0;
			while (args[i] !== undefined)
			{
				if(extruders[i] === undefined)
				{
					extruders[i] = {};
				}
				extruders[i].diameter = parseFloat(args[i]);
				i++;
			}
			break;
		case "primaryExtruder":
			for(var i = 0; i < extruders.length; i++)
			{
				if(extruders[i].number == parseInt(args[0]))
				{
					extruders[i].primary = true;
				} else {
					extruders[i].primary = false;
				}
					
			}
			break;
		default:
			console.log(args)
	}
}

function decodeSlicCom(comLine)
{
	if(DEBUG)
		console.log(comLine);
}