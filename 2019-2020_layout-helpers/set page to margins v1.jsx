app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
var myDocument = app.activeDocument;
var myPage = myDocument.pages[0];
//var guides = myDocument.guides;
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;  
app.documents[0].zeroPoint = [0,0];  
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR; 
app.activeDocument.viewPreferences.horizontalMeasurementUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters; 
//app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;

// myObjectt = app.selection[0];
// myBleeed = myDocument.Preference.documentBleedTopOffset;
// myDocument.documentPreferences.properties.documentBleedUniformSize(true)
var myBleeed = myDocument.documentPreferences.properties.documentBleedTopOffset;



var main = function() {








	b_pgebounds = myPage.bounds;
	// W_p = Math.round(((Math.abs(b_pgebounds[3]-b_pgebounds[1]))/2.83464567)); // mm  *100)/100
	// H_p = Math.round(((Math.abs(b_pgebounds[2]-b_pgebounds[0]))/2.83464567)); // mm
	// var mypagY1 = b_pgebounds[0];
	// var mypagX1 = b_pgebounds[1];
	// var mypagY2 = b_pgebounds[2];
	// var mypagX2 = b_pgebounds[3];

b = myPage.bounds;
W_p_abs = Math.abs(b[3]-b[1]); // 
H_p_abs = Math.abs(b[2]-b[0]); //   
W_p = Number(Math.round(W_p_abs+'e2')+'e-2') ///#
H_p = Number(Math.round(H_p_abs+'e2')+'e-2') ///###

	var	top_margine = myPage.marginPreferences.top;
	var	left_margine = myPage.marginPreferences.left;
	var	right_margine = myPage.marginPreferences.right;
	var	bottom_margine = myPage.marginPreferences.bottom;

	
	var W_viz = Number(Math.round((W_p-(left_margine*2))+'e2')+'e-2') ///#
	var H_viz = Number(Math.round((H_p-(top_margine*2))+'e2')+'e-2') ///#
	// alert("W_viz "+(W_viz)+" H_viz "+H_viz)
	var mypagY1 = top_margine
	var mypagX1 = left_margine
	var mypagY2 = H_p-(bottom_margine)
	var mypagX2 = W_p-(right_margine)


	// alert("mypagY1 "+(mypagY1_mm)+" mypagX1 "+mypagX1_mm+" mypagY2 "+mypagY2_mm+" mypagX2 "+mypagX2_mm)

	// alert("H_p "+(H_p)+" W_p "+W_p)

	// var myBounds1 = obj.geometricBounds; 
	
	myBleeed_ = Math.round(((Math.abs(myBleeed))/2.83464567)); // mm

	resizeDocument(W_viz, H_viz);


	function resizeDocument(W_viz, H_viz) {
		myPage = app.documents.item(0).pages.item(0);
		app.documents.item(0).viewPreferences.rulerOrigin = RulerOrigin.SPINE_ORIGIN;
		app.documents.item(0).zeroPoint = [0, 0];
		myPage.layoutRule = LayoutRuleOptions.OFF;
		// alert("W_viz "+(W_viz / 0.3528)+" H_viz "+(H_viz/ 0.3528))
	
		myPage.resize(
				CoordinateSpaces.INNER_COORDINATES,
				AnchorPoint.CENTER_ANCHOR,
				ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
				[Number(W_viz), Number(H_viz)]
				);
	}








	var doc = app.properties.activeDocument, pgs, pg, b, w, h, m;
	if ( !doc ) return;
	pgs = doc.pages.everyItem().getElements();
	
	while ( pg = pgs.pop() ) {
		
		b = pg.bounds;
		w = Math.abs( b[3]-b[1]);
		h = Math.abs( b[2]-b[0]);
        // m = Math.abs(w-h)/12;
        m=0
		
		pg.marginPreferences.properties = {
			top : m,
			left: m,
			right: m,
			bottom: m
		};
	}
}

var u;

app.doScript ( "main()",u,u,UndoModes.ENTIRE_SCRIPT, "The Script" );







