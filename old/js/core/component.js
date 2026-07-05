/*==========================================================
    COMPONENT.JS
    Base Component Class
==========================================================*/

"use strict";

import {DOM} from "./dom.js";
import {Events} from "./events.js";
import {Observer} from "./observer.js";
import {Scroll} from "./scroll.js";

export default class Component{

    constructor(root,options={}){

        this.root=root;

        this.options=options;

        this.initialized=false;

        this.destroyed=false;

        this.events=[];

        this.observers=[];

        this.scrollSubscriptions=[];

    }

    /*======================================================
        INIT
    ======================================================*/

    init(){

        if(this.initialized){

            return;

        }

        this.initialized=true;

    }

    /*======================================================
        DESTROY
    ======================================================*/

    destroy(){

        if(this.destroyed){

            return;

        }

        this.removeDOMEvents();

        this.removeScrollListeners();

        this.disconnectObservers();

        this.destroyed=true;

    }

    /*======================================================
        DOM EVENTS
    ======================================================*/

    on(element,event,callback,options={}){

        if(!element){

            return;
        }

        DOM.on(

            element,

            event,

            callback,

            options

        );

        this.events.push({

            element,

            event,

            callback

        });

    }

    /*======================================================
        REMOVE EVENTS
    ======================================================*/

    removeDOMEvents(){

        this.events.forEach(item=>{

            DOM.off(

                item.element,

                item.event,

                item.callback

            );

        });

        this.events=[];

    }

    /*======================================================
        SCROLL
    ======================================================*/

    onScroll(callback){

        Scroll.subscribe(callback);

        this.scrollSubscriptions.push(callback);

    }

    removeScrollListeners(){

        this.scrollSubscriptions.forEach(callback=>{

            Scroll.unsubscribe(callback);

        });

        this.scrollSubscriptions=[];

    }

    /*======================================================
        OBSERVER
    ======================================================*/

    observe(config){

        Observer.observe(config);

        this.observers.push(config);

    }

    disconnectObservers(){

        this.observers.forEach(item=>{

            Observer.unobserve(

                item.element,

                item.observer

            );

        });

        this.observers=[];

    }

    /*======================================================
        EVENT BUS
    ======================================================*/

    emit(event,data={}){

        Events.emit(event,data);

    }

    listen(event,callback){

        return Events.on(

            event,

            callback

        );

    }

    /*======================================================
        SHORTCUTS
    ======================================================*/

    $(selector,parent=this.root){

        return DOM.$(

            selector,

            parent

        );

    }

    $$(selector,parent=this.root){

        return DOM.$$(

            selector,

            parent

        );

    }

    /*======================================================
        ROOT
    ======================================================*/

    setRoot(root){

        this.root=root;

    }

}