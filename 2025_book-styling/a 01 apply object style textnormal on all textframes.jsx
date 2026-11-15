
var gMyDoc = app.activeDocument;
var gDocParagraphStyles = gMyDoc.allParagraphStyles;
var arrayOfParagraphStyleNames = [];
// check para Titlu

var theParagraphStyle = app.activeDocument.paragraphStyles.item("text_normal");


var sourcePages = app.activeDocument.pages;
var doc = app.activeDocument;


myAllPageItemsText = app.activeDocument.textFrames;
// alert(myAllPageItemsText.length)


for (var i = 0; i < sourcePages.length; i++) {


	var itemsOnPage = sourcePages[i].allPageItems//.pageItems;
	for (var j = 0; j < itemsOnPage.length; j++) {
		var myTextFrame = itemsOnPage[j];
		// alert(myTextFrame.constructor.name)
		if (myTextFrame instanceof TextFrame) {
			// alert(myTextFrame.constructor.name)


			myTextFrame.appliedObjectStyle = doc.objectStyles.itemByName("text_normal");


		}

	}

}
alert("text normal applied")


// for (var i = 1; i <= gDocParagraphStyles.length; i += 1) {
// 	arrayOfParagraphStyleNames[i] = gDocParagraphStyles[i - 1].name;
// 	var climbing = gDocParagraphStyles[i - 1].parent;
// 	while (climbing.constructor.name == "ParagraphStyleGroup") {
// 		arrayOfParagraphStyleNames[i] = "[" + climbing.name + "]" + arrayOfParagraphStyleNames[i];
// 		climbing = climbing.parent;
// 	}
// }


// app.findTextPreferences.appliedParagraphStyle = theParagraphStyle;
// var myFinds = gMyDoc.findText();
// for (var j = 0; j < myFinds.length; j += 1) {
// 	for (var k = 0; k < myFinds[j].parentTextFrames.length; k += 1) {
// 		// var thePage = getPage(myFinds[j].parentTextFrames[k].insertionPoints[0]);
// 		var theTextFrame = myFinds[j].parentTextFrames[k];
// 		if (theTextFrame == "error") {
// 			continue;
// 		}
// 		theTextFrame.appliedObjectStyle = gMyDoc.objectStyles.itemByName("text_primu_para");


// 	}
// }

