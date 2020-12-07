const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
var appSettings = require("tns-core-modules/application-settings");
var httpModule = require("tns-core-modules/http");


let page;

var obj = fromObject({
    taskList : new ObservableArray([
    ]), 
    IsBusy:true
});
function onPageLoaded(args) {
    page = args.object;
    
    page.bindingContext = obj
    obj.set('IsBusy',true)
    
     while((obj.taskList).length){
         obj.taskList.pop()
     }
    
    // let keys = appSettings.getAllKeys() 
    // alert(keys)

    buscarNotificacion();


    //  page.bindingContext = {
    //     codigo:appSettings.getString("userCode","vacio")
    // }
    
}

function buscarNotificacion(){
    httpModule.request({
        
        url: "https://www.covidcinvestav.com/index.php?r=api/seguimientocontacto",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            "Individuo":
            {
        "codigo":appSettings.getString("userCode","vacio")
            },
            "LoginForm":
            {
                "username":"negocio",
                "password":"jvW13%b2020"
            }
        })
        }).then(response => {
          return response.content.toJSON()
  
        }).then(data => {
            if(data.length){  // 2 o más elementos
                data.forEach((task)=>{
                    obj.taskList.push({
                        title:(task.nombre +' - '+task.fechavisita+ ' #'+task.idvisita),
                    })
                })
            }else{
               
                    obj.taskList.push({
                        title:'No tienes nuevas notificaciones',
                    });
                  
            }
            // console.log(data)
            obj.set('IsBusy',false)
        }) 
}

// exports.removerCodigo = function(){    
     
//     appSettings.remove("vistoTerminos")
//     page.bindingContext = {
//         codigo:appSettings.remove("userCode")
//     }
    
//    }
   


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




