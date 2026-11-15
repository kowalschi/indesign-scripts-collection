app.doScript(resizeAnchoredShapes, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Resize Anchored Shapes 10x10mm");

function resizeAnchoredShapes() {
	var doc = app.activeDocument;

	// Save and set measurement units to mm
	var origH = doc.viewPreferences.horizontalMeasurementUnits;
	var origV = doc.viewPreferences.verticalMeasurementUnits;
	doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
	doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;

	// ~a is InDesign's GREP code for the anchored object marker character
	app.findGrepPreferences = NothingEnum.nothing;
	app.changeGrepPreferences = NothingEnum.nothing;
	app.findGrepPreferences.findWhat = "~a";

	var found = doc.findGrep();
	var count = 0;

	for (var i = 0; i < found.length; i++) {
		var pageItems = found[i].allPageItems;
		for (var j = 0; j < pageItems.length; j++) {
			var item = pageItems[j];
			var itemType = item.constructor.name;
			if (itemType === "Rectangle" || itemType === "Oval") {
				var b = item.geometricBounds; // [top, left, bottom, right] in mm
				item.geometricBounds = [b[0], b[1], b[0] + 10, b[1] + 10];
				count++;
			}
		}
	}

	// Clear grep preferences
	app.findGrepPreferences = NothingEnum.nothing;

	// Restore measurement units
	doc.viewPreferences.horizontalMeasurementUnits = origH;
	doc.viewPreferences.verticalMeasurementUnits = origV;

	alert("Resized " + count + " anchored rectangle(s) and ellipse(s) to 10×10 mm.");
}
