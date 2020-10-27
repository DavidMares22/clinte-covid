import { Label } from "@nativescript/core";


let page
let date
let maxDate = new Date();
let minDate = new Date();

minDate.setDate(maxDate.getDate()-5)

exports.onPageLoaded = function(args){
   page = args.object;
   
   
   
   
}


exports.onDatePickerLoaded = function(args){

    //  page = args.object;
    //  page.bindingContext = {
        //      minDate:minDate,
        //      maxDate:maxDate,
        
        //  }
    }
    
 

exports.getTap = function () {
    var bottle = page.getViewById("txt");
    console.log("Height: " + bottle.text);
 }