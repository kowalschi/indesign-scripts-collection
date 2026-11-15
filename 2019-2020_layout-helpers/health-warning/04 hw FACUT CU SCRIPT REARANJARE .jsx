/**
     * Rectangles ovals polygons    
     */
    
    var main = function() {
        var myDocument = app.activeDocument;
var myPage = myDocument.pages[0];
var guides = myDocument.guides;
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;  
app.documents[0].zeroPoint = [0,0];  
app.documents[0].viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR; 

var myBleeed_ = myDocument.documentPreferences.properties.documentBleedTopOffset;
var bleedPagina = myBleeed_
// var bleedPagina = 0	

        b_pgebounds = myPage.bounds;

        w_t = b_pgebounds[3]-b_pgebounds[1];
        h_t = b_pgebounds[2]-b_pgebounds[0]; 
      
        var m_left = myPage.marginPreferences.left; //mmyX2
        var m_right = myPage.marginPreferences.right; //mmyX1
        var m_top = myPage.marginPreferences.top; //mmyy2
        var m_bottom = myPage.marginPreferences.bottom; //mmyy1
        w = w_t-(2*m_left)
        h = h_t-(2*m_top)
        // alert(m_left/2.8346438836889+" "+" "+m_top/2.8346438836889)
         
        // /2.8346438836889
        
        HW_h_final = (h*0.1);
        SAIZECI_Hwai = (HW_h_final*0.6) // 60% din inaltime lui h
        // Y_HW_final = (h-HW_h_final+2*mmyy2);
        Y_HW_final = (m_top+h-(h*0.1));
        // Y_HW_final = (h-HW_h_final);
	    Y_HW_final_latotal = (h-HW_h_final)+((h_t-h)/2);

        var myHW = app.activeDocument.rectangles.itemByName ("hwul");// HW
        var myHWai = app.activeDocument.rectangles.itemByName ("hwul").rectangles.itemByName ("hwaiul"); // ai ul din HW!!!
        
        myHW.redefineScaling ([1,1]);
        myHWai.redefineScaling ([1,1]);
        
        
        // myHW.move([mmyX2, Y_HW_final]);
        
        myHW.geometricBounds = [Y_HW_final, m_left, h+m_top, w+m_left];//succes
        
        app.activeDocument.align(myHWai, AlignOptions.HORIZONTAL_CENTERS, AlignDistributeBounds.MARGIN_BOUNDS);
       
       
        myHW.fit(FitOptions.CENTER_CONTENT); 
   
        var myBoundsw = myHW.geometricBounds;  // HW dreptunghi alb
        var myYw = myBoundsw[0];
        var myXw = myBoundsw[1];
        var myHw = myBoundsw[2];
        var myWw = myBoundsw[3];
        var W_hw = myHW.geometricBounds[3] - myHW.geometricBounds[1]
        var H_hw = myHW.geometricBounds[2] - myHW.geometricBounds[0];

                                            if (w>h){ // landscape
                                                    var myBoundsw = myHWai.geometricBounds;  // HW dreptunghi alb
                                                    var myYwai = myBoundsw[0];
                                                    var myXwai = myBoundsw[1];
                                                    var myHwai = myBoundsw[2];
                                                    var myWwai = myBoundsw[3];
                                                    var W_hwai = myHWai.geometricBounds[3] - myHWai.geometricBounds[1]
                                                    var H_hwai = myHWai.geometricBounds[2] - myHWai.geometricBounds[0];
                                                
                                                var obj =myHWai
											
												var anchor = app.activeWindow.transformReferencePoint;
												var ow = obj.geometricBounds[3] - obj.geometricBounds[1]
												var oh = obj.geometricBounds[2] - obj.geometricBounds[0];
										
                                               
                                                var pw = HW_h_final*0.7/H_hwai;
											      var ph =pw;
                                             
												var matrix = app.transformationMatrices.add({horizontalScaleFactor: pw, verticalScaleFactor: ph});
												obj.transform(CoordinateSpaces.pasteboardCoordinates, anchor, matrix);

                                            }
                                            if (w<h) // portrait
                                            {
                                                myHWai.geometricBounds = [myYw+(0.1*H_hw), myXw+(0.1*W_hw), h-(0.1*H_hw), w-(0.1*W_hw)];

                                            }

 

        myHWai.fit(FitOptions.PROPORTIONALLY); 
        myHWai.fit(FitOptions.CENTER_CONTENT); 
        myHW.fit(FitOptions.CENTER_CONTENT); 

        myHW.geometricBounds = [Y_HW_final_latotal, -bleedPagina, h_t+bleedPagina, w_t+bleedPagina];

    
}
var u;

app.doScript ( "main()",u,u,UndoModes.ENTIRE_SCRIPT, "The Script" );