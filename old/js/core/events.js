/*==========================================================
    EVENTS.JS
    Global Event Bus
==========================================================*/

"use strict";

/**
 * ==========================================================
 * EVENT BUS
 * ==========================================================
 */

class EventBus{

    constructor(){

        this.events=new Map();

    }

    /*
    ==========================================================
        SUBSCRIBE
    ==========================================================
    */

    on(event,callback){

        if(!this.events.has(event)){

            this.events.set(event,new Set());

        }

        this.events.get(event).add(callback);

        return ()=>this.off(event,callback);

    }

    /*
    ==========================================================
        SUBSCRIBE ONCE
    ==========================================================
    */

    once(event,callback){

        const wrapper=(payload)=>{

            callback(payload);

            this.off(event,wrapper);

        };

        this.on(event,wrapper);

    }

    /*
    ==========================================================
        EMIT
    ==========================================================
    */

    emit(event,payload={}){

        if(!this.events.has(event)){

            return;

        }

        this.events.get(event).forEach(

            callback=>callback(payload)

        );

    }

    /*
    ==========================================================
        REMOVE ONE
    ==========================================================
    */

    off(event,callback){

        if(!this.events.has(event)){

            return;

        }

        this.events.get(event).delete(callback);

    }

    /*
    ==========================================================
        REMOVE ALL OF EVENT
    ==========================================================
    */

    clear(event){

        if(this.events.has(event)){

            this.events.delete(event);

        }

    }

    /*
    ==========================================================
        REMOVE EVERYTHING
    ==========================================================
    */

    destroy(){

        this.events.clear();

    }

    /*
    ==========================================================
        EXISTS?
    ==========================================================
    */

    has(event){

        return this.events.has(event);

    }

    /*
    ==========================================================
        COUNT
    ==========================================================
    */

    count(event){

        if(!this.events.has(event)){

            return 0;

        }

        return this.events.get(event).size;

    }

    /*
    ==========================================================
        DEBUG
    ==========================================================
    */

    debug(){

        console.table(

            [...this.events.entries()]

            .map(([name,list])=>({

                event:name,

                listeners:list.size

            }))

        );

    }

}

/*==========================================================
    EXPORT
==========================================================*/

export const Events=new EventBus();