import { Observable } from "@nativescript/core";


export class HelloWorldModel extends Observable {
    constructor() {
        super();
        // this.set("latitude", -33.86);
        // this.set("longitude", 151.20);
        this.set("zoom", 13);
        this.set("minZoom", 0);
        this.set("maxZoom", 22);
        this.set("padding", [80, 40, 40, 40]);
        this.set("mapAnimationsEnabled", true);
    }
}