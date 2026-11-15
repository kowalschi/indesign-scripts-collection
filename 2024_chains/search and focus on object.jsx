// // Clear the find dialog -- you never know what's left there
// app.findTextPreferences = null;
// app.findTextPreferences.findWhat = "Că, celor ce iubesc pe Dumnezeu";
// myFound = app.activeDocument.findText();



app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
app.findGrepPreferences.findWhat = "^\\d+"; // ########
app.changeGrepPreferences.changeTo = ""; //\r
var myFound = app.activeDocument.findGrep();
// alert(myFound[0].content)
// myDocument.textFrames.itemByName(textFramefromSelection.name).parentStory.changeGrep();
// app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
// myFound is an array of everything that was found. To select the first item (assuming that any were found), do

// myFound[0].select();

// app.select(myFound[3]);

// And to display the page/spread on which the first item was found, use this:

// app.activeWindow.activeSpread = myFound[0].parentTextFrames[0].parent.parent;



////////////////


// I have a script I call BetterViewAfterFind who's sole purpose is to help locate the current text selection:
//DESCRIPTION: A Better View after Find



showIt(myFound[5]);

function showIt(theObj) {

    if (arguments.length > 0) {

        // Select object, turn to page and center it in the window

        app.select(theObj);

    }

    // Note: if no object is passed and there is no selection the current page

    // will be centered in the window at whatever zoom is being used

    var myZoom = app.activeWindow.zoomPercentage;

    app.activeWindow.zoom(ZoomOptions.showPasteboard);

    app.activeWindow.zoomPercentage = myZoom;

}




///////////////


// Sample data - array of search results
var searchResults = ["result1", "result2", "result3"];

// Variable to track current position
var currentPosition = -1;

// Function to handle "Search" button click
function search() {
    // Perform search operation and populate searchResults array
    searchResults = performSearch();

    // Display search results in UI
    displaySearchResults();

    // Set current position to the first result
    currentPosition = 0;
}

// Function to handle "Find Next" button click
function findNext() {
    // Check if there are search results
    if (searchResults.length === 0) {
        alert("No search results available.");
        return;
    }

    // Increment current position
    currentPosition++;

    // Wrap around if at the end of the array
    if (currentPosition >= searchResults.length) {
        currentPosition = 0;
    }

    // Display the next search result
    displayNextResult();
}

// Function to perform search operation (replace with your own implementation)
function performSearch() {
    // Perform search and return array of results
    // Replace this with your actual search implementation
    return ["result1", "result2", "result3"];
}

// Function to display search results (replace with your own implementation)
function displaySearchResults() {
    // Display search results in the UI
    // Replace this with your actual UI update code
    console.log("Search results:", searchResults);
}

// Function to display the next search result (replace with your own implementation)
function displayNextResult() {
    // Display the next search result in the UI
    // Replace this with your actual UI update code
    console.log("Next search result:", searchResults[currentPosition]);
}
