
const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const httpModule = require("tns-core-modules/http");

let page


var obj =  fromObject({
    taskList : new ObservableArray([
    ]), 
});



exports.onPageLoaded = function(args){
   
    page = args.object
    page.bindingContext = obj
    
    while((obj.taskList).length){
        obj.taskList.pop()
    }

   obtenerDatos()
}

function obtenerDatos(){
    httpModule.request({
        url: "https://jsonplaceholder.typicode.com/todos/?_limit=10",
        method: "GET"
    }).then(response => {
        return res = response.content.toJSON();
    }).then(data => {

            if(data.length){  // 2 o más elementos
                data.forEach((task)=>{
                    obj.taskList.push({
                        title:task.title,
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
    }).catch((e) => {
        alert(e) // imprimir errores
    })
}




exports.backHome = function(){    
 page.frame.goBack()
}

