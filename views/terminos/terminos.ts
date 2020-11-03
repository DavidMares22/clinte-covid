
var appSettings = require("tns-core-modules/application-settings");



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
        alert('Debes aceptar el aviso de privacidad');
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