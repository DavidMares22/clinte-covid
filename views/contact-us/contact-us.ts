
var fecha = require('fecha');
var Dialogs = require("ui/dialogs");
var httpModule = require("tns-core-modules/http");
var appSettings = require("tns-core-modules/application-settings");
var Dialogs = require("ui/dialogs");

let date
let maxDate = new Date();
let minDate = new Date();
var page

minDate.setDate(maxDate.getDate()-5)

exports.onPageLoaded = function(args){
   page = args.object;
   
   
   
   
}


exports.onDatePickerLoaded = function(args){

     page = args.object;
     page.bindingContext = {
             minDate:minDate,
             maxDate:maxDate,
        
         }
    }
    
function enviar(fechaContagio){
   
   httpModule.request({
      url: "http://10.0.2.2:80/post/create",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
         "title":appSettings.getString("userCode","vacio"),
         "body":fechaContagio
      })
  }).then(response => {
     console.log(response.content.toJSON());
  }).catch((e) => {
     console.log(e);
     Dialogs.alert({
      title: "Error de conexion",
      message: "Por favor, intente comunicar diagnóstico de nuevo más tarde.",
      okButtonText: "Ok"
  }).then(function () {
      // console.log("Dialog closed!");
  });
   
  })


}
 

exports.getTap = function () {
    date = page.getViewById("date");
    var fechaContagio = fecha.format(date.date, 'YYYY-MM-DD');
    const checkBox = page.getViewById('myCheckbox');
   //  alert(fechaContagio+ '\n' +' valor de checkbx = ' + checkBox.checked);

   if(checkBox.checked){

      Dialogs.confirm({
         title: "Comunicar diagnóstico",
         message: "Al pulsar en aceptar se enviará una alerta de forma anónima a las personas que pudieron haber estado en contacto contigo.",
         okButtonText: "Aceptar",
         cancelButtonText: "Cancelar",
     }).then(function (result) {
         
         // console.log("Dialog result: " + result);

         if(result){
            enviar(fechaContagio);
         }

     });
   }else{
      Dialogs.alert({
         title: "Confirma para continuar",
         message: "Debes confirmar que recibiste un diagnóstico positivo",
         okButtonText: "Ok",    
     });
   }

 }

 exports.backHome = function(){    
    page.frame.goBack()
   }