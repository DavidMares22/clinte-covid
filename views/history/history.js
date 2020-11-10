
const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const httpModule = require("tns-core-modules/http");
var appSettings = require("tns-core-modules/application-settings");

let page
 


var obj =  fromObject({
    taskList : new ObservableArray([
    ]), 
    busy:true
});



exports.onPageLoaded = function(args){
   alert(appSettings.getString("userCode","vacio"))
    page = args.object
    page.bindingContext = obj
    
    while((obj.taskList).length){
        obj.taskList.pop()
    }

   obtenerDatos()
}

function obtenerDatos(){
    
    if(appSettings.getString("userCode","vacio")==='vacio'){
        alert('Necesitas generar un codigo')
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
                            title:'vacio',
                        });
                    }   
                }
                obj.set('busy',false)
        }).catch((e) => {
            alert(e) // imprimir errores
        })
    }
}




exports.backHome = function(){    
 page.frame.goBack()
}

