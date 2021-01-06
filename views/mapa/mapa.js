import { HelloWorldModel } from "./main-view-model";
import { Accuracy } from "@nativescript/core/ui/enums";
import * as mapsModule from "nativescript-google-maps-sdk";
import * as geolocation from "nativescript-geolocation";
var httpModule = require("tns-core-modules/http");


let vmModule;
var page;

export function pageLoaded(args) {
  page = args.object;
  vmModule = new HelloWorldModel();
  page.bindingContext = vmModule;
}

export async function getRecomendation(result) {
  return new Promise((resolve, reject) => {
    //   alert(`${result.latitude} ${result.longitude}`);
    let rec = [];
    httpModule
      .request({
        url: "http://10.0.2.2:5000/recommendation",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
          latitude: result.latitude,
          longitude: result.longitude,
        }),
      })
      .then((response) => {
        //   return response.content.toJSON()
        return JSON.parse(response.content);
      })
      .then((data) => {
        data["recommendations:"].forEach((element) => {
          // console.log(element.latitude)
          rec.push({
            latitude: element.latitude,
            longitude: element.longitude,
            store: element.store,
            estimated_congestion: element.estimated_congestion,
          });
        });
        // console.log(rec)
        // console.log(data["recommendations:"]);
        resolve(rec);
      })
      .catch((e) => {
        console.log("sooo", e);
        reject(e);
      });
  });
}

var mapView = null;
var results;
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
          .then(async (result) => {
            // console.log("loc result", result);
            vmModule.set("latitude", result.latitude);
            vmModule.set("longitude", result.longitude);

            getRecomendation(result)
              .then((r) => {
                if (r.length > 0) {
                  var markers = [];
                  for (var i = 0; i < r.length; i++) {
                    markers[i] = new mapsModule.Marker();
                    markers[i].position = mapsModule.Position.positionFromLatLng(
                      r[i].latitude,
                      r[i].longitude
                    );
                    // markers[i].title = r[i].store;
                    // markers[i].snippet = r[i].estimated_congestion;
                    
                    markers[i].title = JSON.stringify(r[i].store);
                    markers[i].snippet = JSON.stringify(r[i].estimated_congestion);
                    markers[i].color = "blue";

                    mapView.addMarker(markers[i]);
                  }
                  
                }
              })
              .catch((e) => {
                alert(e);
              });
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

  // var marker = new mapsModule.Marker();
  // marker.position = mapsModule.Position.positionFromLatLng(20.67876716, -103.4288958);
  // marker.title = "Costco";
  // marker.snippet = "congestion";
  // marker.color = "green";

  // mapView.addMarker(marker);
}

export function backHome() {
  page.frame.goBack();
}
