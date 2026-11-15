// Adobe InDesign Script 1: Find and Export Double Periods
// This script finds all instances of ".." between words and exports to TXT file
// Run this on the ORIGINAL document (where find/replace was NOT performed)

(function () {
    // Check if InDesign is running and a document is open
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc = app.activeDocument;
    var results = [];

    try {
        // Set up find/change preferences
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;

        // GREP pattern to find word + double period + word
        // This pattern captures: word characters, followed by two periods, followed by word characters
        app.findGrepPreferences.findWhat = "(\\w+)  (\\w+)"; //\\b(\\w+)\\.\\.\\s*(\\w+)\\b

        // Find all instances in the document
        var foundItems = doc.findGrep();

        if (foundItems.length === 0) {
            alert("No instances of double periods between words found.");
            return;
        }

        // Process each found item
        for (var i = 0; i < foundItems.length; i++) {
            var foundText = foundItems[i];
            var fullMatch = foundText.contents;

            // Extract the words using regex
            var match = fullMatch.match(/(\w+)  (\w+)/);
            if (match) {
                var firstWord = match[1];
                var secondWord = match[2];
                var fullContext = fullMatch;

                // Store: firstWord TAB fullMatch TAB secondWord
                results.push(firstWord + "\t" + fullMatch + "\t" + secondWord);
            }
        }

        // Clear find preferences
        app.findGrepPreferences = NothingEnum.nothing;

        if (results.length === 0) {
            alert("No valid double period patterns found.");
            return;
        }

        // Ask user where to save the file
        var saveFile = File.saveDialog("Save double periods data as:", "Text files:*.txt");

        if (saveFile) {
            // Create file content
            var fileContent = "// Double Periods Export - InDesign Recovery Data\n";
            fileContent += "// Format: FirstWord TAB FullMatch TAB SecondWord\n";
            fileContent += "// Generated: " + new Date().toString() + "\n";
            fileContent += "// Total entries: " + results.length + "\n\n";

            // Add all results
            for (var j = 0; j < results.length; j++) {
                fileContent += results[j] + "\n";
            }

            // Write to file
            saveFile.encoding = "UTF-8";
            saveFile.open("w");
            saveFile.write(fileContent);
            saveFile.close();

            alert("Successfully exported " + results.length + " instances to:\n" + saveFile.fsName +
                "\n\nNow run Script 2 on your modified document to restore the periods.");
        }

    } catch (error) {
        alert("Error: " + error.message);
        $.writeln("Error details: " + error.toString());

        // Clear preferences in case of error
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
    }
})();