
const { ImageSource } = require("tns-core-modules/image-source");
const {QrGenerator} = require("nativescript-qr-generator");
var httpModule = require("tns-core-modules/http");
var appSettings = require("tns-core-modules/application-settings");

var BackgroundFetch = require("nativescript-background-fetch").BackgroundFetch;
var LocalNotifications = require("nativescript-local-notifications").LocalNotifications;

var page
var userCode

exports.onPageLoaded = function(args){
  BackgroundFetch.configure({
    minimumFetchInterval: 1,
    stopOnTerminate: false,
    startOnBoot: true,
    enableHeadless: false,
    
}, () => {

    LocalNotifications.schedule([{
        id: 1,
        title: 'The first title',
        body: 'The first  body',
        ticker: 'The ticker',
        badge: 1,
        sound: "sound1", //sound1 from /Appresources/raw/ folder
        at: new Date(new Date().getTime() + (1 * 1000)) 
      }]).then(
          function() {
            console.log("Notification scheduled 1");
          },
          function(error) {
            console.log("scheduling error: " + error);
          }
      )
    console.log("[BackgroundFetch] Event Received!");
  
    // BackgroundFetch.finish();
}, (error) => {
    console.log("[BackgroundFetch] FAILED");
    console.log(error);
});
  
BackgroundFetch.start(() => {
  
    console.log("BackgroundFetch successfully started");
}, (status) => {
    console.log("BackgroundFetch failed to start: ", status);
});
  
   
    page = args.object
    
    
    userCode = appSettings.getString("userCode","vacio");

    // verificar que existe la variable codeUser
    if(userCode==='vacio'){
      // alert('El userCode estaba ' + userCode)
      // codigo vacio, hacer la peticion al servidor
      obtenerCodigo().then((codigo) =>{
             
          appSettings.setString("userCode", codigo)
          generarQR(codigo)
         

        }).catch((e) =>{
          alert(e)
        })
      
      
    }else{
      // obtener el valor de codeUser y generar QR
      generarQR(userCode)
    }
     
}


function generarQR(codigoStr){

  const result = new QrGenerator().generate(codigoStr);
  const source = new ImageSource(result);

  page.bindingContext = {      
    imageSource:source,        
    codigo:appSettings.getString("userCode","vacio")
  }
}


function obtenerCodigo(){

  return new Promise((resolve,reject) => {
    
    httpModule.request({
      // url: "http://10.0.2.2:8000/api/codigos",
      // url: "https://www.covidcinvestav.com/index.php?r=individuo/getcode",
      url: "https://www.covidcinvestav.com/index.php?r=api/codigo",
      // url: "http://192.168.1.64:8000/api/codigos",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
        "username": "individuo",
        "pwd":"jvW13%b2020"
      })
      }).then(response => {
        return response.content.toJSON()

      }).then(data => {
        
        resolve(data['clave']);

      }).catch((e) => {
          reject(e);
      })  
  });
  
}



exports.backHome = function(){    
    page.frame.goBack()
   }
   

