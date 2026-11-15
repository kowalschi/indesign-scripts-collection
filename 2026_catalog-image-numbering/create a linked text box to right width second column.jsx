// Create a linked text box to the right (second column, same width)
// Select a text frame (or place the cursor in its text) and run.
// A new frame with the same width/height is created to the right,
// separated by the column gutter, and threaded after the selected frame.


(function () {
    if (app.documents.length === 0) {
        alert("Open a document first.");
        return;
    }
    if (app.selection.length !== 1) {
        alert("Select one text frame.");
        return;
    }

    var frame = getTextFrame(app.selection[0]);
    if (!frame) {
        alert("Selection is not a text frame.");
        return;
    }

    app.doScript(function () { main(frame); }, ScriptLanguage.JAVASCRIPT,
        undefined, UndoModes.ENTIRE_SCRIPT, "Linked text box to right");
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

        var gutter = getGutter(doc, frame);
        var b = frame.geometricBounds; // [top, left, bottom, right]
        var width = b[3] - b[1];
        var left = b[3] + gutter;

        var container = frame.parentPage ? frame.parentPage : frame.parent;
        var newFrame = container.textFrames.add(frame.itemLayer, {
            geometricBounds: [b[0], left, b[2], left + width]
        });

        try { newFrame.appliedObjectStyle = frame.appliedObjectStyle; } catch (e) {}
        copyFramePrefs(frame, newFrame);
        newFrame.geometricBounds = [b[0], left, b[2], left + width];

        // Thread: frame -> newFrame -> (previous next frame, if any)
        var oldNext = frame.nextTextFrame;
        frame.nextTextFrame = newFrame;
        if (oldNext) newFrame.nextTextFrame = oldNext;

        app.select(newFrame);
    } finally {
        vp.horizontalMeasurementUnits = oldH;
        vp.verticalMeasurementUnits = oldV;
        vp.rulerOrigin = oldOrigin;
    }
}

function getTextFrame(sel) {
    if (sel instanceof TextFrame) return sel;
    try {
        if (sel.parentTextFrames.length > 0) return sel.parentTextFrames[0];
    } catch (e) {}
    return null;
}

function getGutter(doc, frame) {
    // Prefer the page's column gutter, then the frame's own gutter, then the document default
    try {
        if (frame.parentPage) return frame.parentPage.marginPreferences.columnGutter;
    } catch (e) {}
    try { return frame.textFramePreferences.textColumnGutter; } catch (e) {}
    return doc.marginPreferences.columnGutter;
}

function copyFramePrefs(src, dst) {
    var props = ["textColumnCount", "textColumnGutter", "insetSpacing",
        "verticalJustification", "firstBaselineOffset", "minimumFirstBaselineOffset",
        "ignoreWrap", "autoSizingType"];
    var sp = src.textFramePreferences;
    var dp = dst.textFramePreferences;
    for (var i = 0; i < props.length; i++) {
        try { dp[props[i]] = sp[props[i]]; } catch (e) {}
    }
    // try { dst.fillColor = src.fillColor; } catch (e) {}
    // try { dst.strokeColor = src.strokeColor; } catch (e) {}
    // try { dst.strokeWeight = src.strokeWeight; } catch (e) {}
}
