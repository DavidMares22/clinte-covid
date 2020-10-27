
const { ImageSource } = require("tns-core-modules/image-source");
const {QrGenerator} = require("nativescript-qr-generator");
const httpModule = require("tns-core-modules/http");
const appSettings = require("tns-core-modules/application-settings");


let page

let userCode

exports.onPageLoaded = function(args){
   
    page = args.object
    
    
    userCode = appSettings.getString("userCode","vacio");

    // verificar que existe la variable codeUser
    if(userCode==='vacio'){
      alert('El userCode estaba ' + userCode)
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
      url: "http://10.0.2.2:8000/api/codigos",
      // url: "http://192.168.1.64:8000/api/codigos",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
          clave:''
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
   

