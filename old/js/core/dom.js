/*==========================================================
    DOM.JS
    Core DOM Utilities
==========================================================*/

"use strict";

export class DOM{

    /*
    ==========================================
        SELECT ONE
    ==========================================
    */

    static $(selector,parent=document){

        return parent.querySelector(selector);

    }

    /*
    ==========================================
        SELECT ALL
    ==========================================
    */

    static $$(selector,parent=document){

        return [...parent.querySelectorAll(selector)];

    }

    /*
    ==========================================
        CREATE ELEMENT
    ==========================================
    */

    static create(tag,className=""){

        const element=document.createElement(tag);

        if(className){

            element.className=className;

        }

        return element;

    }

    /*
    ==========================================
        ADD CLASS
    ==========================================
    */

    static add(element,...classes){

        element.classList.add(...classes);

    }

    /*
    ==========================================
        REMOVE CLASS
    ==========================================
    */

    static remove(element,...classes){

        element.classList.remove(...classes);

    }

    /*
    ==========================================
        TOGGLE CLASS
    ==========================================
    */

    static toggle(element,className){

        element.classList.toggle(className);

    }

    /*
    ==========================================
        HAS CLASS
    ==========================================
    */

    static has(element,className){

        return element.classList.contains(className);

    }

    /*
    ==========================================
        ATTRIBUTE
    ==========================================
    */

    static attr(element,name,value){

        if(value===undefined){

            return element.getAttribute(name);

        }

        element.setAttribute(name,value);

    }

    /*
    ==========================================
        DATA ATTRIBUTE
    ==========================================
    */

    static data(element,name){

        return element.dataset[name];

    }

    /*
    ==========================================
        EVENT
    ==========================================
    */

    static on(element,event,callback,options={}){

        element.addEventListener(

            event,

            callback,

            options

        );

    }

    /*
    ==========================================
        MULTIPLE EVENTS
    ==========================================
    */

    static onAll(elements,event,callback){

        elements.forEach(el=>{

            el.addEventListener(

                event,

                callback

            );

        });

    }

    /*
    ==========================================
        REMOVE EVENT
    ==========================================
    */

    static off(element,event,callback){

        element.removeEventListener(

            event,

            callback

        );

    }

}