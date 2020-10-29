var appSettings = require("tns-core-modules/application-settings");


 exports.onNavigatedTo = function(args){
    page = args.object;
    // var visto = appSettings.getString("vistoTerminos","No")
  
    // if(visto==="Si"){
    //    const options1 = {
    //         mooduleName:"views/home/home",
    //         clearHistory:true
    //     }
    //     page.frame.navigate(options1);
        
    // }else{
    //    const options2 = {
    //         mooduleName:"views/terminos/terminos",
    //         clearHistory:true
    //     }
    //     page.frame.navigate(options2);
    
    // }
    
    
 }

exports.onPageLoaded = function(args) {
    
    page = args.object;

    page.actionBarHidden = true;
    var visto = appSettings.getString("vistoTerminos","No")
  
    if(visto==="Si"){
       const options1 = {
            moduleName:"views/home/home",
            clearHistory:true
        }
        page.frame.navigate(options1);
        
    }else{
       const options2 = {
            moduleName:"views/terminos/terminos",
            clearHistory:true
        }
        page.frame.navigate(options2);
    
    }
}

