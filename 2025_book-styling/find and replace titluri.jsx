var myDocument = app.activeDocument
// select story
var mystory = app.selection[0].parentStory //
//
var theParagraphStyle = app.activeDocument.paragraphStyles.item('Titlu1_cap')

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
    // titlu

    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING
    app.findGrepPreferences.findWhat = '(^\\d+\\.)' // ########
    app.changeGrepPreferences.changeTo = '$1' //\r
    app.changeGrepPreferences.appliedParagraphStyle = 'Titlu1_cap'
    mystory.changeGrep()
    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING

    /// titlu end
}