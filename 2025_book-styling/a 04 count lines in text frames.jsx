
var sourcePages = app.activeDocument.pages;
var doc = app.activeDocument;

var arrPagesWithLines = [];

myAllPageItemsText = app.activeDocument.textFrames;
// alert(myAllPageItemsText.length)


for (var i = 0; i < sourcePages.length; i++) {


	var itemsOnPage = sourcePages[i].allPageItems//.pageItems;
	for (var j = 0; j < itemsOnPage.length; j++) {
		var myTextFrame = itemsOnPage[j];
		// alert(myTextFrame.constructor.name)
		if (myTextFrame instanceof TextFrame) {
			// alert(myTextFrame.constructor.name)
			if (myTextFrame.lines.length <= 3) { //myTextFrame.contents === "" ||

				try {
					var myPage = myTextFrame.parentPage.documentOffset;

				} catch (e) { };
				arrPagesWithLines.push(myPage + 1);
				// try {
				// 	var selPage = myTextFrame.parentPage.documentOffset;
				// 	selPage.appliedMaster = doc.masterSpreads.item("B-Parent");//"B-Parent"//null; "[B-Parent]"
				// } catch (e) { };
			}
		}

	}

}
var listString = arrPagesWithLines.join(', ');
alert("pages with less equal 3 lines:\n" + listString)