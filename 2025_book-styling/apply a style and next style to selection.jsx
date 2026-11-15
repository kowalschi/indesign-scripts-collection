app.doScript(applyStylesAndNext, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Apply Style and Next Style");
// applyStylesAndNext()
function applyStylesAndNext() {
	if (app.selection.length === 0 || !app.selection[0].texts[0].parentStory) {
		alert("Please select some text or place your cursor in a text frame.");
		return;
	}

	// 1. Define your exact style names here
	var firstStyleName = "11 text normal";
	var nextStyleName = "11 text normal cu spatiu";

	var doc = app.activeDocument;
	var firstStyle = doc.paragraphStyles.itemByName(firstStyleName);
	var nextStyle = doc.paragraphStyles.itemByName(nextStyleName);

	if (!firstStyle.isValid || !nextStyle.isValid) {
		alert("One or more of the specified styles could not be found.");
		return;
	}

	// 2. Get the paragraphs in the current selection
	var story = app.selection[0].parentStory;
	var paras = app.selection[0].paragraphs;

	if (paras.length === 0) return;

	// 3. Apply the styles
	for (var i = 0; i < paras.length; i++) {
		var currentPara = paras[i];

		if (i === 0) {
			// currentPara.appliedParagraphStyle = firstStyle;
			currentPara.applyParagraphStyle(firstStyle, false);
		} else {
			// currentPara.appliedParagraphStyle = nextStyle;
			currentPara.applyParagraphStyle(nextStyle, false);
		}

		// Optional: clear overrides
		// currentPara.clearOverrides(OverrideType.ALL);
	}
}
