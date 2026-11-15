
var myPathExcel = myInput();


// Find the last index of the period (.)
var lastIndex = myPathExcel.lastIndexOf(".");

// Get the file extension
var fileExtension = myPathExcel.substring(lastIndex + 1);

// alert(fileExtension)
if (fileExtension !== "xlsx") {
    alert("Select a xlsx file!")
    var myPathExcel = myInput();

} else {
    if (File(myPathExcel).exists == false) { //excelFilePath
        alert('File does not exist'.toUpperCase());
        var myPathExcel = myInput();

    } else {
        // alert(myPathExcel)
        var myPathExcel = myPathExcel
        // myWindow.close();
        Main(myPathExcel)
        // return myText.text;
    }
}



function myInput() {
    var myWindow = new Window("dialog", "Extract numbers from excel to txt");
    var myInputGroup = myWindow.add("group");
    myInputGroup.add("statictext", undefined, "Path of excel:");
    var myText = myInputGroup.add("edittext", undefined, "path of excel");
    myText.characters = 30;
    myText.active = true;
    var myButtonGroup = myWindow.add("group");
    myButtonGroup.alignment = "right";

    myButtonGroup.add("button", undefined, "OK");
    myButtonGroup.add("button", undefined, "Cancel");

    myText.onChange = function () { }

    // myWindow.show()
    if (myWindow.show() == 1) {
        return myText.text;

    }
    exit();
}

function Main(myPathExcel) {
    // The platform-specific full path name for the xlsx-file -- fsName
    // If you pass it as a string, make sure to double the backslashes in the path like in the line below


    var arrayTxtFinal = [];

    var excelFilePath = myPathExcel;
    // alert(excelFilePath)
    // var excelFilePath = "d:\\work\\example"
    // "d:\\work\\example"

    // Find the last index of the period (.)
    var lastIndex = myPathExcel.lastIndexOf("\\");

    // Get the file extension
    // var reportPath = myPathExcel.substring(lastIndex + 1);
    var reportPath = myPathExcel.substring(0, lastIndex + 1);

    // var reportPath = "d:\\work\\example"


    //  "d:\\work\\example"
    // // var reportPath = "d:\\work\\example"
    // "d:\\work\\example"

    // var excelFile = new File(excelFilePath)

    var LiniaExcel = 3

    // [Optional] the character to use for splitting the columns in the spreadsheed: e.g. semicolon (;) or tab (\t)
    // If it isn't set, semicolon will be used by default
    var splitChar = ";";

    // [Optional] the worksheet number: either string or number. If it isn't set, the first worksheet will be used by default
    var sheetNumber = "0";
    // alert("Main\n" + excelFilePath + "\n" + reportPath);
    // var dataList = GetDataFromExcelPC(excelFilePath, splitChar, sheetNumber); // returns array
    var dataList = GetDataFromExcelPC(excelFilePath, sheetNumber);
    // alert(dataList[LiniaExcel][0] + "\n" + dataList[LiniaExcel][1] + "\n" + dataList[LiniaExcel][7])
    // alert(dataList[LiniaExcel])
    // alert(dataList.length)
    // alert(dataList)


    // var arrayString = '';

    // for (var i = 0; i < dataList.length; i++) {
    //     for (var j = 0; j < dataList[i].length; j++) {
    //         arrayString += dataList[i][j];

    //         // Add a tab between elements (except for the last element in the row)
    //         if (j < dataList[i].length - 1) {
    //             arrayString += '\t';
    //         }
    //     }

    //     // Add a newline between rows (except for the last row)
    //     if (i < dataList.length - 1) {
    //         arrayString += '\n';
    //     }
    // }
    for (var i = 0; i < dataList.length; i++) {


        var dataXlsxColumn0 = dataList[i][0] // 
        // var dataXlsxColumn1 = dataList[i][1] // 
        // var dataXlsxColumn2 = dataList[i][2] // x descriere 
        // var dataXlsxColumn3 = dataList[i][3] // x substring
        // var dataXlsxColumn4 = dataList[i][4] // number
        // var dataXlsxColumn5 = dataList[i][5] // number
        // var dataXlsxColumn6 = dataList[i][6] // measurement units
        // var dataXlsxColumn7 = dataList[i][7] // character
        // var dataXlsxColumn8 = dataList[i][8] // character
        // var dataXlsxColumn9 = dataList[i][9] // character
        // var dataXlsxColumn10 = dataList[i][10] // x cod

        // Regular expression pattern to match sets of four different digits
        // var pattern = /(?<!\d)(\d)(?!\1)(\d)(?!\1|\2)(\d)(?!\1|\2|\3)(\d)/g;
        // var pattern = /(\d)(\d)(\d)(\d)/g;
        // var pattern = /\d+/g;
        var pattern = new RegExp("\\d+", "g");
        // alert(dataXlsxColumn0)
        // Extract sets of numbers from each line
        // var myNumbers = [];
        var sets = dataXlsxColumn0.match(pattern);
        // myNumbers.push(sets);
        // alert(sets)
        //
        // myNumbers.push(firstNumber);
        if (sets) {
            // console.log("Sets of numbers from line " + (i + 1) + ": " + sets.join(", "));
            // var myNumbers = sets.split(",");

            // var txtOutput = myNumbers[0]
            var txtOutput = sets;
            // alert(sets)
        } else {

            var txtOutput = "-";
        }



        // arrayTxtFinal += txtOutput
        // if (i < dataList.length - 1) {
        //     arrayTxtFinal += '\r';
        // }
        arrayTxtFinal.push(txtOutput)



    }
    // alert("arrayTxtFinal\n" + arrayTxtFinal[0])
    writeReport(arrayTxtFinal, reportPath)
    // alert(arrayTxtFinal)
    alert("report done!")
    // alert(dataList)
    // writeReport(arrayString, reportPath)


}


