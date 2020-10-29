
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
        alert('Debes aceptar los terminos y condiciones para proceder');
    }else{
        page.frame.navigate("views/home/home");
        appSettings.setString("vistoTerminos","Si");
    }

    // alert(' valor de checkbx = ' + checkBox.checked);

 }