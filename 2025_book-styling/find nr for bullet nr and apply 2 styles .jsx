#targetengine "findnumberforbulletnrandapply3styles";

var myDocument = app.activeDocument;
var mystory = app.selection[0].parentStory;

var style1 = myDocument.paragraphStyles.item('09 bullet 1');
var style2 = myDocument.paragraphStyles.item('09 bullet 2');
var style3 = myDocument.paragraphStyles.item('09 bullet 3');

// GREP: paragraphs starting with the standalone number 1 (not 10, 11, 12 ...)
app.findGrepPreferences = NothingEnum.nothing;
app.findGrepPreferences.findWhat = '^1\\b';
var rawFound = mystory.findGrep();
app.findGrepPreferences = NothingEnum.nothing;

// Keep only matches whose paragraph has font size 11 pt
var myFound = [];
for (var f = 0; f < rawFound.length; f++) {
	try {
		var para = rawFound[f].paragraphs.firstItem();
		var fontSize = para.characters.firstItem().pointSize;
		if (Math.abs(fontSize - 11) < 0.1) {
			myFound.push(rawFound[f]);
		}
	} catch (e) { }
}

var i = -1;

var ui = CreateUI();
ui.show();


function CreateUI() {

	var ui = new Window("palette", "Apply Bullet Styles (09 bullet 1/2/3)", undefined, { closeButton: false });

	ui.orientation = "column";
	ui.alignChildren = ["fill", "top"];

	// Info panel
	ui.infoPanel = ui.add("panel", undefined, "Liste gasite: " + myFound.length);
	ui.infoPanel.orientation = "column";
	ui.infoPanel.alignChildren = ["center", "center"];
	ui.infoPanel.statusText = ui.infoPanel.add("statictext", undefined, "Navigati la o lista.");
	ui.infoPanel.statusText.preferredSize.width = 300;

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
	ui.labels.align.row2.left.helpTip = "Lista anterioara";
	ui.labels.align.row2.left.preferredSize.width = 150;
	ui.labels.align.row2.right = ui.labels.align.row2.add("button", undefined, "Urmator ->");
	ui.labels.align.row2.right.helpTip = "Lista urmatoare";
	ui.labels.align.row2.right.preferredSize.width = 150;

	// Actions
	ui.actions = ui.add("group", undefined);
	ui.actions.orientation = "row";
	ui.actions.alignChildren = ["center", "center"];
	ui.actions.apply = ui.actions.add("button", undefined, "Apply Styles");
	ui.actions.close = ui.actions.add("button", undefined, "Close");


	ui.labels.align.row2.right.onClick = function () { SearchForward(); };
	ui.labels.align.row2.left.onClick = function () { SearchBack(); };

	ui.actions.apply.onClick = function () {
		if (i < 0 || i >= myFound.length) {
			alert("Navigati la o lista mai intai.");
			return;
		}

		app.doScript(function () {
			try {
				// Same pattern as ȘTIRI script: get paragraph from the found text range
				var currentPara = myFound[i].paragraphs.firstItem();
				var group = [currentPara];

				// Extract the leading number from the first paragraph (should be 1)
				var firstMatch = /^(\d+)/.exec(currentPara.contents);
				if (!firstMatch) {
					group[0].appliedParagraphStyle = style1;
					return;
				}
				var expectedNum = parseInt(firstMatch[1], 10) + 1;

				// Walk forward: only continue if next paragraph starts with the next consecutive number
				var nextPara = currentPara.insertionPoints[-1].paragraphs[0];
				while (nextPara.isValid) {
					var match = /^(\d+)/.exec(nextPara.contents);
					if (!match || parseInt(match[1], 10) !== expectedNum) break;
					group.push(nextPara);
					expectedNum++;
					var newNext = nextPara.insertionPoints[-1].paragraphs[0];
					if (!newNext.isValid) break;
					nextPara = newNext;
				}

				// Apply styles: first → style1, middle → style2, last → style3
				for (var g = 0; g < group.length; g++) {
					if (g === 0) {
						group[g].appliedParagraphStyle = style1;
					} else if (g === group.length - 1) {
						group[g].appliedParagraphStyle = style3;
					} else {
						group[g].appliedParagraphStyle = style2;
					}
				}

				ui.infoPanel.statusText.text = "Lista " + (i + 1) + " din " + myFound.length +
					" — " + group.length + " paragrafe prelucrate.";

			} catch (e) {
				alert("Error: " + e.message);
			}
		}, ScriptLanguage.javascript, undefined, UndoModes.ENTIRE_SCRIPT, "Apply Bullet Styles");
	};

	ui.actions.close.onClick = function () { ui.close(); };

	ui.onClose = function () {
		ui.close();
		exit();
	};

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
	ui.infoPanel.statusText.text = "Lista " + (i + 1) + " din " + myFound.length;
}
