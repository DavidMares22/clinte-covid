import { HelloWorldModel } from "./main-view-model";
import { Accuracy } from "@nativescript/core/ui/enums";
import * as geolocation from "nativescript-geolocation";
var httpModule = require("tns-core-modules/http");

declare var android: any;
let vmModule: HelloWorldModel = null;
var page;

export function pageLoaded(args) {
  page = args.object;
  vmModule = new HelloWorldModel();
  page.bindingContext = vmModule;
}

export function getRecomendation(result) {
//   alert(`${result.latitude} ${result.longitude}`);
httpModule.request({
      
    url: "http://10.0.2.2:5000/recommendation",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    content: JSON.stringify({
        "latitude":  result.latitude,
        "longitude":  result.longitude
    })
    }).then(response => {
    //   return response.content.toJSON()
      return JSON.parse(response.content)

    }).then(data => {
      
      console.log(data["recommendations:"]);

    }).catch((e) => {
        console.log("sooo",e);
    })  

}

var mapView = null;

export function onMapReady(args) {
  mapView = args.object;

  console.log("onMapReady");
  mapView.settings.compassEnabled = true;

  geolocation.isEnabled().then(
    function (isEnabled) {
      if (!isEnabled) {
        // GPS is not enabled

        geolocation
          .enableLocationRequest(true, true)
          .then(
            () => {
              console.log("Enabling My Location..");
              mapView.myLocationEnabled = true;
              geolocation
                .getCurrentLocation({
                  desiredAccuracy: Accuracy.high,
                  maximumAge: 5000,
                  timeout: 20000,
                })
                .then((result) => {
                //   console.log("loc result", result);
                  vmModule.set("latitude", result.latitude);
                  vmModule.set("longitude", result.longitude);
                })
                .catch((e) => {
                  console.log("loc error", e);
                });
            },
            (e) => {
              console.log("error: " + (e.message || e));
            }
          )
          .catch((ex) => {
            console.log("Unable to Enable Location", ex);
          });
      } else {
        // GPS is enabled
        console.log("Enabling My Location..");
        mapView.myLocationEnabled = true;
        geolocation
          .getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000,
            timeout: 20000,
          })
          .then((result) => {
            // console.log("loc result", result);
            vmModule.set("latitude", result.latitude);
            vmModule.set("longitude", result.longitude);

            getRecomendation(result);
          })
          .catch((e) => {
            console.log("loc error", e);
          });
      }
    },
    function (e) {
      console.log("error: " + (e.message || e));
    }
  );
}

export function backHome() {
  page.frame.goBack();
}
