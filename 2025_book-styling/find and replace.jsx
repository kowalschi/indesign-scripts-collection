var myDocument = app.activeDocument
// select story
var mystory = app.selection[0].parentStory //
//
// var theParagraphStyle = app.activeDocument.paragraphStyles.item('Titlu1_cap')

app.findTextPreferences = NothingEnum.nothing
app.changeTextPreferences = NothingEnum.nothing

app.findGrepPreferences = NothingEnum.nothing
app.changeGrepPreferences = NothingEnum.nothing

CleanText()

app.findTextPreferences = NothingEnum.nothing
app.changeTextPreferences = NothingEnum.nothing

app.findGrepPreferences = NothingEnum.nothing
app.changeGrepPreferences = NothingEnum.nothing

alert('done')

function CleanText() {
	// 	//Set the GREP find options (adjust to taste)
	// app.findChangeGrepOptions.includeFootnotes = false;
	// app.findChangeGrepOptions.includeHiddenLayers = false;
	// app.findChangeGrepOptions.includeLockedLayersForFind = false;
	// app.findChangeGrepOptions.includeLockedStoriesForFind = false;
	// app.findChangeGrepOptions.includeMasterPages = true;

	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING
	app.findGrepPreferences.findWhat = '(^ )'
	app.changeGrepPreferences.changeTo = '' //\r
	mystory.changeGrep()
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING

	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING
	app.findGrepPreferences.findWhat = '( ,)'
	app.changeGrepPreferences.changeTo = ',' //\r
	mystory.changeGrep()
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING

	app.findGrepPreferences.findWhat = '(  )'
	app.changeGrepPreferences.changeTo = ' ' //\r
	mystory.changeGrep()
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING

	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING
	app.findGrepPreferences.findWhat = '(^\\t)'
	app.changeGrepPreferences.changeTo = '' //\r
	mystory.changeGrep()
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING

	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING
	app.findGrepPreferences.findWhat = '(\\t+)'
	app.changeGrepPreferences.changeTo = '' //\r
	mystory.changeGrep()
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING

	// app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING
	// app.findGrepPreferences.findWhat = '(^\\d+):' //^\d+\:
	// app.changeGrepPreferences.changeTo = '$1.' //\r
	// mystory.changeGrep()
	// app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING

	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING
	app.findGrepPreferences.findWhat = '(\r \r)'
	app.changeGrepPreferences.changeTo = '\r' //\r
	mystory.changeGrep()
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING

	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING
	app.findGrepPreferences.findWhat = '(\r\t\r)'
	app.changeGrepPreferences.changeTo = '\r' //\r
	mystory.changeGrep()
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING



	/// multiple enteruri
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING
	app.findGrepPreferences.findWhat = '~b~b+'
	app.changeGrepPreferences.changeTo = '\r' //\r
	mystory.changeGrep()
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING




	/// multiple puaze
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING
	app.findGrepPreferences.findWhat = '  {2,}'//'[~m~>~f~|~S~s~<~/~.~3~4~%]{2,}'
	app.changeGrepPreferences.changeTo = '\\s' //\r
	mystory.changeGrep()
	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING

	////
}
// FindTextPref()
function FindTextPref() {
	//for info

	app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING
	for (var i = 0; i < myParagraphsTextMare.length; i++) {
		// alert(i)
		// alert(myParagraphss[i].contents)

		//Set the find options.
		//app.findTextPreferences.findWhat = "CAPITOLUL";
		app.findChangeTextOptions.caseSensitive = false
		app.findChangeTextOptions.includeFootnotes = false
		app.findChangeTextOptions.includeHiddenLayers = false
		app.findChangeTextOptions.includeLockedLayersForFind = false
		app.findChangeTextOptions.includeLockedStoriesForFind = false
		app.findChangeTextOptions.includeMasterPages = false
		app.findChangeTextOptions.wholeWord = true
		// app.findTextPreferences.findWhat.pointSize =14;
		//app.findTextPreferences.capitalization = Capitalization.ALL_CAPS; nu toate is all caps TREBUIE CU UPPER CASE
		app.findTextPreferences.pointSize = 16
		app.findTextPreferences.fontStyle = 'Bold'
		app.findTextPreferences.justification = Justification.CENTER_ALIGN

		// ;

		// ChangeTextPreference.justification

		// ChangeGrepPreference.justification

		app.changeTextPreferences.appliedParagraphStyle = '#Titlu'
		mystorydoiTextMare.changeText()
	}
}

/// info

//https://community.adobe.com/t5/indesign-discussions/how-to-get-the-exact-replaced-text/td-p/12345724
// var replaceTextArray = [];
// for (var n = 0; n < foundText.length; n++) {
// 	// Replace found text with new contents:
// 	foundText[n].contents = replaceText;
// 	var startPosition = foundText[n].insertionPoints[0].index;
// 	var endPosition = startPosition + replaceText.length;
// 	var replaceText = foundText[n].parentStory.characters.itemByRange(startPosition, endPosition);

// 	replaceTextArray[n] = replaceText;

// };
// mystory.changeGrep();

//alert(myParagraphsCuprins.length)
//app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
//app.findGrepPreferences.findWhat = "(^ )"; // ########
//app.findGrepPreferences.justification = Justification.CENTER_ALIGN;
//app.findGrepPreferences.fontStyle= 'Bold';

//app.changeGrepPreferences.changeTo =  ""; //\r
//app.changeGrepPreferences.appliedParagraphStyle = "#Titlu";
//mystorydoiTextMare.changeGrep();
