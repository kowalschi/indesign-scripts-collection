
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
    var myWindow = new Window("dialog", "Export from excel to txt");
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


    var arrayTxtFinal = "";

    var excelFilePath = myPathExcel;
    // var excelFilePath = "d:\\work\\example"
    // "d:\\work\\example"

    // Find the last index of the period (.)
    var lastIndex = myPathExcel.lastIndexOf("\\");

    // Get the file extension
    // var reportPath = myPathExcel.substring(lastIndex + 1);
    var reportPath = myPathExcel.substring(0, lastIndex + 1) + "\\";

    try {

        var f = new Folder(reportPath + "/" + ("xml"));
        f.create();

    } catch (e) {
        // alert(e);

    }

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
    var sheetNumber = "1";
    // alert("Main\n" + excelFilePath + "\n" + reportPath);
    var dataList = GetDataFromExcelPC(excelFilePath, splitChar, sheetNumber); // returns array

    // alert(dataList[LiniaExcel][0] + "\n" + dataList[LiniaExcel][1] + "\n" + dataList[LiniaExcel][7])
    // alert(dataList[LiniaExcel])
    // alert(dataList.length)
    // alert(dataList)


    var arrayString = '';

    for (var i = 0; i < dataList.length; i++) {
        for (var j = 0; j < dataList[i].length; j++) {
            arrayString += dataList[i][j];

            // Add a tab between elements (except for the last element in the row)
            if (j < dataList[i].length - 1) {
                arrayString += '\t';
            }
        }

        // Add a newline between rows (except for the last row)
        if (i < dataList.length - 1) {
            arrayString += '\n';
        }
    }
    for (var i = 1; i < dataList.length; i++) {


        // var dataXlsxColumn0 = dataList[i][0] // 
        // var dataXlsxColumn1 = dataList[i][1] // 
        var dataXlsxColumn2 = dataList[i][2] // x descriere 
        var dataXlsxColumn3 = dataList[i][3] // x substring
        // var dataXlsxColumn4 = dataList[i][4] // number
        // var dataXlsxColumn5 = dataList[i][5] // number
        // var dataXlsxColumn6 = dataList[i][6] // measurement units
        // var dataXlsxColumn7 = dataList[i][7] // character
        // var dataXlsxColumn8 = dataList[i][8] // character
        // var dataXlsxColumn9 = dataList[i][9] // character
        var dataXlsxColumn10 = dataList[i][10] // x cod


        // var txtOutput = "\t" + dataXlsxColumn10 + "\t" + dataXlsxColumn2 + "\n" + "\t" + "\t" + dataXlsxColumn3
        // arrayTxtFinal += txtOutput
        // if (i < dataList.length - 1) {
        //     arrayTxtFinal += '\n';
        // }
        var xmlOutput =
            "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + "\r" +
            "<article>" + "\r" +
            "  <mspretail>" + "\r" +
            "    <promotionalItem>" + dataXlsxColumn2 + "</promotionalItem>" + "\r" +
            "    <promotionalItemSubString>" + dataXlsxColumn3 + "</promotionalItemSubString>" + "\r" +
            "    <Promo_Description />" + "\r" +
            "    <Promo_Text_Short />" + "\r" +
            "    <Promo_Text_Medium />" + "\r" +
            "    <Promo_Text_Long />" + "\r" +
            "    <Callout1 />" + "\r" +
            "    <Callout2 />" + "\r" +
            "    <Callout3 />" + "\r" +
            "    <Special_Text />" + "\r" +
            "    <Footnote />" + "\r" +
            "    <Legal_Text />" + "\r" +
            " </mspretail>" + "\r" +
            "</article>"
        writeReport(xmlOutput, reportPath, dataXlsxColumn10)

    }
    // alert("arrayTxtFinal\n" + arrayTxtFinal[0])
    // writeReport(arrayTxtFinal, reportPath, dataXlsxColumn10)
    alert("report done!")
    // alert(dataList)
    // writeReport(arrayString, reportPath)


}


function writeReport(info, reportPath, dataXlsxColumn10) {

    // alert(psdMasterListPathRatia[a][1]) 

    // alert("reportPath\n" + reportPath)
    // var filename = "\\cod_descriere" + ".txt";
    var filename = dataXlsxColumn10 + ".xml";
    var message = info;
    // var filename = "_raport_Excel--" +  "_" + ".txt"; // merge!

    var file = new File(reportPath + "\\xml\\" + filename);
    if (file.exists == true) {
        // File ('d:/folder1/folder2/test.indd').remove();
        File(file).remove();
    }

    // alert("file: "+filename+" filename: "+filename+" calea e "+myFile_calea)

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


function GetDataFromExcelPC(excelFilePath, splitChar, sheetNumber) {
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
        vbs += 'objBook.close\r';
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
        0
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

            // for (var r = 0; r < tempArrLine.length; r++) {
            //     if ()
            // }

            data.name = name;
            data.push(tempArrLine);
            nonEmptyArrays = [];
            // Function to check if all elements in a line are equal
            function areElementsEqual(linef) {
                for (var i = 1; i < linef.length; i++) {
                    if (linef[i] !== linef[0]) {
                        return false;
                    }
                }
                return true;
            }

            // Check each line in the multi-array
            for (var j = 0; j < data.length; j++) {
                var currentLine = data[j];
                if (areElementsEqual(currentLine)) {
                    // console.log(`All elements in line ${j + 1} are equal.`);
                } else {
                    // console.log(`Line ${j + 1} has different elements.`);
                    nonEmptyArrays.push(currentLine);
                }
            }

        }

        // return data;
        return nonEmptyArrays;
    }
    catch (err) {
        $.writeln(err.message + ", line: " + err.line);
    }
}