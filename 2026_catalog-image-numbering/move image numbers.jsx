// Move image numbers
// Moves all the frames on the layer "Image numbers" (made by "add number to images.jsx")
// by the same distance, on every page of the document, in one undo step.
// Positive values move right / down, negative values move left / up.

var LAYER_NAME = "Image numbers";

(function () {
    if (app.documents.length === 0) {
        alert("Open a document first.");
        return;
    }

    var doc = app.activeDocument;
    var layer = doc.layers.itemByName(LAYER_NAME);
    if (!layer.isValid || layer.pageItems.length === 0) {
        alert("No frames found on layer '" + LAYER_NAME + "'.");
        return;
    }

    var offset = askOffset();
    if (!offset) return;
    if (offset[0] === 0 && offset[1] === 0) return;

    app.doScript(function () { main(doc, layer, offset); }, ScriptLanguage.JAVASCRIPT,
        undefined, UndoModes.ENTIRE_SCRIPT, "Move image numbers");
})();

function main(doc, layer, offset) {
    var vp = doc.viewPreferences;
    var oldH = vp.horizontalMeasurementUnits;
    var oldV = vp.verticalMeasurementUnits;
    var oldLocked = layer.locked;

    try {
        vp.horizontalMeasurementUnits = MeasurementUnits.POINTS;
        vp.verticalMeasurementUnits = MeasurementUnits.POINTS;
        layer.locked = false;

        var items = layer.pageItems.everyItem().getElements();
        var moved = 0;
        var skipped = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i].locked) {
                skipped++;
                continue;
            }
            items[i].move(undefined, offset);
            moved++;
        }

        alert(moved + " frames moved." + (skipped ? "\n" + skipped + " locked frames were not moved." : ""));
    } finally {
        layer.locked = oldLocked;
        vp.horizontalMeasurementUnits = oldH;
        vp.verticalMeasurementUnits = oldV;
    }
}

// Returns [horizontal, vertical] in points, or null if cancelled
function askOffset() {
    var dialog = app.dialogs.add({ name: "Move image numbers" });
    var hBox, vBox;
    with (dialog.dialogColumns.add()) {
        with (dialogRows.add()) {
            staticTexts.add({ staticLabel: "Horizontal (+ right, - left):", minWidth: 170 });
            hBox = measurementEditboxes.add({ editValue: 0, editUnits: MeasurementUnits.MILLIMETERS,
                minimumValue: -10000, maximumValue: 10000 });
        }
        with (dialogRows.add()) {
            staticTexts.add({ staticLabel: "Vertical (+ down, - up):", minWidth: 170 });
            vBox = measurementEditboxes.add({ editValue: 0, editUnits: MeasurementUnits.MILLIMETERS,
                minimumValue: -10000, maximumValue: 10000 });
        }
    }

    var result = null;
    if (dialog.show()) {
        result = [hBox.editValue, vBox.editValue]; // measurement edit boxes return points
    }
    dialog.destroy();
    return result;
}
