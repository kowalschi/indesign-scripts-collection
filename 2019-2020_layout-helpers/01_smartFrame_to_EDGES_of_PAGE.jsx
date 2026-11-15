app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
var myDocument = app.activeDocument;
// var myPage = myDocument.pages[0];
var myPage = app.activeWindow.activePage;
var myPage_n = app.activeWindow.activePage.name;
// alert(myPage_n)
//var guides = myDocument.guides;
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
app.documents[0].zeroPoint = [0, 0];
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;

//app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;



var main = function () {


	var anchor = app.activeWindow.transformReferencePoint;
	var myBleeed_ = myDocument.documentPreferences.properties.documentBleedTopOffset;
	// var bleedPagina = myBleeed_
	var bleedPagina = 0
	b_pgebounds = myPage.bounds;

	// Wp = b_pgebounds[3] - b_pgebounds[1];
	// Hp = b_pgebounds[2] - b_pgebounds[0];
	Wp_mm = (b_pgebounds[3] - b_pgebounds[1]) / 2.8346438836889;
	Hp_mm = (b_pgebounds[2] - b_pgebounds[0]) / 2.8346438836889;
	// alert(Wp_mm+" "+Hp_mm)


	var m_left = myPage.marginPreferences.left; //mmyX2
	var m_right = myPage.marginPreferences.right; //mmyX1
	var m_top = myPage.marginPreferences.top; //mmyy2
	var m_bottom = myPage.marginPreferences.bottom; //mmyy1

	// Wp = b_pgebounds[3] - b_pgebounds[1];
	// Hp = b_pgebounds[2] - b_pgebounds[0];
	w_t = b_pgebounds[3] - b_pgebounds[1];
	h_t = b_pgebounds[2] - b_pgebounds[0];
	Wp = w_t - (2 * m_left)
	Hp = h_t - (2 * m_top)

	w_t_mm = w_t / 2.83464567
	h_t_mm = h_t / 2.83464567
	m_left_mm = m_left / 2.83464567
	m_top_mm = m_top / 2.83464567
	// alert(" w "+w_t_mm+"\n"+" h "+h_t_mm+"\n"+"m_left "+m_left_mm+"\n"+"m_top "+m_top_mm)
	// w = w_t - (2 * m_left)
	// h = h_t - (2 * m_top)

	// var mypagY1 = b_pgebounds[0];
	// var mypagX1 = b_pgebounds[1];
	// var mypagY2 = b_pgebounds[2];
	// var mypagX2 = b_pgebounds[3];

	// var jumatepaginaW = (Wp / 2) - (Wp * 0.05)
	// var jumatepaginaH = (Hp / 2) - (Hp * 0.05)
	// var zonademijlocpaginaW = (Wp * 0.33)
	// var zonademijlocpaginaH = (Hp * 0.33)

	// var Y1H = (Hp - (Hp * 0.33)) / 2
	// var X1H = 0
	// var Y2H = (Hp * 0.33) + Y1H
	// var X2H = Wp

	// var Y1V = 0
	// var X1V = (Wp - (Wp * 0.33)) / 2
	// var Y2V = Hp
	// var X2V = (Wp * 0.33) + X1V


	var obj_select = app.selection;



	for (i = 0; i < app.selection.length; i++) {
		var obj = app.selection[i];



		// if(app.selection[i].constructor.name == "groups"){ //rectangles //rectangles //TextFrame //thing instanceof Rectangle
		if (obj instanceof Rectangle) {
			// alert("obj")



			// var ow = obj.geometricBounds[3] - obj.geometricBounds[1]
			// var oh = obj.geometricBounds[2] - obj.geometricBounds[0];

			var myBounds1 = obj.geometricBounds;
			var Y1 = myBounds1[0];
			var X1 = myBounds1[1];
			var Y2 = myBounds1[2];
			var X2 = myBounds1[3];
			// obj.fit(FitOptions.frameToContent);

			var myBounds_fit = obj.geometricBounds;
			var Y1f = myBounds_fit[0];
			var X1f = myBounds_fit[1];
			var Y2f = myBounds_fit[2];
			var X2f = myBounds_fit[3];
			var ow_fit = obj.geometricBounds[3] - obj.geometricBounds[1]
			var oh_fit = obj.geometricBounds[2] - obj.geometricBounds[0];

			// bleedPagina

			if (Y1f < m_top) { // obiect in stanga si sus
				var caseY1 = m_top;
				// alert("st sus")	


			}
			// 		else {

			// 			// var caseY1 = Y1;
			// 			if (Y1f > -bleedPagina && Y1f < (Hp * 0.05)) {
			// 				alert("ALERT! - INALTIMEA NU ARE BLEED \rsau e in 5% de margine")


			// 				///*** */
			// 				// var dif = Math.abs(Y1f);
			// 				// // var H_final = oh_fit+ dif+ bleedPagina
			// 				// var H_final = (Y2f + bleedPagina)
			// 				// var ph = H_final/oh_fit

			// 				// // var ph = (Y2f + bleedPagina)/oh_fit
			// 				// // var ph = 0.30
			// 				// var pw =ph
			// 				// app.layoutWindows[0].transformReferencePoint = AnchorPoint.BOTTOM_CENTER_ANCHOR;
			// 				// resizeObiect(pw, ph);
			// 				///*** */


			// 				// var caseY1 = Y1f;
			// 				var caseY1 = -bleedPagina;
			// 			} 
			else {
				var caseY1 = Y1;
			}
			// }

			if (X1f < m_left) { // obiect in stanga si sus
				var caseX1 = m_left;
				// alert("st sus")	
			}
			// else {
			// 	if (X1f > -bleedPagina && X1f < (Wp * 0.05)) {
			// 		alert("ALERT! - LUNGIMEA - W, NU ARE BLEED \rsau e in 5% de margine")


			// 		// ///*** */
			// 		// var dif = Math.abs(X1f);
			// 		// // var W_final = oh_fit+ dif
			// 		// var W_final = (X2f + bleedPagina)
			// 		// var ph = W_final/ow_fit

			// 		// var pw = ph
			// 		// app.layoutWindows[0].transformReferencePoint = AnchorPoint.RIGHT_CENTER_ANCHOR;
			// 		// resizeObiect(pw, ph);
			// 		// ///*** */



			// 		var caseX1 = -bleedPagina; // X1f;
			// 	} 
			else {
				var caseX1 = X1;
			}
			// }

			if (Y2f > h_t - m_top) { // obiect in stanga si sus
				var caseY2 = h_t - m_top;
				// alert("st sus")	
			}
			// else {

			// 	if (Y2f < Hp + bleedPagina && Y2f > Hp - (Hp * 0.05)) {
			// 		alert("ALERT! - INALTIMEA NU ARE BLEED \rsau e in 5% de margine")

			// 		// 		///*** */
			// 		// // var h_final = Y2f + (bleedPagina+oh_fit)
			// 		// // var ph = h_final / oh_fit
			// 		// // var ph = (Y2f + bleedPagina+(Hp-Y2f))/Y2f
			// 		// var dif = Hp+bleedPagina - Y2f
			// 		// var H_final = oh_fit+ dif
			// 		// var ph = H_final/oh_fit
			// 		// // var ph = 0.30
			// 		// var pw =ph
			// 		// app.layoutWindows[0].transformReferencePoint = AnchorPoint.TOP_CENTER_ANCHOR;
			// 		// resizeObiect(pw, ph);
			// 		// ///*** */	






			// 		// var caseY2 = Y2f;
			// 		var caseY2 = Hp + bleedPagina;
			// 	} 
			else {
				var caseY2 = Y2;
			}
			// }

			if (X2f > w_t - m_right) { // obiect in stanga si sus
				var caseX2 = w_t - m_right;
				// alert("st sus")	
			}
			// else {
			// 	if (X2f < Wp + bleedPagina && X2f > Wp - (Wp * 0.05)) {
			// 		alert("ALERT! - LUNGIMEA - W, NU ARE BLEED \rsau e in 5% de margine")

			// 		// ///*** */
			// 		// // var dif = Math.abs(X1f);
			// 		// // var W_final = oh_fit+ dif
			// 		// var dif = Wp+bleedPagina - X2f
			// 		// var W_final = ow_fit+ dif
			// 		// // var W_final = (X2f + bleedPagina)
			// 		// var ph = W_final/ow_fit

			// 		// var pw = ph
			// 		// app.layoutWindows[0].transformReferencePoint = AnchorPoint.LEFT_CENTER_ANCHOR;
			// 		// resizeObiect(pw, ph);
			// 		// ///*** */






			// 		var caseX2 = Wp + bleedPagina // X2f;
			// 	} 
			else {
				var caseX2 = X2;
			}
			// }
			// alert("caseY1 "+caseY1+ "caseX1 "+caseX1+ "caseY2 "+caseY2+ "caseX2 "+caseX2)
			obj.geometricBounds = [caseY1, caseX1, caseY2, caseX2];
			app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
			// obj.fit(FitOptions.frameToContent);




		}

	}

	// }


	app.activeDocument.viewPreferences.horizontalMeasurementUnits = app.activeDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;




}
var u;

app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");