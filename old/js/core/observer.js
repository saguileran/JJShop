/*==========================================================
    SCROLL.JS
    Global Scroll Manager
==========================================================*/

"use strict";

/**
 * ==========================================================
 *  GLOBAL SCROLL MANAGER
 * ==========================================================
 */

class ScrollManager{

    constructor(){

        this.subscribers=[];

        this.lastY=window.scrollY;

        this.currentY=window.scrollY;

        this.delta=0;

        this.direction="down";

        this.ticking=false;

        this.bind();

    }

    /*
    ==========================================================
        LISTENER
    ==========================================================
    */

    bind(){

        window.addEventListener(

            "scroll",

            ()=>this.request(),

            {
                passive:true
            }

        );

    }

    /*
    ==========================================================
        REQUEST ANIMATION FRAME
    ==========================================================
    */

    request(){

        if(this.ticking){

            return;

        }

        this.ticking=true;

        requestAnimationFrame(()=>{

            this.update();

            this.ticking=false;

        });

    }

    /*
    ==========================================================
        UPDATE
    ==========================================================
    */

    update(){

        this.currentY=window.scrollY;

        this.delta=this.currentY-this.lastY;

        this.direction=this.delta>0
            ? "down"
            : "up";

        this.notify();

        this.lastY=this.currentY;

    }

    /*
    ==========================================================
        SUBSCRIBE
    ==========================================================
    */

    subscribe(callback){

        this.subscribers.push(callback);

    }

    /*
    ==========================================================
        UNSUBSCRIBE
    ==========================================================
    */

    unsubscribe(callback){

        this.subscribers=

            this.subscribers.filter(

                fn=>fn!==callback

            );

    }

    /*
    ==========================================================
        NOTIFY
    ==========================================================
    */

    notify(){

        const state={

            y:this.currentY,

            lastY:this.lastY,

            delta:this.delta,

            direction:this.direction

        };

        this.subscribers.forEach(

            callback=>callback(state)

        );

    }

}

/*==========================================================
    EXPORT
==========================================================*/

export const Scroll=new ScrollManager();