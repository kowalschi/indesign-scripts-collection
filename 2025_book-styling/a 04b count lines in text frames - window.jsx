#targetengine "find3lines_1";


/*
	 
	find orphan lines 
	
	(c) Dan Ichimescu 2025
	(constantindan@gmail.com)
		
		
*/

if (!(app.activeDocument.isValid)) {

	alert("Open a document and select some objects!")
	exit()
}


var sourcePages = app.activeDocument.pages;
var doc = app.activeDocument;

var arrPagesWithLines = [];

myAllPageItemsText = app.activeDocument.textFrames;
// alert(myAllPageItemsText.length)
var listString = ""

findmylines()

var displayMyPage = "--";
var contorclick = 0;
var defmarginL = 10;
var defmarginR = 10;
var defGuttCol = 5;
var defGuttRow = 5;
var heighttext = 22;
var heighttext2 = 22;
var widthtext = 45;

var win = createDialog();
win.show();



function createDialog() {
	var mw = 90;


	// find orphan lines
	// ====================
	var w = new Window("palette"); //palette  dialog
	w.text = "Find orphan lines v1";
	w.orientation = "row";
	w.alignChildren = ["center", "top"];
	w.spacing = 20;
	w.margins = 12;

	// GRUP
	// ====
	var grup = w.add("group", undefined, { name: "grup" });
	grup.orientation = "row";
	grup.alignChildren = ["left", "center"];
	grup.spacing = 10;
	grup.margins = 0;

	// PANEL1
	// ======
	var panel1 = grup.add("panel", undefined, undefined, { name: "panel1" });
	panel1.orientation = "column";
	panel1.alignChildren = ["left", "top"];
	panel1.spacing = 10;
	panel1.margins = 10;

	var statictext1 = panel1.add("statictext", undefined, undefined, { name: "Pages with problems:" });
	statictext1.text = listString;
	// statictext1.text = "";
	statictext1.alignment = ["left", "top"];
	statictext1.preferredSize.height = heighttext;

	var statictext2 = panel1.add("statictext", undefined, undefined, { name: "Current page" });
	statictext2.text = displayMyPage;// "";
	statictext2.alignment = ["left", "top"];
	statictext2.preferredSize.height = heighttext;
	statictext2.preferredSize.width = widthtext;


	// var divider1 = panel1.add("panel", undefined, undefined, { name: "divider1" });
	// divider1.alignment = "fill";



	// GROUP2

	w.buttons = w.add('group {orientation:"column"}');
	var goToMypage = w.buttons.add('button {text: "Go forward to page", enabled: true}');
	var gobackToMypage = w.buttons.add('button {text: "Go back to page", enabled: true}')
	var exitbt = w.buttons.add('button {text: "Exit", enabled: true}')



	goToMypage.onClick = function () {

		// go to page  listString arrPagesWithLines
		if (contorclick <= arrPagesWithLines.length) {
			var mypage = arrPagesWithLines[contorclick] - 1

			app.activeWindow.activePage = app.activeDocument.pages.item(mypage);
			var temppage = mypage + 1;
			// alert(temppage)
			statictext2.text = temppage.toString();//(mypage + 1) + ""; 
			// displayMyPage = mypage;
			contorclick++
		} else {
			contorclick = 0;
		}

	}

	gobackToMypage.onClick = function () {
		// go back to page
		// app.activeWindow.activePage = app.activeDocument.pages.item(7);
		if (contorclick <= arrPagesWithLines.length) {
			var mypage = arrPagesWithLines[contorclick] - 1
			app.activeWindow.activePage = app.activeDocument.pages.item(mypage);
			var temppage = mypage + 1;
			alert(temppage)
			statictext2.text = temppage.toString();//(mypage + 1) + ""; 
			// displayMyPage = mypage;
			contorclick--
		} else {
			contorclick = 0;
		}

	}

	exitbt.onClick = function () { w.close() }
	w.onClose = function () {
		w.close();
		exit();
	}
	return w;
}
/////-------------------->







function findmylines() {

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

					if (myPage > 4) {
						arrPagesWithLines.push(myPage + 1);
					}
					// try {
					// 	var selPage = myTextFrame.parentPage.documentOffset;
					// 	selPage.appliedMaster = doc.masterSpreads.item("B-Parent");//"B-Parent"//null; "[B-Parent]"
					// } catch (e) { };
				}
			}

		}

	}
	listString = arrPagesWithLines.join(', ');
	// alert("pages with less equal 3 lines:\n" + listString)

}