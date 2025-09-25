import { component  } from "./component";
import { model  } from "./model";
import { loading } from "./loading";
import { submit } from "./submit";
import { click } from "./click";
import Alpine from "alpinejs";
import morph from '@alpinejs/morph'
 
window.Alpine = Alpine
Alpine.plugin(morph)
Alpine.prefix('arc-');

document.addEventListener('alpine:init', () => {
    Alpine.directive('model', model); 
    Alpine.directive('click', click); 
    Alpine.directive('loading', loading); 
    Alpine.directive('submit', submit);

});

document.addEventListener('alpine:init', () => {
    document.querySelectorAll('[arc\\:component]').forEach(el => {
        const comp = component(el);  
        el.__component = comp;       
        comp.init();                
        el.setAttribute('arc-data', `() => __arcComponent($el)`);  
    });
});

window.__arcComponent = component;

Alpine.start();
