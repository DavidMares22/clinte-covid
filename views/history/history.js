
const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
var httpModule = require("tns-core-modules/http");
var appSettings = require("tns-core-modules/application-settings");
var Dialogs = require("ui/dialogs");

let page
 


var obj =  fromObject({
    taskList : new ObservableArray([
    ]), 
    busy:true
});



exports.onPageLoaded = function(args){
//    alert(appSettings.getString("userCode","vacio"))
    page = args.object
    page.bindingContext = obj
    
    while((obj.taskList).length){
        obj.taskList.pop()
    }

   obtenerDatos()
}

function obtenerDatos(){
    obj.set('busy',true)
    if(appSettings.getString("userCode","vacio")==='vacio'){
        
        Dialogs.alert({
            title: "",
            message: "Necesitas generar un código.",
            okButtonText: "Ok"
        }).then(function () {
            // console.log("Dialog closed!");
        });
        obj.set('busy',false)
        
    }else{

        httpModule.request({
            // url: "https://jsonplaceholder.typicode.com/todos/?_limit=500",
            url: "https://www.covidcinvestav.com/index.php?r=api/historial",
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
            return res = response.content.toJSON();
        }).then(data => {
    
                if(data.length){  // 2 o más elementos
                    data.forEach((task)=>{
                        obj.taskList.push({
                            title:(task.nombre+' - '+task.temperatura+'° - '+task.fechavisita),
                        })
                    })
                }else{
                    
                    if(data.title){  // 1 elemento
                        obj.taskList.push({
                            title:data.title,
                        });
                    }else{
                        obj.taskList.push({
                            title:'No tienes visitas registradas a establecimientos',
                        });
                    }   
                }
                obj.set('busy',false)
        }).catch((e) => {
            // alert(e) 
            Dialogs.alert({
                title: "Error de conexion",
                message: "Por favor, intente acceder al historial de nuevo más tarde.",
                okButtonText: "Ok"
            }).then(function () {
                // console.log("Dialog closed!");
            });
        })
    }
}




exports.backHome = function(){    
 page.frame.goBack()
}

