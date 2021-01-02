import { HelloWorldModel } from "./main-view-model";
import * as mapsModule from "nativescript-google-maps-sdk";
import * as permissions from "nativescript-permissions";
import {Application, Color} from "@nativescript/core";
import { Accuracy } from "@nativescript/core/ui/enums"
import * as geolocation from "nativescript-geolocation";


declare var android: any;
let vmModule: HelloWorldModel = null;
var page;


export function pageLoaded(args) {
    page = args.object;
    vmModule = new HelloWorldModel();
    page.bindingContext = vmModule;
}

 

 
 

var mapView = null;

export function onMapReady(args) {
    mapView = args.object;

    console.log("onMapReady");
    mapView.settings.compassEnabled = true;
    

    geolocation.isEnabled().then(function(isEnabled) {
        
        if (!isEnabled) { // GPS is not enabled
            
            geolocation.enableLocationRequest(true, true).then(() => {
                console.log("Enabling My Location..");
                mapView.myLocationEnabled = true;
                geolocation.getCurrentLocation({
                    desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000
                    })
                    .then(result => {
                        console.log('loc result', result);
                        vmModule.set("latitude",result.latitude);
                        vmModule.set("longitude", result.longitude);
                    })
                    .catch(e => {
                        console.log('loc error', e);
                    });
            }, (e) => {
                console.log("error: " + (e.message || e));
            }).catch(ex => {
                console.log("Unable to Enable Location", ex);
            });
        } else {
            
            // GPS is enabled
            console.log("Enabling My Location..");
            mapView.myLocationEnabled = true;
            geolocation.getCurrentLocation({
                desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000
                })
                .then(result => {
                    console.log('loc result', result);
                    vmModule.set("latitude",result.latitude);
                    vmModule.set("longitude", result.longitude);
                })
                .catch(e => {
                    console.log('loc error', e);
                });
                
                
            }
    }, function(e) {
        console.log("error: " + (e.message || e));
    });

    
}

export function backHome(){    
    page.frame.goBack()
   }

