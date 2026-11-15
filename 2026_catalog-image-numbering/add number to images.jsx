// Add number to images
// Numbers every placed image on the layer "images with text" (in page order, then top-to-bottom,
// left-to-right on each page) and puts the number below the image, aligned to its right edge.
// The numbers go on their own layer ("Image numbers"), styled with the 'image_number'
// paragraph style (or character style) found in the document. The number frames get the
// object style 'object_image_number' (created if missing: no fill, no stroke, no insets).
// Each number has a prefix "###" in very small white text, so it can later be
// replaced (Find/Change) with whatever the client wants in front of the number.
// Running it again removes the old numbers from the layer and renumbers.

var FRAME_WIDTH_MM = 21;  // width of the number frame
var FRAME_HEIGHT_MM = 15; // height of the number frame
var GAP_MM = 3;           // distance between the bottom of the image and the number frame

var LAYER_NAME = "Image numbers";
var IMAGES_LAYER_NAME = "images with text"; // only images on this layer are numbered
var STYLE_NAME = "image_number";
var OBJECT_STYLE_NAME = "object_image_number";
var PREFIX = "###";
var PREFIX_STYLE_NAME = "image_number_prefix"; // created if missing: white, very small
var PREFIX_SIZE = 2;      // points

var MM = 72 / 25.4;       // points in 1 mm
var FRAME_WIDTH = FRAME_WIDTH_MM * MM;
var FRAME_HEIGHT = FRAME_HEIGHT_MM * MM;
var GAP = GAP_MM * MM;
var ROW_TOLERANCE = 5;    // points: images whose tops differ less than this count as one row

(function () {
    if (app.documents.length === 0) {
        alert("Open a document first.");
        return;
    }

    var doc = app.activeDocument;
    if (!doc.layers.itemByName(IMAGES_LAYER_NAME).isValid) {
        alert("Layer '" + IMAGES_LAYER_NAME + "' was not found in the document.");
        return;
    }
    var paraStyle = findStyle(doc.allParagraphStyles, STYLE_NAME);
    var charStyle = paraStyle ? null : findStyle(doc.allCharacterStyles, STYLE_NAME);
    if (!paraStyle && !charStyle) {
        alert("Style '" + STYLE_NAME + "' was not found in the document.");
        return;
    }

    var start = prompt("Start numbering from:", "1", "Add number to images");
    if (start === null) return;
    start = parseInt(start, 10);
    if (isNaN(start)) {
        alert("The start number is not valid.");
        return;
    }

    app.doScript(function () { main(doc, paraStyle, charStyle, start); }, ScriptLanguage.JAVASCRIPT,
        undefined, UndoModes.ENTIRE_SCRIPT, "Add number to images");
})();

function main(doc, paraStyle, charStyle, start) {
    var vp = doc.viewPreferences;
    var oldH = vp.horizontalMeasurementUnits;
    var oldV = vp.verticalMeasurementUnits;
    var oldOrigin = vp.rulerOrigin;

    try {
        vp.horizontalMeasurementUnits = MeasurementUnits.POINTS;
        vp.verticalMeasurementUnits = MeasurementUnits.POINTS;
        vp.rulerOrigin = RulerOrigin.SPREAD_ORIGIN;

        var items = collectImages(doc);
        if (items.length === 0) {
            alert("No images found on layer '" + IMAGES_LAYER_NAME + "'.");
            return;
        }

        var layer = getLayer(doc);
        var prefixStyle = getPrefixStyle(doc);
        var objectStyle = getObjectStyle(doc);

        for (var i = 0; i < items.length; i++) {
            addNumber(items[i], layer, objectStyle, paraStyle, charStyle, prefixStyle, start + i);
        }

        alert(items.length + " images numbered (" + start + " - " + (start + items.length - 1) + ").");
    } finally {
        vp.horizontalMeasurementUnits = oldH;
        vp.verticalMeasurementUnits = oldV;
        vp.rulerOrigin = oldOrigin;
    }
}

