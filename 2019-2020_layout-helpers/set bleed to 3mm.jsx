var myDocument = app.activeDocument;
var myPage = myDocument.pages[0];
var guides = myDocument.guides;
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;  
app.documents[0].zeroPoint = [0,0];  
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR; 
app.activeDocument.viewPreferences.horizontalMeasurementUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters; 


//We could un-check the option "Ungroup Remembers Layers"
//Detect the version before running a script on groups:

//if(app.version === "10.2.0.69"){uncheckUngroupRemembersLayers()};
// uncheckUngroupRemembersLayers();
// function uncheckUngroupRemembersLayers(){
//     var myMenuAction = app.menuActions.itemByName("$ID/Ungroup Remembers Layers");    if(myMenuAction.checked === false){        app.panels.itemByName("$ID/#ImageLayersPanel").visible = true;        myMenuAction.invoke();        };    };

//Then procede with working on groups:



var main = function() {


	var doc = app.documents[0];

	// Change uniform bleed size:
	
	doc.documentPreferences.properties =
	
	{
	
		documentBleedUniformSize : true ,
	
		documentBleedTopOffset : "3 mm"
	
	};

}

var u;

app.doScript ( "main()",u,u,UndoModes.ENTIRE_SCRIPT, "The Script" );