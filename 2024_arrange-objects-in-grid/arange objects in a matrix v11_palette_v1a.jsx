#targetengine "test30oct1106";

/*
     
    Arrange selected objects in a grid/matrix 
    2024
	
    (c) Dan Ichimescu 2024
    (constantindan@gmail.com)
    	
    	
*/


// DEFAULT VARIABLE // 10 mm * 2.83464567 = points;

var defmarginL = 10;
var defmarginR = 10;
var defGuttCol = 5;
var defGuttRow = 5;
var heighttext = 22;
var heighttext2 = 22;
var widthtext = 45;

if (!(app.documents[0].isValid)) {

  alert("Open a document and select some objects!")
  exit()
}
app.documents[0].zeroPoint = [0, 0];
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;

var sp = app.scriptPreferences.measurementUnit;
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;

// var main = function () {
// Get the active document 
var doc = app.activeDocument;

var myArrayWithElements = [];


//result variables
var noFilltoMargin, tofirsttop, col, columns, row, xgut, ygut, margintopleftx, margintoplefty, fillmargins, filledge, myGridOnPage, marginOfPage, edgeOfPage;
var contorclick = 0;
// check selection
if (app.activeDocument.selection.length > 1 && doc.selection[0].parentPage != null) {
  // var arrCheckLength = app.activeDocument.selection.length
  var win = createDialog();
  win.show();
} else {
  alert("Please Select Some Objects.");
  exit()
}



// var win = createDialog();
// win.show();

// dialog

