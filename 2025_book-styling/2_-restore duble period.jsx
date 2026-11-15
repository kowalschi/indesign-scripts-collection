// Adobe InDesign Script 2: Import and Restore Double Periods
// This script reads the TXT file and restores missing double periods
// Run this on the MODIFIED document (where find/replace removed the periods)

(function () {
    // Check if InDesign is running and a document is open
    if (app.documents.length === 0) {
        alert("Please open the modified document first.");
        return;
    }

    var doc = app.activeDocument;
    var replacementCount = 0;

    try {
        // Ask user to select the exported TXT file
        var importFile = File.openDialog("Select the exported double periods TXT file:", "Text files:*.txt");

        if (!importFile) {
            alert("No file selected. Operation cancelled.");
            return;
        }

        // Read the file
        importFile.encoding = "UTF-8";
        importFile.open("r");
        var fileContent = importFile.read();
        importFile.close();

        if (!fileContent) {
            alert("File is empty or could not be read.");
            return;
        }

        // Split content into lines and process
        var lines = fileContent.split("\n");
        var dataLines = [];

        // Filter out comment lines and empty lines
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].replace(/^\s+|\s+$/g, ""); // trim
            if (line && !line.match(/^\/\//)) {
                dataLines.push(line);
            }
        }

        if (dataLines.length === 0) {
            alert("No data found in the file.");
            return;
        }

        // Clear find/change preferences
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;

        // Process each data line
        for (var j = 0; j < dataLines.length; j++) {
            var parts = dataLines[j].split("\t");

            if (parts.length >= 3) {
                var firstWord = parts[0];
                var originalText = parts[1];
                var secondWord = parts[2];

                // Create search pattern for the first word followed by the second word
                // We need to find where firstWord is followed by secondWord (missing the ..)
                var badtext = originalText.replace(/  /g, "");
                var searchPattern = escapeRegExp(badtext);
                // var searchPattern = escapeRegExp(firstWord) + escapeRegExp(secondWord);

                app.findGrepPreferences.findWhat = searchPattern;
                app.changeGrepPreferences.changeTo = originalText;

                // Perform the replacement
                var replacements = doc.changeGrep();
                replacementCount += replacements.length;

                if (replacements.length > 0) {
                    $.writeln("Restored: '" + firstWord + " " + secondWord + "' -> '" + originalText + "' (" + replacements.length + " times)");
                }
            }
        }

        // Clear preferences
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;

        if (replacementCount > 0) {
            alert("Successfully restored " + replacementCount + " instances of double periods!" +
                "\n\nProcessed " + dataLines.length + " entries from the file." +
                "\n\nCheck the document to verify the corrections.");
        } else {
            alert("No matching text found to restore. " +
                "\nThis might mean:" +
                "\n- The periods were already restored" +
                "\n- The text has been further modified" +
                "\n- You're running this on the wrong document");
        }

    } catch (error) {
        alert("Error: " + error.message);
        $.writeln("Error details: " + error.toString());

        // Clear preferences in case of error
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
    }

    // Helper function to escape special regex characters
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
})();