export function setupWireEvents() {
    
    document.addEventListener("wire:loading.start", e => {  
        let componentEl = document.getElementById(e.detail.component);
        if (!componentEl) return;

        componentEl.querySelectorAll("[wire\\:loading]").forEach(el => {
            el.style.display = "inline-flex";
        });
    });

    document.addEventListener("wire:loading.stop", e => {
        let componentEl = document.getElementById(e.detail.component);
        if (!componentEl) return;

        componentEl.querySelectorAll("[wire\\:loading]").forEach(el => {  
            el.style.display = "none";
        });
    });
}