// Image frames on document pages (not masters, not pasteboard), sorted in reading order
function collectImages(doc) {
    var graphics = doc.allGraphics;
    var items = [];
    for (var i = 0; i < graphics.length; i++) {
        var frame = graphics[i].parent;
        var page = frame.parentPage;
        if (!page || page.parent instanceof MasterSpread) continue;
        if (frame.itemLayer.name !== IMAGES_LAYER_NAME) continue;
        var b = frame.visibleBounds; // [top, left, bottom, right]
        items.push({ frame: frame, page: page, pageIndex: page.documentOffset, bounds: b });
    }

    items.sort(function (a, b) {
        if (a.pageIndex !== b.pageIndex) return a.pageIndex - b.pageIndex;
        if (Math.abs(a.bounds[0] - b.bounds[0]) > ROW_TOLERANCE) return a.bounds[0] - b.bounds[0];
        return a.bounds[1] - b.bounds[1];
    });
    return items;
}

function addNumber(item, layer, objectStyle, paraStyle, charStyle, prefixStyle, number) {
    var b = item.bounds;
    var tf = item.page.textFrames.add(layer, undefined, undefined, {
        geometricBounds: [b[2] + GAP, b[3] - FRAME_WIDTH, b[2] + GAP + FRAME_HEIGHT, b[3]]
    });
    tf.applyObjectStyle(objectStyle, true);

    tf.contents = PREFIX + number;

    var text = tf.parentStory.texts[0];
    if (paraStyle) {
        text.applyParagraphStyle(paraStyle, true);
    } else {
        text.applyCharacterStyle(charStyle);
    }
    tf.parentStory.characters.itemByRange(0, PREFIX.length - 1).applyCharacterStyle(prefixStyle);
}

// Object style for the number frames: no fill, no stroke, no insets, ignore wrap, no auto-size
function getObjectStyle(doc) {
    var style = findStyle(doc.allObjectStyles, OBJECT_STYLE_NAME);
    if (!style) {
        style = doc.objectStyles.add({ name: OBJECT_STYLE_NAME });
        style.enableFill = true;
        style.enableStroke = true;
        style.enableTextFrameGeneralOptions = true;
        style.fillColor = doc.swatches.itemByName("None");
        style.strokeColor = doc.swatches.itemByName("None");
        style.strokeWeight = 0;
        var prefs = style.textFramePreferences;
        prefs.insetSpacing = [0, 0, 0, 0];
        prefs.ignoreWrap = true;
        prefs.verticalJustification = VerticalJustification.TOP_ALIGN;
    }
    // The number frames keep their fixed size: no auto-size, also in a style made by an earlier run
    style.enableTextFrameAutoSizingOptions = true;
    style.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;
    return style;
}

// Number layer on top; old numbers on it are removed so the script can be run again
function getLayer(doc) {
    var layer = doc.layers.itemByName(LAYER_NAME);
    if (layer.isValid) {
        layer.locked = false;
        layer.visible = true;
        var old = layer.pageItems.everyItem().getElements();
        for (var i = old.length - 1; i >= 0; i--) {
            try { old[i].locked = false; old[i].remove(); } catch (e) {}
        }
    } else {
        layer = doc.layers.add({ name: LAYER_NAME });
    }
    layer.move(LocationOptions.AT_BEGINNING);
    return layer;
}

function getPrefixStyle(doc) {
    var style = findStyle(doc.allCharacterStyles, PREFIX_STYLE_NAME);
    if (!style) {
        style = doc.characterStyles.add({
            name: PREFIX_STYLE_NAME,
            fillColor: doc.swatches.itemByName("Paper"),
            pointSize: PREFIX_SIZE
        });
    }
    return style;
}

function findStyle(styles, name) {
    for (var i = 0; i < styles.length; i++) {
        if (styles[i].name === name) return styles[i];
    }
    return null;
}