function createDialog() {
  var mw = 90;


  // ALIGNOBJECTSTOGRIDV1
  // ====================
  var w = new Window("palette"); //palette  dialog
  w.text = "Align objects to grid v11 v1";
  w.orientation = "row";
  w.alignChildren = ["center", "top"];
  w.spacing = 20;
  w.margins = 12;

  // GRUP
  // ====
  var grup = w.add("group", undefined, { name: "grup" });
  grup.orientation = "row";
  grup.alignChildren = ["left", "center"];
  grup.spacing = 10;
  grup.margins = 0;

  // PANEL1
  // ======
  var panel1 = grup.add("panel", undefined, undefined, { name: "panel1" });
  panel1.orientation = "column";
  panel1.alignChildren = ["left", "top"];
  panel1.spacing = 10;
  panel1.margins = 10;

  var statictext1 = panel1.add("statictext", undefined, undefined, { name: "Margin left" });
  statictext1.text = "Margin left (mm)";
  statictext1.alignment = ["left", "top"];
  statictext1.preferredSize.height = heighttext;

  var statictext2 = panel1.add("statictext", undefined, undefined, { name: "Margin right" });
  statictext2.text = "Margin right (mm)";
  statictext2.alignment = ["left", "top"];
  statictext2.preferredSize.height = heighttext;

  var statictext3 = panel1.add("statictext", undefined, undefined, { name: "Columns" });
  statictext3.text = "Columns";
  statictext3.preferredSize.height = heighttext;

  var statictext4 = panel1.add("statictext", undefined, undefined, { name: "Column Gutter" });
  statictext4.text = "Column Gutter (mm)";
  statictext4.preferredSize.height = heighttext;

  var statictext5 = panel1.add("statictext", undefined, undefined, { name: "Row gutter" });
  statictext5.text = "Row gutter (mm)";
  statictext5.preferredSize.height = heighttext;

  var divider1 = panel1.add("panel", undefined, undefined, { name: "divider1" });
  divider1.alignment = "fill";

  var statictext6 = panel1.add("statictext", undefined, undefined, { name: "Arrange in grid to page" });
  statictext6.text = "Arrange in grid to page ";
  var statictext7 = panel1.add("statictext", undefined, undefined, { name: "Arrange in grid to page" });
  statictext7.text = "or first top left selected?";

  var b_marginNo = panel1.add("radiobutton", undefined, undefined, { name: "no to margin Of Page" });
  b_marginNo.text = "No";
  b_marginNo.value = true;

  var b_marginOfPage = panel1.add("radiobutton", undefined, undefined, { name: "to margin Of Page" });
  b_marginOfPage.text = "Yes, Fill to margin of page";

  var b_edgeOfPage = panel1.add("radiobutton", undefined, undefined, { name: "to edge Of Page" });
  b_edgeOfPage.text = "Yes, Fill to edge of page";

  // var divider2 = panel1.add("panel", undefined, undefined, { name: "divider1" });
  // divider2.alignment = "fill";

  // var statictext7 = panel1.add("statictext", undefined, undefined, { name: "Arrange in grid to page" });
  // statictext7.text = "Arrange relative to first top left object?";

  var b_tofirsttop = panel1.add("radiobutton", undefined, undefined, { name: "to fist topleft obj" });
  b_tofirsttop.text = "Yes, to first top left object?";
  // b_tofirsttop.value = true;

  // GROUP1
  // ======
  var group1 = w.add("group", undefined, { name: "group1" });
  group1.orientation = "row";
  group1.alignChildren = ["left", "center"];
  group1.spacing = 10;
  group1.margins = 0;

  // PANEL2
  // ======
  var panel2 = group1.add("panel", undefined, undefined, { name: "panel2" });
  panel2.orientation = "column";
  panel2.alignChildren = ["left", "top"];
  panel2.spacing = 10;
  panel2.margins = 10;

  var mx = panel2.add('edittext {properties: {name: "margine stanga"}}');
  // mx.text = convert_units(defmarginL + "mm", documentUnits());
  mx.text = defmarginL;
  mx.preferredSize.width = widthtext;
  mx.preferredSize.height = heighttext2;

  var my = panel2.add('edittext {properties: {name: "margine dreapta"}}');
  // my.text = convert_units(defmarginR + "mm", documentUnits());
  my.text = defmarginR;
  my.preferredSize.width = widthtext;
  my.preferredSize.height = heighttext2;

  var nCol = panel2.add('edittext {properties: {name: "coloane"}}');
  nCol.text = "5";
  nCol.preferredSize.width = widthtext;
  nCol.preferredSize.height = heighttext2;

  var colGutter = panel2.add('edittext {properties: {name: "column gutter"}}');
  // colGutter.text = convert_units(defGuttCol + "mm", documentUnits());
  colGutter.text = defGuttCol;
  colGutter.preferredSize.width = widthtext;
  colGutter.preferredSize.height = heighttext2;

  var rowGutter = panel2.add('edittext {properties: {name: "row gutter"}}');
  // rowGutter.text = convert_units(defGuttRow + "mm", documentUnits());
  rowGutter.text = defGuttRow;
  rowGutter.preferredSize.width = widthtext;
  colGutter.preferredSize.height = heighttext2;

  // GROUP2

  w.buttons = w.add('group {orientation:"column"}');
  var arrange = w.buttons.add('button {text: "Arrange", enabled: true}');
  var undo = w.buttons.add('button {text: "Undo", enabled: true}')
  var exitbt = w.buttons.add('button {text: "Exit", enabled: true}')


  mx.addEventListener("keydown", function (k) { handle_key(k, this); });
  my.addEventListener("keydown", function (k) { handle_key(k, this); });
  nCol.addEventListener("keydown", function (k) { handle_key(k, this); });
  colGutter.addEventListener("keydown", function (k) { handle_key(k, this); });
  rowGutter.addEventListener("keydown", function (k) { handle_key(k, this); });

  arrange.onClick = function () {

    app.doScript(function () {
      noFilltoMargin = b_marginNo.value
      marginOfPage = b_marginOfPage.value
      edgeOfPage = b_edgeOfPage.value
      tofirsttop = b_tofirsttop.value
      // myGridOnPage = myRangeButtons.selectedButton;

      margintopleftx = parseFloat(mx.text) * 2.8346456692;
      margintoplefty = parseFloat(my.text) * 2.8346456692;
      columns = parseFloat(nCol.text);
      // row = nRow.editValue;
      xgut = parseFloat(colGutter.text) * 2.8346456692;
      ygut = parseFloat(rowGutter.text) * 2.8346456692;

      arrangeObjectSelected(margintopleftx, margintoplefty, columns, xgut, ygut);

    }, ScriptLanguage.javascript, undefined, UndoModes.ENTIRE_SCRIPT, "arrangeObjectSelected");
  }

  undo.onClick = function () {
    app.activeDocument.undo();

  }

  exitbt.onClick = function () { w.close() }
  w.onClose = function () {
    w.close();
    exit();
  }
  return w;
}
/////-------------------->



