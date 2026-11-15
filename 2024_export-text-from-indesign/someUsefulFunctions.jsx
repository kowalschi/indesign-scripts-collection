

var w = new Window("dialog");
w.alignChildren = "left";
w.orientation = "column";
// w.alignChildren = "top";
var check1 = w.add("checkbox", undefined, "remove Duplicate Graphics");
var check8 = w.add("checkbox", undefined, "Remove duplicate from selected image");
var check2 = w.add("checkbox", undefined, "remove A TextFrame Which Start With a Word");
var myText = w.add("edittext", undefined, "valabilitate");
myText.characters = 20;
var check3 = w.add("checkbox", undefined, "remove A TextFrame Which Start With any Number and a specific Word");
var myTextwithNumber = w.add("edittext", undefined, "spălări");
myTextwithNumber.characters = 20;
var check4 = w.add("checkbox", undefined, "remove Graphics with Three Times Duplicate");
var check5 = w.add("checkbox", undefined, "remove a Graphic with a specific name");
var myGraphicName = w.add("edittext", undefined, "name of graphic");
myGraphicName.characters = 20;
var check6 = w.add("checkbox", undefined, "addcolor");
var myColorGroup = w.add("group");
// myButtonGroup.orientation = "column";
myColorGroup.alignment = "left";
var myColorName = myColorGroup.add("edittext", undefined, "my color name");
myColorName.characters = 20;
myColorGroup.add('statictext {text: "Enter a numbers for cmyk value:"}');
var myColorC = myColorGroup.add("edittext", undefined, "0");
myColorC.characters = 5;
var myColorM = myColorGroup.add("edittext", undefined, "0");
myColorM.characters = 5;
var myColorY = myColorGroup.add("edittext", undefined, "0");
myColorY.characters = 5;
var myColorB = myColorGroup.add("edittext", undefined, "50");
myColorB.characters = 5;
var check7 = w.add("checkbox", undefined, "Autosizing text Height and Width"); //AutoSizingTypeEnum.HEIGHT_AND_WIDTH

var check9 = w.add("checkbox", undefined, "Remove embeded images");



var myButtonGroup = w.add("group");
// myButtonGroup.orientation = "column";
myButtonGroup.alignment = "right";
myButtonGroup.add("button", undefined, "OK");
myButtonGroup.add("button", undefined, "Cancel");

// w.add("button", undefined, "OK");
// w.add("button", undefined, "Cancel");
w.show();
if (check9.value == true) {
    // alert("check1.value")
    // removeSelectedImage()
    removeEmbeded()
}
function removeEmbeded() {
    var doc = app.activeDocument;
    var graphics = doc.allGraphics;
    var embeddedGraphics = [];
    // app.select(graphics[0])
    // if (graphics[0].itemLink == null) {
    //     alert("nulll")
    //     graphics[0].parent.remove()
    // }
    // for (var i = graphics.length - 1; i >= 0; i--) {
    for (var i = 0; i < graphics.length; i++) {
        // graphics[i].itemLink.status == LinkStatus.LINK_EMBEDDED         || 
        if (graphics[i].itemLink == null) {
            // graphics[i].parent.remove() // error - is mai multe imagini intr un rectangle si da eroare, dupa ce sterge
            graphics[i].remove()

        }
    }
}
if (check8.value == true) {
    // alert("check1.value")
    // removeSelectedImage()
    removeDuplicateFromSelectedImage()
}
function removeDuplicateFromSelectedImage() {

    var tf = app.selection[0];
    var imageName = tf.graphics[0].itemLink.name;
    var doc = app.activeDocument;
    var specificName = imageName;
    var links = doc.links;
    var link, image;
    for (var i = links.length - 1; i >= 0; i--) {
        if (links[i].hasOwnProperty('relink')) {
            try {
                link = links[i];
                image = link.parent.parent;
                imageName = link.name;
                // alert(imageName)
                if (imageName == specificName) {
                    image.remove();
                }
                // image.remove();
                // counter++;
            }
            catch (err) {
                // $.writeln(i + " - " + err);
                // alert(i + " - " + err);
            }
        }
    }


}

function removeSelectedImage() {
    // AutoSizingTypeEnum.HEIGHT_AND_WIDTH
    var tf = app.selection[0];
    var imageName = tf.graphics[0].itemLink.name;
    // Get the active document
    var doc = app.activeDocument;
    var specificName = imageName;
    // alert(imageName)

    var Mypage = tf.parentPage.name

    try {
        // Iterate through all graphics in the document // this backward itteration is not changing the indices of collection!!!!
        for (var i = doc.allGraphics.length - 1; i >= 0; i--) {
            var graphic = doc.allGraphics[i];

            // Check if the graphic name matches the specific name
            if (graphic.itemLink.name == specificName) {
                // If it matches, remove the graphic
                graphic.parent.remove();
                // graphic.remove();
            }
        }


    } catch (e) { alert(e + "\nerror at line: " + e.line) }// + "\nat page:" + Mypage
}
if (check7.value == true) {
    // alert("check1.value")
    autosizingText()
}
function autosizingText() {
    // AutoSizingTypeEnum.HEIGHT_AND_WIDTH
    var tf = app.selection[0];

    var props =
    {
        autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_LEFT_POINT,//TOP_CENTER_POINT, TOP_LEFT_POINT
        autoSizingType: AutoSizingTypeEnum.WIDTH_ONLY,//AutoSizingTypeEnum.HEIGHT_AND_WIDTH, //AutoSizingTypeEnum.WIDTH_ONLY
        useNoLineBreaksForAutoSizing: false,
        verticalJustification: VerticalJustification.TOP_ALIGN
    };

    tf.textFramePreferences.properties = props;
}
if (check1.value == true) {
    // alert("check1.value")
    removeGrapicsDuplicate()
}
if (check2.value == true) {
    // alert("check2.value")
    removeATextFrameWhichStartWithaWord(myText)
}
if (check3.value == true) {
    // alert("check3.value")
    removeATextFrameWhichStartWithANumbeAndAWord(myTextwithNumber)
}
if (check4.value == true) {
    // alert("check4.value")
    removeGrapicsThreeTimesDuplicate()
}
if (check5.value == true) {
    // alert("check5.value")
    removeGrapicsWithName(myGraphicName)
}
if (check6.value == true) {
    // alert("check6.value")
    addcolor(myColorName, myColorC, myColorM, myColorY, myColorB)
}
// removeGrapicsDuplicate()
// removeATextFrameWhichStartWithaWord()
// removeGrapicsThreeTimesDuplicate()
// removeGrapicsWithName()
// addcolor()