function writeReport(arrayTxtFinal, reportPath) {

    // Initialize an empty array to store the first numbers
    var firstNumbersArray = [];
    // var originalArray = info;

    // Iterate through each line of the original array
    for (var i = 0; i < arrayTxtFinal.length; i++) {
        // Split the line by commas
        var linetext = String(arrayTxtFinal[i]);
        // alert(linetext)
        var lineParts = linetext.split(",");
        // alert("linetext\n" + linetext + "\nlineParts\n" + lineParts)

        // Get the first number
        var firstNumber = lineParts[0];
        if (firstNumber.length > 4) {
            var realNumber = firstNumber
        } else {
            var realNumber = "-"
        }

        // Push the first number into the new array
        firstNumbersArray.push(realNumber);
    }



    var arrayString = '';

    for (var i = 0; i < firstNumbersArray.length; i++) {
        for (var j = 0; j < firstNumbersArray[i].length; j++) {
            arrayString += firstNumbersArray[i][j];

            // Add a tab between elements (except for the last element in the row)
            // if (j < firstNumbersArray[i].length - 1) {
            //     arrayString += '\t';
            // }
        }

        // Add a newline between rows (except for the last row)
        if (i < firstNumbersArray.length - 1) {
            arrayString += '\n';
        }
    }

    // alert(psdMasterListPathRatia[a][1]) 

    // alert("reportPath\n" + reportPath)
    var filename = "\\numere" + ".txt";
    var message = arrayString;//firstNumbersArray//info;
    // var filename = "_raport_Excel--" +  "_" + ".txt"; // merge!

    var file = new File(reportPath + filename);

    // alert("file: "+filename+" filename: "+filename+" calea e "+myFile_calea)

    if (file.exists == true) {
        // File ('d:/folder1/folder2/test.indd').remove();
        File(file).remove();
    }

    file.encoding = 'UTF-8';
    file.open("w");
    // if (file.exists) {

    //     file.open("w");
    //     // file.open("e");
    //     // file.seek(0, 2);
    // }
    // else {
    //     file.open("w");
    // }

    // file.open('w');
    // file.write(message + "\r");
    file.write(message);
    file.close();


}
function GetDataFromExcelPC(excelFilePath, sheetNumber) {
    // var data = [];
    // if (app.documents.length > 0) {
    //     var data = getData(excelFilePath, sheetNumber)
    // } else {
    //     var myDoc = app.documents.add();
    //     var data = getData(excelFilePath, sheetNumber)
    // }

    var myDoc = app.documents.add();
    var data = getData(excelFilePath, sheetNumber)
    function getData(excelFilePath) {
        // var myExcelPath = File("d:/work/example.xlsx")
        var myExcelPath = File(excelFilePath);
        var myFrame = app.activeDocument.textFrames.add({ geometricBounds: [0, -80, 24, -25] });
        // [y1, x1, y2, x2]

        // app.excelImportPreferences.rangeName = ranges[i];
        app.excelImportPreferences.properties = {
            alignmentStyle: AlignmentStyleOptions.CENTER_ALIGN,
            preserveGraphics: false,
            // rangeName
            sheetIndex: 0,
            showHiddenCells: false,
            tableFormatting: TableFormattingOptions.EXCEL_UNFORMATTED_TABBED_TEXT,//TableFormattingOptions.EXCEL_FORMATTED_TABLE,
            useTypographersQuotes: false
            // viewName: "" // asta da eroare

        }

        var myProperties = app.excelImportPreferences.properties;
        // doc.pages[0].textFrames[i].place(fileExcel);
        // myFrame.place(myExcelPath);
        myFrame.place(myExcelPath, false, myProperties);
        var myString = myFrame.contents + "\r" + myFrame.parentStory.insertionPoints.itemByRange(myFrame.insertionPoints[-1].index, myFrame.parentStory.insertionPoints[-1].index).contents;
        //var tf = app.selection[0]
        // var oversetContent = myFrame.parentStory.insertionPoints.itemByRange(myFrame.insertionPoints[-1].index, myFrame.parentStory.insertionPoints[-1].index).contents
        // alert(myString)

        // Split the string by new lines to get each line
        var lines = myString.split("\r");

        // Initialize an empty multi-dimensional array
        var multiArray = [];

        // Iterate through each line
        for (var i = 0; i < lines.length; i++) {
            // Split the line by tabs to get the elements
            var elements = lines[i].split("\t");

            // Push the elements array into the multi-dimensional array
            multiArray.push(elements);
        }
        // alert(multiArray[137][0])
        // alert(multiArray[4][2] + "\n" + multiArray[4][3] + "\n" + multiArray[4][4])//C3 D3 E3 prima e linia a doua e coloana
        // myFrame.remove()
        try { myDoc.close(SaveOptions.no); } catch (e) { }
        return multiArray;

    }
    // alert(data[1][0])
    return data;

}
// var myStories = app.activeDocument.stories.everyItem().getElements();
// for (i = myStories.length - 1; i >= 0; i--){
//     var myTextFrames = myStories[i].textContainers;
//     for (j = myTextFrames.length - 1; j >= 0; j--)    {
//         if ((myTextFrames[j].contents == "") || (myTextFrames[j].words.length == 0)){
//             myTextFrames[j].remove();
//         }
//     }
// }

