import { component  } from "./component";
import { model  } from "./model";
import { loading } from "./loading";
import { click } from "./click";
import Alpine from "alpinejs";


// Alpine.prefix("arc-");
import morph from '@alpinejs/morph'
 
window.Alpine = Alpine
Alpine.plugin(morph)

document.addEventListener('alpine:init', () => {
    Alpine.directive('arc-model', model); 
    Alpine.directive('arc-click', click); 
    Alpine.directive('arc-loading', loading); 
});

document.addEventListener('alpine:init', () => {
    document.querySelectorAll('[arc\\:component]').forEach(el => {
        const comp = component(el);  
        el.__component = comp;       
        comp.init();                
        el.setAttribute('x-data', `() => __arcComponent($el)`);  
    });
});

window.__arcComponent = component;

Alpine.start();
