/*==========================================================
    NAVBAR COMPONENT
==========================================================*/

"use strict";

import {DOM} from "../core/dom.js";
import {Scroll} from "../core/scroll.js";
import {Events} from "../core/events.js";

export default class Navbar extends Component{

    constructor(root){

        super(root);

        this.header=root;

        this.drawer=this.$(".navbar__drawer");

        this.overlay=this.$(".navbar__overlay");

        this.toggle=this.$(".navbar__toggle");

        this.closeButton=this.$(".navbar__drawer-close");

        this.desktopLinks=this.$$(".navbar__menu a");

        this.mobileLinks=this.$$(".navbar__drawer-menu a");

    }

    /*======================================================
        INIT
    ======================================================*/

    init(){

        super.init();

        this.registerEvents();

        this.registerScroll();

    }

    /*======================================================
        EVENTS
    ======================================================*/

    registerEvents(){

        this.on(

            this.toggle,

            "click",

            ()=>this.open()

        );

        this.on(

            this.closeButton,

            "click",

            ()=>this.close()

        );

        this.on(

            this.overlay,

            "click",

            ()=>this.close()

        );

        this.on(

            document,

            "keydown",

            (event)=>{

                if(event.key==="Escape"){

                    this.close();

                }

            }

        );

        this.mobileLinks.forEach(link=>{

            this.on(

                link,

                "click",

                ()=>this.close()

            );

        });

    }

    /*======================================================
        SCROLL
    ======================================================*/

    registerScroll(){

        this.onScroll(

            (state)=>{

                this.updateHeader(state);

                this.scrollSpy(state);

            }

        );

    }

    /*======================================================
        OPEN
    ======================================================*/

    open(){

        DOM.add(

            this.drawer,

            "open"

        );

        DOM.add(

            this.overlay,

            "show"

        );

        DOM.add(

            this.toggle,

            "active"

        );

        document.body.style.overflow="hidden";

        this.emit(

            "drawer:opened"

        );

        Animation.slideRight(this.drawer);

        Animation.fadeIn(this.overlay);

    }

    /*======================================================
        CLOSE
    ======================================================*/

    close(){

        DOM.remove(

            this.drawer,

            "open"

        );

        DOM.remove(

            this.overlay,

            "show"

        );

        DOM.remove(

            this.toggle,

            "active"

        );

        document.body.style.overflow="";

        this.emit(

            "drawer:closed"

        );

        Animation.fadeOut(this.overlay);

    }

    /*======================================================
        HEADER
    ======================================================*/

    updateHeader(state){

        if(state.y>40){

            DOM.add(

                this.header,

                "scrolled"

            );

        }

        else{

            DOM.remove(

                this.header,

                "scrolled"

            );

        }

    }

    /*======================================================
        SCROLL SPY
    ======================================================*/

    scrollSpy(){

        const sections=DOM.$$(
            "section[id]"
        );

        let current="";

        sections.forEach(section=>{

            const top=

                section.offsetTop-150;

            if(window.scrollY>=top){

                current=section.id;

            }

        });

        this.updateActive(

            this.desktopLinks,

            current

        );

        this.updateActive(

            this.mobileLinks,

            current

        );

    }

    /*======================================================
        ACTIVE LINKS
    ======================================================*/

    updateActive(links,current){

        links.forEach(link=>{

            DOM.remove(

                link,

                "active"

            );

            if(

                DOM.attr(

                    link,

                    "href"

                )==="#"+current

            ){

                DOM.add(

                    link,

                    "active"

                );

            }

        });

    }

    /*======================================================
        DESTROY
    ======================================================*/

    destroy(){

        super.destroy();

        this.close();

    }

}