var myDocument = app.activeDocument;
var myPage = myDocument.pages[0];
var guides = myDocument.guides;
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;  
app.documents[0].zeroPoint = [0,0];  
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR; 
app.activeDocument.viewPreferences.horizontalMeasurementUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters; 



var myBleeed_ = myDocument.documentPreferences.properties.documentBleedTopOffset;
var bleedPagina = myBleeed_

b_pgebounds = myPage.bounds;

	Wp = b_pgebounds[3]-b_pgebounds[1];
	Hp = b_pgebounds[2]-b_pgebounds[0]; 

	var main = function() {

		for(i=0; i<app.selection.length; i++){
			var myObject = app.selection[i];

// myObject = app.selection[0];

	var fitobiect1 = [-bleedPagina, -bleedPagina, Hp+bleedPagina, Wp+bleedPagina];
	myObject.geometricBounds = fitobiect1;
	app.activeDocument.viewPreferences.horizontalMeasurementUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters; 
		


}

}
var u;

app.doScript ( "main()",u,u,UndoModes.ENTIRE_SCRIPT, "The Script" );