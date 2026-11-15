var myDocument = app.activeDocument;
var myPage = myDocument.pages[0];
var guides = myDocument.guides;
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
app.documents[0].zeroPoint = [0, 0];
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
app.activeDocument.viewPreferences.horizontalMeasurementUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;
b = myPage.bounds;
var W_p = (b[3] - b[1])
var H_p = (b[2] - b[0])
myColorAdd(app.activeDocument, "CMYK=100", ColorModel.PROCESS, [0, 0, 0, 100]);
function myColorAdd(myDocument, myColorName, myColorModel, myColorValue) {
	if (myColorValue instanceof Array == false) {
		myColorValue = [(parseInt(myColorValue, 16) >> 16) & 0xff, (parseInt(myColorValue, 16) >> 8) & 0xff, parseInt(myColorValue, 16) & 0xff];
		myColorSpace = ColorSpace.RGB;
	} else {
		if (myColorValue.length == 3)
			myColorSpace = ColorSpace.RGB;
		else
			myColorSpace = ColorSpace.CMYK;
	}
	try {
		myColor = myDocument.colors.item(myColorName);
		myName = myColor.name;
	}
	catch (myError) {
		myColor = myDocument.colors.add();
		myColor.properties = { name: myColorName, model: myColorModel, space: myColorSpace, colorValue: myColorValue };
	}
	return myColor;
}
app.activeDocument.viewPreferences.horizontalMeasurementUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;
var top_margine = myPage.marginPreferences.top;
var left_margine = myPage.marginPreferences.left;
var right_margine = myPage.marginPreferences.right;
var bottom_margine = myPage.marginPreferences.bottom;
var top_margine_mm_ = Number(Math.round((top_margine / 2.83464567) + 'e2') + 'e-2') ///#
var left_margine_mm_ = Number(Math.round((left_margine / 2.83464567) + 'e2') + 'e-2') ///#
var right_margine_mm_ = Number(Math.round((right_margine / 2.83464567) + 'e2') + 'e-2') ///#
var bottom_margine_mm_ = Number(Math.round((bottom_margine / 2.83464567) + 'e2') + 'e-2') ///#
var W_vizibil = right_margine - left_margine
var H_vizibil = bottom_margine - top_margine
var w_viz_doc = Number(Math.round((W_p - (left_margine * 2)) + 'e2') + 'e-2') ///#
var h_viz_doc = Number(Math.round((H_p - (top_margine * 2)) + 'e2') + 'e-2') ///#
var myObject = myPage.rectangles.add({ geometricBounds: [20, 20, 70, 70] });
resizeItems();
function resizeItems() {
	{
		var obj = myObject;
		var anchor = app.activeWindow.transformReferencePoint;
		var ow = obj.geometricBounds[3] - obj.geometricBounds[1]
		var oh = obj.geometricBounds[2] - obj.geometricBounds[0];
		var ph = (h_viz_doc * 0.10) / oh;  //(H_p*0.10)/oh;
		var pw = w_viz_doc / ow;  //W_p/ow;
		var matrix = app.transformationMatrices.add({ horizontalScaleFactor: pw, verticalScaleFactor: ph });
		obj.transform(CoordinateSpaces.pasteboardCoordinates, anchor, matrix);
	}
}
myObject.fillColor = "Paper";
myObject.strokeColor = "CMYK=100";
myObject.strokeWeight = (H_p * 0.1) * 0.072;
myObject.strokeAlignment = StrokeAlignment.INSIDE_ALIGNMENT;
myDocument.align(myObject, AlignOptions.RIGHT_EDGES, AlignDistributeBounds.MARGIN_BOUNDS);
myDocument.align(myObject, AlignOptions.BOTTOM_EDGES, AlignDistributeBounds.MARGIN_BOUNDS);
var myObjectblack = myPage.rectangles.add({ geometricBounds: [h_viz_doc - (h_viz_doc * 0.10) + top_margine, -14.173, H_p + 14.173, W_p + 14.173] });
myObjectblack.fillColor = "CMYK=100";
myObjectblack.strokeColor = "None";
//ReferenceError: Object is invalid
////
var myLayerlucru = app.activeDocument.layers.itemByName("lucru");
var myLayerHW = app.activeDocument.layers.itemByName("HW");
var myLayerlucru_state = myLayerlucru.isValid
var myLayerHW_state = myLayerHW.isValid
if (myLayerlucru_state == true) {
}
else {
	var myLayerlucru = myDocument.layers.add({ name: "lucru" });
}
if (myLayerHW_state == true) {
	var myLayerObj = new Array;
	var myObj = new Array;
	myLayerObj = app.activeDocument.layers.itemByName("HW").allPageItems;
	for (var i = myLayerObj.length - 1; i >= 2; i--) {
		myLayerObj[i].remove();
	}
}
else {
	var myLayerHW = myDocument.layers.add({ name: "HW" });
}
////
myObject.move(myLayerHW)
myObjectblack.move(myLayerHW) ////itemLayer
myObjectblack.sendToBack();
app.activeDocument.activeLayer = app.activeDocument.layers.itemByName("lucru");