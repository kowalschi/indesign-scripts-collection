var myDocument = app.activeDocument;
var mystory = app.selection[0].parentStory;
var theParagraphStyle = myDocument.paragraphStyles.item('03 subtitlu');

app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;
app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.doScript(function () {
	Changetolower();
}, ScriptLanguage.javascript, undefined, UndoModes.ENTIRE_SCRIPT, "Change Case to Lowercase");

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

alert('done');

function Changetolower() {
	app.findGrepPreferences = NothingEnum.nothing;
	app.findGrepPreferences.appliedParagraphStyle = theParagraphStyle;
	app.findGrepPreferences.findWhat = '.+';

	var found = mystory.findGrep();
	app.findGrepPreferences = NothingEnum.nothing;

	for (var i = 0; i < found.length; i++) {
		found[i].changecase(ChangecaseMode.LOWERCASE);
	}
}
