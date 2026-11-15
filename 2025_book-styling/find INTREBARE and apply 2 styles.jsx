#targetengine "changeparastylesforINTREBARE";
var myDocument = app.activeDocument;
var mystory = app.selection[0].parentStory;

var style1 = myDocument.paragraphStyles.item('07 intrebare');
var style2 = myDocument.paragraphStyles.item('07 raspuns');

// pre-find all paragraphs containing "Întrebare"
var i = -1;
var myFound = [];

app.findGrepPreferences = NothingEnum.nothing;
app.findGrepPreferences.findWhat = 'Întrebare';
myFound = mystory.findGrep();
app.findGrepPreferences = NothingEnum.nothing;

var ui = CreateUI();
ui.show();


function CreateUI() {

	var ui = new Window("palette", "Apply Styles - Întrebare", undefined, { closeButton: false });

	ui.orientation = "column";
	ui.alignChildren = ["fill", "top"];

	// Navigation panel
	ui.labels = ui.add("panel", undefined, undefined);
	ui.labels.orientation = "column";
	ui.labels.alignChildren = ["center", "center"];
	ui.labels.align = ui.labels.add("group", undefined, undefined);
	ui.labels.align.orientation = "column";
	ui.labels.align.alignChildren = ["center", "center"];
	ui.labels.align.row2 = ui.labels.align.add("group", undefined);
	ui.labels.align.row2.preferredSize.height = 25;
	ui.labels.align.row2.orientation = "row";
	ui.labels.align.row2.alignChildren = ["center", "fill"];
	ui.labels.align.row2.left = ui.labels.align.row2.add("button", undefined, "<- Anterior");
	ui.labels.align.row2.left.helpTip = "Cauta paragraful anterior";
	ui.labels.align.row2.left.preferredSize.width = 150;
	ui.labels.align.row2.right = ui.labels.align.row2.add("button", undefined, "Urmator ->");
	ui.labels.align.row2.right.helpTip = "Cauta paragraful urmator";
	ui.labels.align.row2.right.preferredSize.width = 150;

	// Actions
	ui.actions = ui.add("group", undefined);
	ui.actions.orientation = "row";
	ui.actions.alignChildren = ["center", "center"];
	ui.actions.apply = ui.actions.add("button", undefined, "Apply Styles");
	ui.actions.close = ui.actions.add("button", undefined, "Close");


	ui.labels.align.row2.right.onClick = function () { SearchForward(); }
	ui.labels.align.row2.left.onClick = function () { SearchBack(); }

	ui.actions.apply.onClick = function () {
		if (i < 0 || i >= myFound.length) {
			alert("Navigati la un paragraf mai intai.");
			return;
		}
		app.doScript(function () {
			try {
				var firstPara = myFound[i].paragraphs.firstItem();
				var nextPara = firstPara.insertionPoints[-1].paragraphs[0];
				firstPara.appliedParagraphStyle = style1;
				nextPara.appliedParagraphStyle = style2;
			} catch (e) {
				alert("Error: " + e.message);
			}
		}, ScriptLanguage.javascript, undefined, UndoModes.ENTIRE_SCRIPT, "Apply Styles Întrebare");
	}

	ui.actions.close.onClick = function () { ui.close(); }

	ui.onClose = function () {
		ui.close();
		exit();
	}

	return ui;
}


function SearchForward() {
	i++;
	if (i >= myFound.length) {
		i = 0;
	}
	showIt(myFound[i]);
}

function SearchBack() {
	i--;
	if (i < 0) {
		i = myFound.length - 1;
	}
	showIt(myFound[i]);
}

function showIt(theObj) {
	if (arguments.length > 0) {
		app.select(theObj);
	}
	var myZoom = app.activeWindow.zoomPercentage;
	app.activeWindow.zoom(ZoomOptions.showPasteboard);
	app.activeWindow.zoomPercentage = myZoom;
}