function arrangeObjectSelected(margintopleftx, margintoplefty, columns, xgut, ygut) {
  // myAllSelected = []
  var myAllSelected = app.activeDocument.selection;

  // alert(contorclick + "\n" + myArrayWithElements.length + "\n" + myAllSelected.length) //+"\n"+myAllSelected.length
  if (contorclick >= 1) {

    myArrayWithElements = []

    // alert(contorclick + "\n" + myArrayWithElements.length + "\n" + myAllSelected.length) //+"\n"+myAllSelected.length
    // exit()
  }

  /// start create ordered array with selected objects

  var currentElement = findTopLeftElement(myAllSelected);

  while (currentElement) {

    myArrayWithElements.push(currentElement);

    var newArray = [];
    for (var i = 0; i < myAllSelected.length; i++) {
      if (myAllSelected[i] !== currentElement) {//&& currentElement !== null
        newArray.push(myAllSelected[i]);
      }
    }
    myAllSelected = newArray;

    var nextElement = findClosestRightElement(currentElement, myAllSelected);

    // If no right element is found, go to the closest element below the starting element in the new row
    if (!nextElement) { // && myAllSelected.length <= arrCheckLength

      if (myAllSelected.length > 0) {
        var closestToMarginLeft = findTopLeftElement(myAllSelected);
        nextElement = closestToMarginLeft;
      }
    }

    currentElement = nextElement; // Move to the next element in sequence

  }

  /// end create ordered array with selected objects



  /// get page proprieties

  var selPage = doc.selection[0].parentPage.documentOffset;
  var myPage = doc.pages[selPage];
  var pageSize = doc.pages[selPage].bounds;

  // b_pgebounds = selPage.bounds;

  var Wp = pageSize[3] - pageSize[1];
  var Hp = pageSize[2] - pageSize[0];
  var Wp_mm = (pageSize[3] - pageSize[1]) / 2.8346438836889;
  var Hp_mm = (pageSize[2] - pageSize[0]) / 2.8346438836889;
  // alert(Wp_mm + " " + Hp_mm)


  var m_left = myPage.marginPreferences.left; //mmyX2
  var m_right = myPage.marginPreferences.right; //mmyX1
  var m_top = myPage.marginPreferences.top; //mmyy2
  var m_bottom = myPage.marginPreferences.bottom; //mmyy1


  var WpMargins = Wp - (2 * m_left)
  var HpMargins = Hp - (2 * m_top)



  /// get page proprieties end



  // check if grid is on margins of page or edge of page
  if ((noFilltoMargin == true)) {
    arrangeongrid(margintopleftx, margintoplefty, columns, xgut, ygut)

  }
  if ((marginOfPage == true)) {
    // myGridOnPage = -1
    // alert(myGridOnPage + "\nFill to EDGE of page true myGridOnPage != 0") // ok
    // exit()

    margintopleftx = m_left;
    margintoplefty = m_right;

    arrangeongrid(margintopleftx, margintoplefty, columns, xgut, ygut)

  }
  if (edgeOfPage == true) {
    // alert(myGridOnPage + "\nFill to margin true - myGridOnPage 0")
    // exit()

    margintopleftx = 0;
    margintoplefty = 0;

    arrangeongrid(margintopleftx, margintoplefty, columns, xgut, ygut)

  }
  if (tofirsttop == true) {
    // alert(myGridOnPage + "\nFill to margin true - myGridOnPage 0")
    // exit()
    var a1 = myArrayWithElements[0].geometricBounds;
    // var w0 = a1[3] - a1[1]; //w
    // var h0 = a1[2] - a1[0]; //h
    margintopleftx = a1[1];
    margintoplefty = a1[0];

    arrangeongrid(margintopleftx, margintoplefty, columns, xgut, ygut)

  }

  // end check if grid is on margins of page or edge of page

  contorclick++
}

////----> Start the arrange


