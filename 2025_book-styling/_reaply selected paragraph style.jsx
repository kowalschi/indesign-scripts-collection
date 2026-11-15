// Adobe InDesign Script: Paragraph Style Refresher with UI
// This script provides a simple interface to select and refresh paragraph styles

(function () {
    // Check if InDesign is running and a document is open
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc = app.activeDocument;

    try {
        // Get all paragraph styles in the document
        var allStyles = doc.paragraphStyles;
        var styleNames = [];

        // Collect all paragraph style names (excluding [No Paragraph Style])
        for (var i = 0; i < allStyles.length; i++) {
            var styleName = allStyles[i].name;
            if (styleName !== "[No Paragraph Style]") {
                styleNames.push(styleName);
            }
        }

        if (styleNames.length === 0) {
            alert("No paragraph styles found in this document.");
            return;
        }

        // Sort style names alphabetically
        styleNames.sort();

        // Create the user interface dialog
        var dialog = new Window("dialog", "Paragraph Style Refresher");
        dialog.orientation = "column";
        dialog.alignChildren = "fill";
        dialog.preferredSize.width = 400;

        // Add header text
        var headerPanel = dialog.add("panel");
        headerPanel.orientation = "column";
        headerPanel.alignChildren = "fill";
        headerPanel.add("statictext", undefined, "Select a paragraph style to refresh throughout the document:");

        // Add dropdown menu
        var dropdownPanel = dialog.add("panel");
        dropdownPanel.orientation = "row";
        dropdownPanel.alignChildren = "left";
        dropdownPanel.add("statictext", undefined, "Paragraph Style:");

        var styleDropdown = dropdownPanel.add("dropdownlist", undefined, styleNames);
        styleDropdown.preferredSize.width = 250;
        styleDropdown.selection = 0; // Select first item by default

        // Add info panel
        var infoPanel = dialog.add("panel");
        infoPanel.orientation = "column";
        infoPanel.alignChildren = "fill";
        var infoText = infoPanel.add("statictext", undefined, "This will find all paragraphs with the selected style\nand reapply the same style to refresh formatting.", { multiline: true });
        infoText.preferredSize.height = 40;

        // Add progress panel (initially hidden)
        var progressPanel = dialog.add("panel");
        progressPanel.orientation = "column";
        progressPanel.alignChildren = "fill";
        progressPanel.visible = false;
        var progressText = progressPanel.add("statictext", undefined, "Processing...");
        progressText.alignment = "center";

        // Add buttons
        var buttonPanel = dialog.add("group");
        buttonPanel.alignment = "center";

        var refreshButton = buttonPanel.add("button", undefined, "Refresh Style");
        var cancelButton = buttonPanel.add("button", undefined, "Cancel");

        // Button event handlers
        refreshButton.onClick = function () {
            if (styleDropdown.selection === null) {
                alert("Please select a paragraph style.");
                return;
            }

            var selectedStyleName = styleDropdown.selection.text;

            // Show progress
            progressPanel.visible = true;
            progressText.text = "Processing style: " + selectedStyleName;
            dialog.layout.layout(true);

            try {
                // Get the selected paragraph style object
                var selectedStyle = doc.paragraphStyles.itemByName(selectedStyleName);

                // Find all text using this paragraph style
                app.findGrepPreferences = NothingEnum.nothing;
                app.changeGrepPreferences = NothingEnum.nothing;

                // Set up find preferences to find paragraphs with the specific style
                app.findGrepPreferences.appliedParagraphStyle = selectedStyle;
                app.findGrepPreferences.findWhat = ".+"; // Find any content

                // Set up change preferences to apply the same style
                app.changeGrepPreferences.appliedParagraphStyle = selectedStyle;
                app.changeGrepPreferences.changeTo = "$0"; // Keep the same content

                // Perform the find/replace operation
                var changedItems = doc.changeGrep();

                // Clear preferences
                app.findGrepPreferences = NothingEnum.nothing;
                app.changeGrepPreferences = NothingEnum.nothing;

                // Show results
                var message = "Style refresh completed!\n\n";
                message += "Style: " + selectedStyleName + "\n";
                message += "Paragraphs refreshed: " + changedItems.length;

                if (changedItems.length === 0) {
                    message += "\n\nNo paragraphs found with this style.";
                } else {
                    message += "\n\nAll formatting has been refreshed based on the current style definition.";
                }

                dialog.close();
                alert(message);

            } catch (error) {
                progressPanel.visible = false;
                dialog.layout.layout(true);
                alert("Error refreshing style: " + error.message);

                // Clear preferences in case of error
                app.findGrepPreferences = NothingEnum.nothing;
                app.changeGrepPreferences = NothingEnum.nothing;
            }
        };

        cancelButton.onClick = function () {
            dialog.close();
        };

        // Handle window close
        dialog.onClose = function () {
            // Clear any find/change preferences
            try {
                app.findGrepPreferences = NothingEnum.nothing;
                app.changeGrepPreferences = NothingEnum.nothing;
            } catch (e) {
                // Ignore errors when clearing preferences
            }
        };

        // Show the dialog
        dialog.show();

    } catch (error) {
        alert("Error: " + error.message);
        $.writeln("Error details: " + error.toString());
    }
})();