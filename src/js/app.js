import { component  } from "./component";
import { model  } from "./model";
import { setupLoading } from "./loading";
import { click } from "./click";

setupLoading();


document.addEventListener('alpine:init', () => {
    Alpine.directive('arc-model', model); 
    Alpine.directive('arc-click', click); 
});


document.addEventListener('alpine:init', () => {
    document.querySelectorAll('[arc\\:component]').forEach(el => {
        const comp = component(el);   // your component() factory
        el.__component = comp;        // attach to DOM
        comp.init();                  // initialize state dynamically
        el.setAttribute('x-data', `() => __arcComponent($el)`); // for Alpine
        Alpine.initTree(el);
    });
});

window.__arcComponent = component;