function arrangeongrid(margintopleftx, margintoplefty, columns, xgut, ygut) {

  // alert(margintopleftx)
  var xoff = margintopleftx; //x
  var yoff = margintoplefty; //y

  var startX = margintopleftx;


  myArrayWithElements[0].move([xoff, yoff]);

  var a = myArrayWithElements[0].geometricBounds;
  var w0 = a[3] - a[1]; //w
  var h0 = a[2] - a[0]; //h
  xoff = margintopleftx

  // exit()
  for (var i = 1; i < myArrayWithElements.length; i++) {
    var b = myArrayWithElements[i - 1].geometricBounds;
    var w = b[3] - b[1]; //w
    var h = b[2] - b[0]; //h

    if (i % columns > 0) {
      xoff = xoff + w + xgut;
    } else {
      xoff = startX;
      yoff = yoff + h + ygut;
    }
    myArrayWithElements[i].move([xoff, yoff]);
  }
}
app.scriptPreferences.measurementUnit = sp;


// calculate distance 
function distance(elementA, elementB) {
  var boundsA = elementA.geometricBounds;
  var boundsB = elementB.geometricBounds;
  var xA = boundsA[1], yA = boundsA[0];
  var xB = boundsB[1], yB = boundsB[0];
  return Math.sqrt(Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2));
}

// Find the top-left element as the starting point
function findTopLeftElement(elements) {

  var objSelection = elements;
  var arrXYSum = [];
  if (objSelection.length > 0) {
    for (var i = 0; i < objSelection.length; i++) {
      var b = objSelection[i].geometricBounds;
      // var w = b[3] - b[1]; //w
      // var h = b[2] - b[0]; //h
      var xplusy = b[0] + b[1]
      arrXYSum.push([xplusy, objSelection[i]])
    }
    // sort array for first element
    arrXYSum.sort(function (a, b) {
      return (a[0] - b[0])

    })
    var topLeftElement = arrXYSum[0][1]
    return topLeftElement;
  }


}
function findTopLeftElement_NotSoGood(elements) {
  var topLeftElement = elements[0];
  for (var i = 1; i < elements.length; i++) {
    var currentElement = elements[i];
    var currentBounds = currentElement.geometricBounds;
    var topLeftBounds = topLeftElement.geometricBounds;

    if (currentBounds[0] < topLeftBounds[0] ||
      (currentBounds[0] === topLeftBounds[0] && currentBounds[1] < topLeftBounds[1])) {
      topLeftElement = currentElement;
    }
  }
  return topLeftElement;
}

// Find the closest element to the right of a given element
function findClosestRightElement(currentElement, remainingElements) {
  var bounds = currentElement.geometricBounds;
  var Y0_ref = bounds[0]
  var X0_ref = bounds[1]
  var Y1_ref = bounds[2]
  var X1_ref = bounds[3]

  var h = bounds[2] - bounds[0]; //h
  var closestElement = null;
  var minDistance = Infinity;


  for (var i = 0; i < remainingElements.length; i++) {
    var element = remainingElements[i];
    var elementBounds = element.geometricBounds;
    var Y0_remaining = elementBounds[0]
    var X0_remaining = elementBounds[1]
    var Y1_remaining = elementBounds[2]
    var X1_remaining = elementBounds[3]


    if (X0_remaining > X0_ref && Y0_remaining < ((h / 2) + Y0_ref) && Y0_remaining > (Y0_ref - (h / 2))) {

      var dist = distance(currentElement, element);
      if (dist < minDistance) {
        minDistance = dist;
        closestElement = element;
      }
    }
  }

  return closestElement;
}
// closest to margin
function findClosestToMarginLeft(remainingElements) {
  var objSelection = remainingElements;
  var arrXtoMargin = [];
  var arrclosesttomarginleft = [];

  for (var i = 0; i < objSelection.length; i++) {
    // alert("geometric:\n" + a[0] + "\n" + a[1] + "\n" + a[2] + "\n" + a[3])
    var b = objSelection[i].geometricBounds;
    // var w = b[3] - b[1]; //w
    // var h = b[2] - b[0]; //h
    var xformargin = b[1]
    arrXtoMargin.push([xformargin, objSelection[i]])
  }
  // sort array for first element
  arrXtoMargin.sort(function (a, b) {
    return (a[0] - b[0])
  })


  for (var i = 0; i < arrXtoMargin.length; i++) {
    arrclosesttomarginleft.push(arrXtoMargin[i][1])
  }

  return (arrclosesttomarginleft)
}