// removeATextFrameWhichStartWithANumbeAndAWord()



function removeATextFrameWhichStartWithANumbeAndAWord(myTextwithNumber) { // 20 spalari
    var keyWord = myTextwithNumber.text;
    // var keyWord = "spălări";

    // Get the active document
    var doc = app.activeDocument;

    // Define a regular expression pattern to match a number followed by "spalari"
    // var pattern = /^[0-9]+\s*spălări/i;
    // Define a regular expression pattern to match a number followed by the specific word
    var pattern = new RegExp("^\\d+\\s+" + keyWord, "i");

    // Iterate through all text frames in the document
    for (var i = doc.textFrames.length - 1; i >= 0; i--) {
        var textFrame = doc.textFrames[i];

        // Check if the text frame's content matches the pattern
        if (pattern.test(textFrame.contents)) {
            // Remove the text frame
            textFrame.remove();
        }
    }

}


function removeATextFrameWhichStartWithaWord(myText) { //valabilitate

    // var keyWord = "valabilitate";
    var keyWord = myText.text

    // Get the active document
    var doc = app.activeDocument;

    // Iterate through all text frames in the document
    for (var i = doc.textFrames.length - 1; i >= 0; i--) {
        var textFrame = doc.textFrames[i];

        // Check if the text frame's content starts with "valabilitate"
        if (textFrame.contents.indexOf(keyWord) === 0) {
            // Remove the text frame
            textFrame.remove();
        }
    }
    alert("done")

}


function removeGrapicsThreeTimesDuplicate() {
    // Get the active document
    var doc = app.activeDocument;

    // Create an object to store graphic names and their occurrences
    var graphicNames = {};

    // Iterate through all graphics in the document
    for (var i = 0; i < doc.allGraphics.length; i++) {
        var graphic = doc.allGraphics[i];

        // Get the name of the graphic
        var graphicName = graphic.itemLink.name;

        // Count the occurrences of the graphic name
        if (graphicNames[graphicName]) {
            graphicNames[graphicName]++;
        } else {
            graphicNames[graphicName] = 1;
        }
    }

    // Iterate through the graphic names
    for (var name in graphicNames) {
        // Check if the name has more than three occurrences
        if (graphicNames[name] > 3) {
            // Remove the graphics with this name
            for (var i = 0; i < doc.allGraphics.length; i++) {
                var graphic = doc.allGraphics[i];
                if (graphic.itemLink.name === name) {
                    graphic.parent.remove();
                }
            }
        }
    }

}

function removeGrapicsWithName(myGraphicName) {
    var specificName = myGraphicName.text;
    // Get the active document
    // var nameOfGraphic = "example_image.jpg";
    var doc = app.activeDocument;

    // Define the specific graphic name
    // var specificName = "specificname"; // Replace "specificname" with your specific graphic name

    // Create an object to store graphic names and their occurrences
    var graphicNames = {};

    // Iterate through all graphics in the document // this backward itteration is not changing the indices of collection!!!!
    for (var i = doc.allGraphics.length - 1; i >= 0; i--) {
        var graphic = doc.allGraphics[i];

        // Check if the graphic name matches the specific name
        if (graphic.itemLink.name === specificName) {
            // If it matches, remove the graphic
            // graphic.remove();
            graphic.parent.remove();
        }
    }



}

function removeGrapicsDuplicate() {
    // Get the active document
    var doc = app.activeDocument;

    // Create an object to store graphic names and their occurrences
    var graphicNames = {};

    // Iterate through all graphics in the document
    // for (var i = 0; i < doc.allGraphics.length; i++) {
    try {
        for (var i = doc.allGraphics.length - 1; i >= 0; i--) {
            var graphic = doc.allGraphics[i];

            // Get the name of the graphic
            var graphicName = graphic.itemLink.name;
            var Mypage = graphic.parent.parentPage.name

            // Check if the graphic name already exists in the object
            if (graphicNames[graphicName]) {
                // If it exists, delete the duplicate graphic
                // graphic.remove();
                graphic.parent.remove();
            } else {
                // If it doesn't exist, add it to the object
                graphicNames[graphicName] = true;
            }
        }
    } catch (e) { alert(e + "\nerror at line: " + e.line + "\nat page:" + Mypage) }

}

function addcolor(myColorName, myColorC, myColorM, myColorY, myColorB) {

    var c = Number(myColorC.text)
    var m = Number(myColorM.text)
    var y = Number(myColorY.text)
    var b = Number(myColorB.text)
    var MyColorName = myColorName.text

    try {
        var newColor = app.activeDocument.colors.add({
            name: MyColorName, // Name of the color
            model: ColorModel.PROCESS, // Color model (PROCESS or SPOT)
            // colorValue: [0, 0, 0, 55], // CMYK or RGB values
            colorValue: [c, m, y, b], // CMYK or RGB values
        });
    }
    catch (e) { alert(e) }
}