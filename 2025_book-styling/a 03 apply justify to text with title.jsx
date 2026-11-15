
var gMyDoc = app.activeDocument;
var gDocParagraphStyles = gMyDoc.allParagraphStyles;
var arrayOfParagraphStyleNames = [];
// check para Titlu

var theParagraphStyle = app.activeDocument.paragraphStyles.item("partea 2 a Titlu1 CAPS"); //Titlu

// for (var i = 1; i <= gDocParagraphStyles.length; i += 1) {
// 	arrayOfParagraphStyleNames[i] = gDocParagraphStyles[i - 1].name;
// 	var climbing = gDocParagraphStyles[i - 1].parent;
// 	while (climbing.constructor.name == "ParagraphStyleGroup") {
// 		arrayOfParagraphStyleNames[i] = "[" + climbing.name + "]" + arrayOfParagraphStyleNames[i];
// 		climbing = climbing.parent;
// 	}
// }
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;

app.findTextPreferences.appliedParagraphStyle = theParagraphStyle;
var myFinds = gMyDoc.findText();
// alert(myFinds.length)
for (var j = 0; j < myFinds.length; j += 1) {
	for (var k = 0; k < myFinds[j].parentTextFrames.length; k += 1) {
		// var thePage = getPage(myFinds[j].parentTextFrames[k].insertionPoints[0]);
		var theTextFrame = myFinds[j].parentTextFrames[k];
		if (theTextFrame == "error") {
			continue;
		}
		theTextFrame.appliedObjectStyle = gMyDoc.objectStyles.itemByName("justify");


	}
}

alert("justify applied")