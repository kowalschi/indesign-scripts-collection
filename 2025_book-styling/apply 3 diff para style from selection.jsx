// Adobe InDesign Script: Apply Paragraph Styles Based on Selection
// This script applies different paragraph styles to first, last, or single paragraphs in selection

(function () {
    // Check if InDesign is running and a document is open
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc = app.activeDocument;
    var selection = app.selection;

    // Check if there's a valid text selection
    if (selection.length === 0)
    // ||
    // (selection[0].constructor.name !== "InsertionPoint" &&
    //     selection[0].constructor.name !== "Text" &&
    //     selection[0].constructor.name !== "TextRange")
    {
        alert("Please select some text first.");
        return;
    }

    try {
        // Get the selected text
        var selectedText = selection[0];
        var textFrame = selectedText.parentTextFrames[0];
        var story = textFrame.parentStory;

        // Find all paragraphs within the selection
        var startIndex = selectedText.index;
        var endIndex = startIndex + selectedText.length - 1;

        var selectedParagraphs = [];

        // Get all paragraphs in the story
        var allParagraphs = story.paragraphs;

        // Find paragraphs that intersect with our selection
        for (var i = 0; i < allParagraphs.length; i++) {
            var para = allParagraphs[i];
            var paraStart = para.index;
            var paraEnd = paraStart + para.length - 1;

            // Check if paragraph intersects with selection
            if ((paraStart >= startIndex && paraStart <= endIndex) ||
                (paraEnd >= startIndex && paraEnd <= endIndex) ||
                (paraStart <= startIndex && paraEnd >= endIndex)) {
                selectedParagraphs.push(para);
            }
        }

        if (selectedParagraphs.length === 0) {
            alert("No paragraphs found in selection.");
            return;
        }

        // Define paragraph style names
        // "04 sub 1 data"
        // "05 sub 2 loc"
        // var firstParaStyle = "corp italic la dreapta PRIMU PARA";
        // var lastParaStyle = "corp italic la dreapta ULTIMUL PARA";
        // var singleParaStyle = "corp italic la dreapta UN SINGUR PARA";

        var firstParaStyle = "10 bulet 1"; //10 bulet 1
        var lastParaStyle = "10 bulet 2";
        var singleParaStyle = "10 bulet 3";


        // Check if the required paragraph styles exist
        function checkStyleExists(styleName) {
            try {
                doc.paragraphStyles.itemByName(styleName);
                return true;
            } catch (e) {
                return false;
            }
        }

        var missingStyles = [];
        if (!checkStyleExists(firstParaStyle)) missingStyles.push(firstParaStyle);
        if (!checkStyleExists(lastParaStyle)) missingStyles.push(lastParaStyle);
        if (!checkStyleExists(singleParaStyle)) missingStyles.push(singleParaStyle);

        if (missingStyles.length > 0) {
            alert("The following paragraph styles don't exist:\n" + missingStyles.join("\n") +
                "\n\nPlease create these styles first.");
            return;
        }

        // Apply styles based on number of selected paragraphs
        if (selectedParagraphs.length == 1) {
            // Single paragraph - apply single paragraph style
            selectedParagraphs[0].appliedParagraphStyle = doc.paragraphStyles.itemByName(singleParaStyle);
            // $.writeln("Applied '" + singleParaStyle + "' to single paragraph");

        } else {
            // Multiple paragraphs - apply first and last styles
            // Apply first paragraph style
            selectedParagraphs[0].appliedParagraphStyle = doc.paragraphStyles.itemByName(firstParaStyle);
            // $.writeln("Applied '" + firstParaStyle + "' to first paragraph");

            // Apply last paragraph style
            var lastIndex = selectedParagraphs.length - 1;
            selectedParagraphs[lastIndex].appliedParagraphStyle = doc.paragraphStyles.itemByName(lastParaStyle);
            // $.writeln("Applied '" + lastParaStyle + "' to last paragraph");

            // Middle paragraphs keep their existing styles
            if (selectedParagraphs.length > 2) {
                // $.writeln("Middle paragraphs (" + (selectedParagraphs.length - 2) + ") kept their existing styles");
            }
        }

        // Success message
        var message = "Successfully applied paragraph styles to " + selectedParagraphs.length + " paragraph(s).";
        if (selectedParagraphs.length === 1) {
            message += "\nApplied: " + singleParaStyle;
        } else {
            message += "\nFirst paragraph: " + firstParaStyle;
            message += "\nLast paragraph: " + lastParaStyle;
        }

        alert(message);

    } catch (error) {
        alert("Error: " + error.message + "\n\nPlease make sure you have selected text and the required paragraph styles exist.");
        // $.writeln("Error details: " + error.toString());
    }
})();