//https://www.indesignjs.de/extendscriptAPI/indesign-latest/index.html#ChangeCaseOptions.html
// https://community.adobe.com/t5/indesign-discussions/is-there-a-quick-way-to-find-out-if-a-pageitem-has-image/m-p/8824097


app.scriptPreferences.enableRedraw = false;
// app.layoutWindows[0].transformReferencePoint = AnchorPoint.CENTER_ANCHOR;
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
try {
    cleanDocument()
} catch (e) {
    alert(e.message + ' (line ' + e.line + ')');
};

// cleanDocument()


function cleanDocument() {


    // CREATE PROGRESS WINDOW

    progress = new Window("palette", "Progress", undefined, {
        "closeButton": false
    });
    progress.t = progress.add("statictext");
    progress.t.preferredSize.width = 450;
    progress.b = progress.add("progressbar");
    progress.b.preferredSize.width = 450;
    progress.display = function (message) {
        message && (this.t.text = message);
        this.show();
        this.update();
    };
    progress.increment = function () {
        this.b.value++;
    };
    progress.set = function (steps) {
        this.b.value = 0;
        this.b.minvalue = 0;
        this.b.maxvalue = steps;
    };

    /*   
         progress.close();
        progress.display("Initializing...");
        progress.set(layerRect.rectangles.length);
        progress.increment();
        progress.display(link.name);
    
    */

    progress.display("Initializing...");
    $.sleep(1000);
    var sourcePages = app.activeDocument.pages;
    var doc = app.activeDocument;
    var myTextsToMove = new Array;
    var myImagesToMove = new Array;
    var sourceSpreads = app.activeDocument.spreads;
    var numbersOfLayers = 0;


    var myFile_path = app.activeDocument.filePath;
    var myFileName_full = app.activeDocument.fullName + "";
    var myFile_name = app.activeDocument.name;
    var myFile_nameNoeExt = myFile_name.replace(".indd", "")
    var myFileName_full = app.activeDocument.fullName + "";
    progress.display("Saving...");
    var savedoc = app.activeDocument.save(File(myFile_path + "/" + myFile_nameNoeExt + "_workBD_Raw.indd"));
    var doc = app.activeDocument;
    ////-------------- rename original layers
    // https://community.adobe.com/t5/indesign-discussions/help-with-creating-a-script-to-make-renaming-layer-objects-faster/td-p/11991178
    var docLayers = app.activeDocument.layers.everyItem().getElements();
    var aLayer, i, j, layerPageItems, numLPIs, count;
    numbersOfLayers = docLayers.length;
    for (var i = 0; i < docLayers.length; i++) {
        aLayer = docLayers[i];
        aLayer.name = "original_layer_" + i;
        //    layerPageItems = aLayer.pageItems.everyItem().getElements();
        //    numLPIs = layerPageItems.length;
        //    count = 100;
        //    for (j = 0; j < numLPIs; j++) {
        //        layerPageItems[j].name = count + "";
        //        count++;
        //    }
    }




    /// revmove items out of page
    progress.display("Remove items out of page");
    $.sleep(1000);
    var objs = app.activeDocument.pageItems.everyItem().getElements();
    progress.set(objs.length);
    while (obj = objs.pop()) {
        progress.increment();
        if (obj.parentPage == null) { obj.remove() }


    }




    progress.display("Create new layers...");
    $.sleep(1000);
    try { var myLayerPrices = doc.layers.add({ name: "newLayer_Prices_work" }); }
    catch (e) { myLayerPrices = doc.layers.item("newLayer_Prices_work"); }

    try { var myLayerBack = doc.layers.add({ name: "newLayer_Background_work" }); }
    catch (e) { myLayerBack = doc.layers.item("newLayer_Background_work"); }

    try { var myLayer_images = doc.layers.add({ name: "newLayer_Images" }); }
    catch (e) { myLayer_images = doc.layers.item("newLayer_Images"); }

    try { var myLayer = doc.layers.add({ name: "newLayer_TextFrames" }); }
    catch (e) { myLayer = doc.layers.item("newLayer_TextFrames"); }

    var allItemsOnPage = app.activeDocument.pageItems;

    //--------------------  master 


    progress.display("Apply master none and remove master elements");
    $.sleep(1000);
    progress.set(sourcePages.length);

    for (var i = 0; i < sourcePages.length; i++) {



        sourcePages[i].appliedMaster = null;

        progress.increment();

    }
    var masterSpreads = app.activeDocument.masterSpreads;//ok

    for (var i = masterSpreads.length - 1; i >= 1; i--) {
        var masterSpread = masterSpreads[i];
        masterSpread.remove();
    }
    var masterSpread = app.activeDocument.masterSpreads[0];
    // Iterate through all page items on the master spread
    for (var i = masterSpread.pageItems.length - 1; i >= 0; i--) {
        var pageItem = masterSpread.pageItems[i];
        pageItem.remove();

    }

    //--------------------  master  end





    //-------------------- unlock items


    //ok
    progress.display("Unlock items");
    $.sleep(1000);
    // progress.set(sourceSpreads.length);
    for (var i = 0; i < sourceSpreads.length; i++) {

        var item, items = sourceSpreads[i].allPageItems;


        for (var j = 0; j < items.length; j++) {
            progress.display("Unlock objects on page " + sourcePages[i].name);
            progress.set(items.length);
            try { items[j].locked = false } catch (_) { };
            progress.increment();

        }

        // while (item = items.shift()) {
        //     try { item.locked = false } catch (_) { };
        //     // item.redefineScaling();
        // }
        // progress.increment();
    }

    // for (var j = 0; j < allItemsOnPage.length; j++) {
    //     progress.display("Unlock items");//+ allItemsOnPage[j].name
    //     allItemsOnPage[j].locked = false;
    //     progress.increment();
    // }



    //-------------------- ungroup items
    ungroupall()
    function ungroupall() {

        var sourcePages = app.activeDocument.pages; //app.documents[1].pages;

        for (var i = 0; i < sourcePages.length; i++) {
            itemsOnPage = sourcePages[i].pageItems;
            progress.set(sourcePages.length);
            for (var j = 0; j < itemsOnPage.length; j++) {


                try {
                    app.select(itemsOnPage[j])
                    var myObj = app.selection[0];
                    // alert("select gr")
                    if (myObj instanceof Group) {
                        progress.display("Ungroup objects on page " + sourcePages[i].name);
                        try {
                            // app.activeDocument.groups.everyItem().ungroup();
                            myObj.ungroup();
                        } catch (e) {

                        };

                    }

                } catch (e) {
                    // $.writeln(n + "\t" + e.message) 
                };
                progress.increment();
            }
        }

    }






    //-------------------- remove empty textframes


    progress.set(sourcePages.length);
    // varianta 3
    for (var i = 0; i < sourcePages.length; i++) {

        // myAllPageItemsText = app.activeDocument.textFrames;
        var itemsOnPage = sourcePages[i].allPageItems//.pageItems;
        for (var j = 0; j < itemsOnPage.length; j++) {
            var myTextFrame = itemsOnPage[j];
            // alert(myTextFrame.constructor.name)
            if (myTextFrame instanceof TextFrame) {
                // alert(myTextFrame.constructor.name)
                if (myTextFrame.words.length === 0) { //myTextFrame.contents === "" ||
                    // alert(myTextFrame.words[0].length)
                    // alert(myTextFrame.words[0].contents)
                    progress.display("Remove empty textframes on page " + sourcePages[i].name);
                    myTextFrame.remove();
                }
            }

        }


        progress.increment();
    }



    // ultima varianta 3:
    // progress.set(sourceSpreads.length);
    // // varianta 3
    // for (var i = 0; i < sourceSpreads.length; i++) {

    //     myAllPageItemsText = app.activeDocument.textFrames;
    //     // progress.set(myAllPageItemsText.length);
    //     for (var j = 0; j < myAllPageItemsText.length; j++) {
    //         if (myAllPageItemsText[j].words.length === 0) //mytext.words.length
    //         {
    //             // myAllPageItemsText[j].locked = false;
    //             // try { progress.display("Remove empty textframes on page " + myAllPageItemsText[j].parentPage.name); } catch (e) { } // eroare
    //             progress.display("Remove empty textframes" + sourceSpreads[i].name);
    //             myAllPageItemsText[j].remove();
    //         }

    //     }
    //     progress.increment();
    // }


    // varianta 1 ok
    // for (var i = 0; i < sourcePages.length; i++) {

    //     myAllPageItemsText = app.activeDocument.textFrames;
    //     progress.set(myAllPageItemsText.length);
    //     for (var j = 0; j < myAllPageItemsText.length; j++) {
    //         if (myAllPageItemsText[j].words.length === 0) //mytext.words.length
    //         {
    //             // myAllPageItemsText[j].locked = false;
    //             // try { progress.display("Remove empty textframes on page " + myAllPageItemsText[j].parentPage.name); } catch (e) { } // eroare
    //             progress.display("Remove empty textframes");
    //             myAllPageItemsText[j].remove();
    //         }
    //         progress.increment();
    //     }
    // }


    //  varianta 2 nu merge
    /*  var mySpreads = app.activeDocument.spreads;
      for (var i = 0; i < mySpreads.length; i++) {
  
          var item, myAllPageItemsText = mySpreads[i].textFrames;
  
          var arrayTextFrames = [];
          for (var i = 0; i < myAllPageItemsText.length; i++) {
              arrayTextFrames.push(myAllPageItemsText[i])
          }
          progress.set(arrayTextFrames.length);
  
          while (item = arrayTextFrames.shift()) {
              // alert(item.words.length)
              progress.display("Remove empty textframes");// );//
              try {
                  if (item.words.length === 0) { item.remove() }
              } catch (e) { };//alert(e)
  
              try {
                  if (item.words.length) { } else { item.remove() }
              } catch (e) { };//alert(e)
              progress.increment();
          }
  
  
      }
  */





    // asta e ok varianta 1
    // for (var i = 0; i < sourcePages.length; i++) {
    //     progress.display("Move Text and Images to new layers");
    //     progress.set(sourcePages.length);
    //     moveToNewLayer()
    //     function moveToNewLayer() {
    //         progress.display("Move Text and Images to new layers on page " + sourcePages[i].name);
    //         //////////////////////// text:
    //         myPageItemsText = sourcePages[i].textFrames; /// ok
    //         myPageItemsText.everyItem().itemLayer = myLayer; /// ok
    //         ///////////// imagini:
    //         myPageImages = sourcePages[i].rectangles;/// ok
    //         myPageImages.everyItem().itemLayer = myLayer_images;/// ok}
    //     }

    //     progress.increment();
    // }

    // asta e ok varianta 1 end





    //-------------------- Move Text Images to new layer

    // a varianta 2
    for (var i = 0; i < app.activeDocument.spreads.length; i++) {


        //---------------- text
        var item, myPageItemsText = app.activeDocument.textFrames;
        // alert(myPageItemsText.constructor.name) // text frames!!!
        // alert(myPageItemsText[1].contents)// ok
        var arrayTextFrames = [];
        for (var i = 0; i < myPageItemsText.length; i++) {
            arrayTextFrames.push(myPageItemsText[i])
        }
        progress.set(arrayTextFrames.length);
        // alert(arrayTextFrames[4].contents)// ok

        while (item = arrayTextFrames.shift()) {
            progress.display("Move Text to new layer");// );//
            try { item.itemLayer = myLayer } catch (e) { alert(e) };
            progress.increment();
        }
        ///-------------- remove embeded images 
        removeEmbeded()

        function removeEmbeded() {
            var doc = app.activeDocument;
            var graphics = doc.allGraphics;
            var embeddedGraphics = [];
            // app.select(graphics[0])
            // if (graphics[0].itemLink == null) {
            //     alert("nulll")
            //     graphics[0].parent.remove()
            // }
            for (var i = graphics.length - 1; i >= 0; i--) {
                // for (var i = 0; i < graphics.length; i++) {
                // graphics[i].itemLink.status == LinkStatus.LINK_EMBEDDED  // error itemLink is null!!
                if (graphics[i].itemLink == null) {
                    // graphics[i].parent.remove() // error - is mai multe imagini intr un rectangle si da eroare, dupa ce sterge
                    graphics[i].remove()

                }
            }
        }
        ///-------------- remove embeded images  end
        //---------------- images
        var itemI, myPageItemsImages = app.activeDocument.rectangles;
        var myPageItemsImagesPoly = app.activeDocument.polygons;
        var myPageItemsImagesOvals = app.activeDocument.ovals;
        // alert(myPageItemsText.constructor.name) // text frames!!!
        // alert(myPageItemsText[1].contents)// ok
        var arrayImagesFrames = [];

        var links = app.activeDocument.links;
        var link, image;
        progress.set(links.length);
        progress.display("Move Images to new layer and delete big ones");
        // big picture larger than page aria / 4.5 and larger than page aria/2 are move away from page and the rest are move to new layer
        for (var i = links.length - 1; i >= 0; i--) {
            if (links[i].hasOwnProperty('relink')) {
                try {
                    link = links[i];
                    image = link.parent.parent; // rectangle
                    // imageName = link.name;
                    if (image.parentPage !== null) //{ } else 
                    {

                        var myPage = image.parentPage;
                        // alert("pag name: " + myPage.name)
                        var p = myPage.bounds;
                        var W_ = p[3] - p[1]; // 
                        var H_ = p[2] - p[0]; // 
                        var ariapage = W_ * H_;

                        var m = image.geometricBounds;
                        var W_image = m[3] - m[1]; // 
                        var H_image = m[2] - m[0]; // 
                        var ariaImage = W_image * H_image
                        // alert("ariaImage\n" + ariaImage + "\nariapage / 10\n" + (ariapage / 10))
                        if (ariaImage > (ariapage / 2)) {
                            // image.remove()
                            image.move([-W_ - W_image - 10, 0])

                        } else if (ariaImage > (ariapage / 4.5)) {
                            // alert("mai mare")
                            // image.move([-20, 0])
                            image.move([-W_ - W_image - 3, 0])
                            // not working:!!!
                            // if (myPage.side == PageSideOptions.LEFT_HAND) {
                            //     image.move([-W_image - 5, 0])
                            // }
                            // if (myPage.side == PageSideOptions.RIGHT_HAND) {

                            //     image.move([W_ + W_image + 5, 0])
                            // }

                        } else {
                            arrayImagesFrames.push(image)
                        }

                    }
                }
                catch (err) {
                    // $.writeln(i + " - " + err);
                    // alert(i + " - " + err);
                }
            }
            progress.increment();
        }

        /// ----------- oval images
        for (var i = 0; i < myPageItemsImagesOvals.length; i++) {
            if (myPageItemsImagesOvals[i].images.length >= 1 || myPageItemsImagesOvals[i].rectangles.length >= 1)
                arrayImagesFrames.push(myPageItemsImagesOvals[i])
        }

        /// ----------- polygons images
        for (var i = 0; i < myPageItemsImagesPoly.length; i++) {
            if (myPageItemsImagesPoly[i].images.length >= 1 || myPageItemsImagesPoly[i].rectangles.length >= 1)
                arrayImagesFrames.push(myPageItemsImagesPoly[i])
        }

        progress.set(arrayImagesFrames.length);
        while (itemI = arrayImagesFrames.shift()) {
            progress.display("Move Images to new layer");// );//
            try { itemI.itemLayer = myLayer_images } catch (e) { };//alert(e) 
            progress.increment();
        }

    }



    //-------------------- create rectangle background
    progress.set(sourcePages.length);

    try {
        var newColor = app.activeDocument.colors.add({
            name: "colorBackground_work", // Name of the color
            model: ColorModel.PROCESS, // Color model (PROCESS or SPOT)
            colorValue: [0, 0, 0, 55], // CMYK or RGB values // one or more of the color values is invalid
        });
    }
    catch (e) { }//alert(e)


    for (var i = 0; i < sourcePages.length; i++) {
        progress.display("create background " + sourcePages[i].name);
        var targetLayer = app.activeDocument.layers.itemByName("newLayer_Background_work");
        app.activeDocument.activeLayer = targetLayer;//doc.layers.itemByName("newLayer_Background_work");
        var b_pgebounds = sourcePages[i].bounds;

        // var Wp = b_pgebounds[3] - b_pgebounds[1];
        // var Hp = b_pgebounds[2] - b_pgebounds[0];
        var rect = sourcePages[i].rectangles.add({ geometricBounds: [0, 0, b_pgebounds[2], b_pgebounds[3]] });
        // , fillColor: app.activeDocument.colors.itemByName("colorBackground_work")

        rect.fillColor = app.activeDocument.swatches.item("Black");
        rect.fillTint = 50;
        progress.increment();
    }

    app.activeDocument.layers.itemByName("newLayer_Background_work").locked ^= 1;


    //-------------------- move prices    
    for (var i = 0; i < sourcePages.length; i++) {

        itemsOnPage = sourcePages[i].allPageItems//.pageItems;
        progress.set(itemsOnPage.length);
        for (var j = 0; j < itemsOnPage.length; j++) {
            var myTextFrame = itemsOnPage[j];
            // alert(myTextFrame.constructor.name)
            if (myTextFrame instanceof TextFrame) {
                // alert(myTextFrame.constructor.name)
                if (myTextFrame.contents !== "") {
                    // alert(myTextFrame.words[0].length)
                    // alert(myTextFrame.words[0].contents)
                    if (myTextFrame.words[0]) {
                        var word = myTextFrame.words[0];
                        if (word.fontStyle !== null && word.fontStyle === "Black") //&& word.item(0).pointSize > 20
                        {
                            progress.display("Move prices on page " + sourcePages[i].name);
                            try { myTextFrame.itemLayer = myLayerPrices } catch (e) { alert(e) };

                        }
                    }
                }
            }
            progress.increment();
        }

    }

    //--------------------- hide original layers
    // app.documents.item(0).layers.itemByName("id").locked ^= 1;
    // app.documents[0].activeLayer = app.documents[0].layers.itemByName("vizibil");
    // alert(numbersOfLayers)

    /// old:
    // try {
    //     for (var i = 0; i < numbersOfLayers; i++) {

    //         var name = "original_layer_" + i;
    //         // var targetOriginalLayer = doc.layers.itemByName(name);
    //         // targetOriginalLayer.visible = false;
    //         //app.documents.everyItem().layers.itemByName("Draft").visible = false;
    //         app.activeDocument.layers.itemByName(name).visible = false;


    //         // alert(name)
    //         // alert(name.constructor.name)

    //     }

    //     app.activeDocument.layers.itemByName("newLayer_Prices_work").visible = false;
    //     app.activeDocument.layers.itemByName("newLayer_Prices_work").locked ^= 1;
    // } catch (e) { }

    progress.display("Saving document");
    savedoc.save();
    // savedoc.close(SaveOptions.no);

    var myFile_path = app.activeDocument.filePath;
    var myFile_name = app.activeDocument.name;
    var myFile_nameNoeExt = myFile_name.replace("_workBD_Raw.indd", "") //"_workBD_Raw.indd"

    progress.display("Performing final clean");
    $.sleep(1000);
    progress.display("Deleting ornament images");
    ///-----------------------final clean custom 1
    var tobeDeleted = ["ornament_1.ai", "ornament_2.psd", "texture.tif"]; // example names - list here the linked files to remove
    var links = app.activeDocument.links;
    var link, image;
    progress.set(links.length);
    try {

        for (var i = links.length - 1; i >= 0; i--) {


            if (links[i].hasOwnProperty('relink')) {

                link = links[i];
                image = link.parent.parent;// rectangle
                imageName = link.name;
                // alert("imageName: " + imageName)

                for (var j = 0; j < tobeDeleted.length; j++) {
                    if (imageName == tobeDeleted[j]) {
                        image.remove()
                    }


                }
            }
            progress.increment();
        }
    } catch (e) { }//alert(e)

    ///-----------------------final clean custom 1 end


    ///-----------------------final clean custom 2


    var myText = ["valabilitate", "prin casa de marcat", "Economisim bani", "prospetime", "calitate", "bunatate", "savoare", "rasfat"]
    var myTextwithNumber = "spălări"
    removeATextFrameWhichStartWithANumbeAndAWord(myTextwithNumber)
    removeATextFrameWhichStartWithaWord(myText)

    function removeATextFrameWhichStartWithANumbeAndAWord(myTextwithNumber) { // 20 spalari
        progress.display("Finding and deleting specific text with number");
        var keyWord = myTextwithNumber;

        // Get the active document
        var doc = app.activeDocument;

        // Define a regular expression pattern to match a number followed by the specific word
        var pattern = new RegExp("^\\d+\\s+" + keyWord, "i");

        // Iterate through all text frames in the document
        progress.set(doc.textFrames.length);
        for (var i = doc.textFrames.length - 1; i >= 0; i--) {
            var textFrame = doc.textFrames[i];

            // Check if the text frame's content matches the pattern
            if (pattern.test(textFrame.contents)) {
                // Remove the text frame
                textFrame.remove();
            }
            progress.increment();
        }

    }

    function removeATextFrameWhichStartWithaWord(myText) {
        progress.display("Finding and deleting specific ornament text");
        var keyWord = myText
        var doc = app.activeDocument;
        progress.set(keyWord.length);
        for (var m = 0; m < keyWord.length; m++) {
            // alert(keyWord[m])
            app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
            // Create a GREP search query to find text frames starting with the specified word
            var grepQuery = "^" + keyWord[m];
            app.findGrepPreferences.findWhat = grepQuery;

            // Perform the GREP search on the document
            var grepResults = doc.findGrep();//

            // Iterate through the search results and remove the text frames
            // progress.set(grepResults.length);
            for (var i = grepResults.length - 1; i >= 0; i--) {
                var textFrame = grepResults[i].parentTextFrames[0];
                if (textFrame) {
                    textFrame.remove();
                }
                // progress.increment();
            }

            app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
            progress.increment();
        }
    }



    function OLD_SLOW_removeATextFrameWhichStartWithaWord(myText) { //valabilitate
        progress.display("Deleting specific ornament text");

        // var keyWord = "valabilitate";
        var keyWord = myText
        var doc = app.activeDocument;
        for (var m = 0; m < keyWord.length; m++) {    // Get the active document
            // Iterate through all text frames in the document
            progress.set(doc.textFrames.length);
            for (var i = doc.textFrames.length - 1; i >= 0; i--) {
                var textFrame = doc.textFrames[i];

                // Check if the text frame's content starts with "valabilitate"
                if (textFrame.contents.indexOf(keyWord[m]) === 0) {
                    // Remove the text frame
                    textFrame.remove();
                }
                progress.increment();
            }
        }


    }


    ///-----------------------final clean custom 2 end
    progress.display("Saving document");

    var savedocDoi = app.activeDocument.save(File(myFile_path + "/" + myFile_nameNoeExt + "_workBD_final.indd"));

    // invisibleLayers.remove();


    try {
        for (var i = 0; i < numbersOfLayers; i++) {

            var name = "original_layer_" + i;
            // app.activeDocument.layers.itemByName(name).visible = false;
            app.activeDocument.layers.itemByName(name).remove();

        }

        app.activeDocument.layers.itemByName("newLayer_Prices_work").remove();

    } catch (e) { }



    progress.close();
    alert("done")


}
