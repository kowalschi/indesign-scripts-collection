
var sourcePages = app.activeDocument.pages;
var doc = app.activeDocument;

var mylines = 29
myAllPageItemsText = app.activeDocument.textFrames;
// alert(myAllPageItemsText.length)


for (var i = 0; i < sourcePages.length; i++) {


	var itemsOnPage = sourcePages[i].allPageItems//.pageItems;
	for (var j = 0; j < itemsOnPage.length; j++) {
		var myTextFrame = itemsOnPage[j];
		// alert(myTextFrame.constructor.name)
		if (myTextFrame instanceof TextFrame) {
			// alert(myTextFrame.constructor.name)
			if (myTextFrame.lines.length >= mylines) { //myTextFrame.contents === "" ||

				myTextFrame.appliedObjectStyle = doc.objectStyles.itemByName("justify");

				// try {
				// 	var selPage = myTextFrame.parentPage.documentOffset;
				// 	selPage.appliedMaster = doc.masterSpreads.item("B-Parent");//"B-Parent"//null; "[B-Parent]"
				// } catch (e) { };
			}
		}

	}

}
alert("justify applied")