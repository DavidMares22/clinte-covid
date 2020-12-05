
var appSettings = require("tns-core-modules/application-settings");
var Dialogs = require("ui/dialogs");


var page

// var visto = false



exports.onPageLoaded = function(args){
    page = args.object;  
    
 }


 exports.onNavigatedTo = function(args){
    page = args.object;

    
 }




exports.getTap = function () {
    
    const checkBox = page.getViewById('aceptar');

    if(checkBox.checked === false){
        Dialogs.alert({
            title: "",
            message: "Debes aceptar el aviso de privacidad.",
            okButtonText: "Ok"
        }).then(function () {
            // console.log("Dialog closed!");
        });
        
    }else{
        appSettings.setString("vistoTerminos","Si");
        const options1 = {
            moduleName:"views/home/home",
            clearHistory:true
        }
        page.frame.navigate(options1);
    
    }

    // alert(' valor de checkbx = ' + checkBox.checked);

 }