function OLD___GetDataFromExcelPC(excelFilePath, splitChar, sheetNumber) {
    try {
        if (typeof splitChar === "undefined") var splitChar = ";";
        if (typeof sheetNumber === "undefined") var sheetNumber = "1";
        var appVersionNum = Number(String(app.version).split(".")[0]),
            data = [];

        var vbs = 'Public s, excelFilePath\r';
        vbs += 'Function ReadFromExcel()\r';
        vbs += 'On Error Resume Next\r';
        vbs += 'Err.Clear\r';
        vbs += 'Set objExcel = CreateObject("Excel.Application")\r';
        vbs += 'Set objBook = objExcel.Workbooks.Open("' + excelFilePath + '")\r';
        vbs += 'Set objSheet =  objExcel.ActiveWorkbook.WorkSheets(' + sheetNumber + ')\r';
        vbs += 's = s & "[" & objSheet.Name & "]"\r';
        vbs += 'objExcel.Visible = True\r';
        vbs += 'matrix = objSheet.UsedRange\r';
        vbs += 'maxDim0 = UBound(matrix, 1)\r';
        vbs += 'maxDim1 = UBound(matrix, 2)\r';
        vbs += 'For i = 1 To maxDim0\r';
        vbs += 'For j = 1 To maxDim1\r';
        vbs += 'If j = maxDim1 Then\r';
        vbs += 's = s & matrix(i, j)\r';
        vbs += 'Else\r';
        vbs += 's = s & matrix(i, j) & "' + splitChar + '"\r';
        vbs += 'End If\r';
        vbs += 'Next\r';
        vbs += 's = s & vbCr\r';
        vbs += 'Next\r';
        vbs += 'objBook.Close\r';
        vbs += 'Set objSheet = Nothing\r';
        vbs += 'Set objBook = Nothing\r';
        vbs += 'Set objExcel = Nothing\r';
        vbs += 'SetArgValue()\r';
        vbs += 'On Error Goto 0\r';
        vbs += 'End Function\r';
        vbs += 'Function SetArgValue()\r';
        vbs += 'Set objInDesign = CreateObject("InDesign.Application")\r';
        vbs += 'objInDesign.ScriptArgs.SetValue "excelData", s\r';
        vbs += 'End Function\r';
        vbs += 'ReadFromExcel()\r';

        if (appVersionNum > 5) { // CS4 and above
            app.doScript(vbs, ScriptLanguage.VISUAL_BASIC, undefined, UndoModes.FAST_ENTIRE_SCRIPT);
        }
        else { // CS3 and below
            app.doScript(vbs, ScriptLanguage.VISUAL_BASIC);
        }

        var str = app.scriptArgs.getValue("excelData");
        app.scriptArgs.clear();

        var tempArrLine, line, match, name,
            tempArrData = str.split("\r");

        for (var i = 0; i < tempArrData.length; i++) {
            line = tempArrData[i];
            if (line == "") continue;

            match = line.match(/^\[.+\]/);

            if (match != null) {
                name = match[0].replace(/\[|\]/g, "");
                line = line.replace(/^\[.+\]/, "");
            }

            tempArrLine = line.split(splitChar);
            data.name = name;
            data.push(tempArrLine);
        }


        return data;
        // return nonEmptyArrays;
    }
    catch (err) {
        $.writeln(err.message + ", line: " + err.line);
        alert(err.message + ", line: " + err.line);
    }
}