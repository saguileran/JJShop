/*==========================================================
    ANIMATION.JS
    Global Animation Engine
==========================================================*/

"use strict";

class AnimationEngine{

    constructor(){

        this.running=new WeakSet();

    }

    /*======================================================
        ADD ANIMATION
    ======================================================*/

    play(element,animation){

        if(!element){

            return;
        }

        element.classList.add(animation);

        this.running.add(element);

        const finish=()=>{

            element.classList.remove(animation);

            element.removeEventListener(

                "animationend",

                finish

            );

            this.running.delete(element);

        };

        element.addEventListener(

            "animationend",

            finish

        );

    }

    /*======================================================
        FADE
    ======================================================*/

    fadeIn(element){

        this.play(

            element,

            "animate-fade-in"

        );

    }

    fadeOut(element){

        this.play(

            element,

            "animate-fade-out"

        );

    }

    /*======================================================
        SLIDE
    ======================================================*/

    slideLeft(element){

        this.play(

            element,

            "animate-slide-left"

        );

    }

    slideRight(element){

        this.play(

            element,

            "animate-slide-right"

        );

    }

    slideUp(element){

        this.play(

            element,

            "animate-slide-up"

        );

    }

    slideDown(element){

        this.play(

            element,

            "animate-slide-down"

        );

    }

    /*======================================================
        ZOOM
    ======================================================*/

    zoomIn(element){

        this.play(

            element,

            "animate-zoom-in"

        );

    }

    zoomOut(element){

        this.play(

            element,

            "animate-zoom-out"

        );

    }

    /*======================================================
        ROTATE
    ======================================================*/

    rotate(element){

        this.play(

            element,

            "animate-rotate"

        );

    }

    /*======================================================
        STAGGER
    ======================================================*/

    stagger(elements,animation,delay=100){

        elements.forEach(

            (element,index)=>{

                setTimeout(

                    ()=>{

                        this.play(

                            element,

                            animation

                        );

                    },

                    index*delay

                );

            }

        );

    }

    /*======================================================
        IS RUNNING
    ======================================================*/

    isRunning(element){

        return this.running.has(element);

    }

}

export const Animation=new AnimationEngine();