const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
var appSettings = require("tns-core-modules/application-settings");
var httpModule = require("tns-core-modules/http");
var BackgroundFetch = require("nativescript-background-fetch").BackgroundFetch;
var LocalNotifications = require("nativescript-local-notifications").LocalNotifications;

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
      
    // page.frame.navigate("views/qr-view/qr-view");
}

exports.goQR = goQR;

function goContact() {
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
    // page.frame.navigate("views/contact-us/contact-us");
}
exports.goContact = goContact;

function goToHistory() {
    BackgroundFetch.finish();
    // page.frame.navigate("views/history/history");
}


exports.goToHistory = goToHistory;




