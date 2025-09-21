export async function setupArcActions() {
    document.addEventListener("click", async (e) => {  
    if (e.target.hasAttribute("arc:click")) {
        let method = e.target.getAttribute("arc:click");
        let componentEl = e.target.closest("div[id^='cmp_']");
        let id = componentEl.getAttribute("id");

        let state = {};
        componentEl.querySelectorAll("[arc\\:model]").forEach(el => {
            const key = el.getAttribute("arc:model");
            let value;

            switch (el.tagName) {
                case "INPUT":
                    switch (el.type.toLowerCase()) {
                        case "checkbox":
                            value = el.checked;
                            break;
                        case "radio":
                            if (!el.checked) return;  
                            value = el.value;
                            break;
                        default:
                            value = el.value;
                    }
                    break;

                case "TEXTAREA":
                    value = el.value;
                    break;

                case "SELECT":
                    value = el.multiple
                        ? Array.from(el.selectedOptions).map(opt => opt.value)
                        : el.value;
                    break;

                default:
                    value = el.innerText;
            }
            state[key] = value;
        });


        let startEvent = new CustomEvent('arc:loading.start', {
            detail: { component: id, method: method }, bubbles: true
        });
        componentEl.dispatchEvent(startEvent);
        
        let res;
        try{
            res = await fetch("arcphp.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    component: "Counter",
                    method: method,
                    id: id,
                    state: state
                })
            })
        } finally {
            let stopEvent = new CustomEvent('arc:loading.stop', {
                detail: { component: id, method: method }, bubbles: true
            });
            componentEl.dispatchEvent(stopEvent);
        };

        let json = await res.json();

        Alpine.morph(componentEl, json.html);
        }
    });
}