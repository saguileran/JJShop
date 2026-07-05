/*==========================================================
    APP.JS
    Bike Workshop Application
==========================================================*/

"use strict";

/*==========================================================
    IMPORTS
==========================================================*/

import {DOM} from "./core/dom.js";
import {Scroll} from "./core/scroll.js";
import {Observer} from "./core/observer.js";
import {Events} from "./core/events.js";

/*
    Los componentes se importarán aquí.
    Ejemplo:

    import Navbar from "./components/navbar.js";
*/

/*==========================================================
    APPLICATION
==========================================================*/

class Application{

    constructor(){

        this.version="1.0.0";

        this.name="Bike Workshop";

        this.debug=true;

        this.services={};

        this.components=new Map();

        this.state={};

    }

    /*======================================================
        CONFIGURATION
    ======================================================*/

    configure(){

        this.services={

            dom:DOM,

            scroll:Scroll,

            observer:Observer,

            events:Events

        };

    }

    /*======================================================
        REGISTER COMPONENT
    ======================================================*/

    register(ComponentClass,options={}){

        const root=options.root
            ? DOM.$(options.root)
            : document;

        const component=new ComponentClass(root,options);

        this.components.set(

            ComponentClass.name,

            component

        );

    }

    /*======================================================
        START COMPONENTS
    ======================================================*/

    startComponents(){

        this.components.forEach(component=>{

        component.init();

    });

    }

    /*======================================================
        STOP COMPONENTS
    ======================================================*/

    destroyComponents(){

        this.components.forEach(component=>{

            component.destroy();

        });

    }

    /*======================================================
        APPLICATION INFO
    ======================================================*/

    info(){

        console.group(

            "%cBike Workshop",

            "color:#2E7D32;font-weight:bold;"

        );

        console.log(

            "Version:",

            this.version

        );

        console.log(

            "Components:",

            this.components.length

        );

        console.log(

            "Debug:",

            this.debug

        );

        console.groupEnd();

    }


    /*======================================================
        GET COMPONENT   
    ======================================================*/

    get(name){

        return this.components.get(name);

    }

    /*======================================================
        START
    ======================================================*/

    start(){

        this.configure();

        this.startComponents();

        if(this.debug){

            this.info();

        }

        Events.emit(

            "application:started",

            {

                version:this.version

            }

        );

    }

}

/*==========================================================
    APPLICATION INSTANCE
==========================================================*/

export const App=new Application();

/*==========================================================
    BOOTSTRAP
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        App.start();

    }

);