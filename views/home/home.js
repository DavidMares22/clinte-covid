
var appSettings = require("tns-core-modules/application-settings");

let page;

function onPageLoaded(args) {
    
     page = args.object;

     
    
    // let keys = appSettings.getAllKeys() 
    // alert(keys)



     page.bindingContext = {
        codigo:appSettings.getString("userCode","vacio")
    }
    
}


exports.removerCodigo = function(){    
     
    appSettings.remove("vistoTerminos")
    page.bindingContext = {
        codigo:appSettings.remove("userCode")
    }
    
   }
   


exports.onPageLoaded = onPageLoaded;

function goQR() {
    
    page.frame.navigate("views/qr-view/qr-view");
}

exports.goQR = goQR;

function goContact() {
    
    page.frame.navigate("views/contact-us/contact-us");
}
exports.goContact = goContact;

function goToHistory() {
    
    page.frame.navigate("views/history/history");
}


exports.goToHistory = goToHistory;




