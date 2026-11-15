// Make selected frame the width of the first column
// Select a frame (or place the cursor in its text) and run.
// Reads the margins, column count and gutter of the page the frame is on
// and resizes the frame to fit exactly in the first column (top/bottom unchanged).

(function () {
    if (app.documents.length === 0) {
        alert("Open a document first.");
        return;
    }
    if (app.selection.length !== 1) {
        alert("Select one frame.");
        return;
    }

    var frame = getFrame(app.selection[0]);
    if (!frame) {
        alert("Selection is not a frame.");
        return;
    }
    if (!frame.parentPage) {
        alert("The frame is not on a page (pasteboard).");
        return;
    }

    app.doScript(function () { main(frame); }, ScriptLanguage.JAVASCRIPT,
        undefined, UndoModes.ENTIRE_SCRIPT, "Frame width first column");
})();

function main(frame) {
    var doc = app.activeDocument;
    var vp = doc.viewPreferences;
    var oldH = vp.horizontalMeasurementUnits;
    var oldV = vp.verticalMeasurementUnits;
    var oldOrigin = vp.rulerOrigin;

    try {
        vp.horizontalMeasurementUnits = MeasurementUnits.POINTS;
        vp.verticalMeasurementUnits = MeasurementUnits.POINTS;
        vp.rulerOrigin = RulerOrigin.SPREAD_ORIGIN;

        var page = frame.parentPage;
        var mp = page.marginPreferences; // page settings (inherit from master/document unless overridden)
        var pb = page.bounds;             // [top, left, bottom, right]
        var pageWidth = pb[3] - pb[1];

        // With facing pages, "left" is the inside margin, which is on the right of a left-hand page
        var marginLeft = mp.left;
        var marginRight = mp.right;
        if (doc.documentPreferences.facingPages && page.side === PageSideOptions.LEFT_HAND) {
            marginLeft = mp.right;
            marginRight = mp.left;
        }

        var columns = mp.columnCount;
        var gutter = mp.columnGutter;
        var colWidth = (pageWidth - marginLeft - marginRight - gutter * (columns - 1)) / columns;
        if (colWidth <= 0) {
            alert("Column width is invalid. Check the page margins and columns.");
            return;
        }

        var b = frame.geometricBounds;
        var left = pb[1] + marginLeft;
        frame.geometricBounds = [b[0], left, b[2], left + colWidth];
    } finally {
        vp.horizontalMeasurementUnits = oldH;
        vp.verticalMeasurementUnits = oldV;
        vp.rulerOrigin = oldOrigin;
    }
}

function getFrame(sel) {
    if (sel instanceof TextFrame || sel instanceof Rectangle ||
        sel instanceof Oval || sel instanceof Polygon) return sel;
    try {
        if (sel.parentTextFrames.length > 0) return sel.parentTextFrames[0];
    } catch (e) {}
    return null;
}