// Find the closest element below the reference element
function findClosestBelowElement(referenceElement, remainingElements) {
  var bounds = referenceElement.geometricBounds;

  // alert(referenceElement.name)

  var closestElement = null;
  var minDistance = Infinity;


  for (var i = 0; i < remainingElements.length; i++) {
    var element = remainingElements[i];
    var elementBounds = element.geometricBounds;

    // Check if the element is below the reference element
    if (elementBounds[0] > bounds[2]) {
      var dist = distance(referenceElement, element);
      if (dist < minDistance) {
        minDistance = dist;
        closestElement = element;
      }
    }
  }

  return closestElement;
}
function convert_units(n, to) {
  var unitConversions = {
    'pt': 1.0000000000,
    'p': 12.0000000000,
    'mm': 2.8346456692,
    'in': 72.00000000,
    'ag': 5.1428571428,
    'cm': 28.3464566929,
    'c': 12.7878751998,
    'tr': 3.0112500000
  }
  var obj = fix_measurement(n);
  var temp = (obj.amount * unitConversions[obj.unit]) / unitConversions[to];
  return output_format(temp, to)

}

function output_format(amount, target) {
  // Add the target unit to the amount, either suffixed pt, ag, mm, cm, in, or infixed p or c
  // The decimals, no trailing zeros
  amount = amount.toFixed(3).replace(/\.?0+$/, ' ');
  if (target.length == 2) { // two-character unit: pt, mm, etc.
    return String(amount) + ' ' + target;
  } else {// 'p' or 'c'
    // calculate the decimal
    var decimal = (Number(amount) - parseInt(amount)) * 12;
    // return the integer part of the result + infix + formatted decimal
    return parseInt(amount) + target + decimal;
  }
}
function fix_measurement(n) {
  n = n.replace(/ /g, ' '); // Delete all spaces
  n = n.replace(/^([pc])/, '0$1'); // Change p3 to 0p3
  // Infixed 'p' and 'c' to decimal suffixes: 3p6 > 3.5 p
  n = n.replace(/(\d+)([pc])([.\d]+)$/, function () {
    return Number(arguments[1]) + Number(arguments[3] / 12) + arguments[2]
  }
  );
  // Split on unit
  var temp = n.split(/(ag|cm|mm|c|pt|p|in)$/);
  return {
    amount: Number(temp[0]),
    unit: temp.length === 1 ? doc_units() : temp[1]
  };
}
function documentUnits() {
  switch (app.documents[0].viewPreferences.horizontalMeasurementUnits) {
    case 2051106676: return 'ag';
    case 2053336435: return 'cm';
    case 2053335395: return 'c';
    case 2053729891: return 'in';
    case 2053729892: return 'in';
    case 2053991795: return 'mm';
    case 2054187363: return 'p';
    case 2054188905: return 'pt';
  }
}


function handle_key(key, control) {
  var step;
  key.shiftKey ? step = 10 : step = 1;
  switch (key.keyName) {
    case "Up": control.text = String(Number(control.text) + step); break;
    case "Down": control.text = String(Number(control.text) - step);
  }
} // handle_key


// v2 // distribute and align not implemented
function distributandalign(selectedlist, firstelement) {
  //https://www.indesignjs.de/extendscriptAPI/indesign-latest/#AlignDistributeBounds.html

  docRef.distribute(selectedlist,
    DistributeOptions.HORIZONTAL_SPACE,
    AlignDistributeBounds.KEY_OBJECT, false, gutterWid, firstelement);

  //https://www.indesignjs.de/extendscriptAPI/indesign-latest/#AlignOptions.html


  // docRef.align(
  //   selectedlist,
  //   AlignOptions.HORIZONTAL_CENTERS,
  //   AlignDistributeBounds.MARGIN_BOUNDS
  // );

  docRef.align(selectedlist,
    AlignOptions.VERTICAL_CENTERS, //VERTICAL_CENTERS
    AlignDistributeBounds.KEY_OBJECT, firstelement
  );
}

// }
// var u;

// app.doScript("main()", u, u, UndoModes.ENTIRE_SCRIPT, "The Script");