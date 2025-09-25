export function submit(el, params) {
    const expression = params.expression;

    el.addEventListener('submit', e => {
        e.preventDefault(); 

        const componentEl = el.closest('[arc\\:component]');
        if (!componentEl || !componentEl.__component) return;

        const payload = {
            action: 'call',
            method: expression,
            id: componentEl.id,
            component: componentEl.getAttribute('arc:component'),
            state: componentEl.__component.state || {},
        };

        let startEvent = new CustomEvent('arc:loading.start', {
            detail: { component: componentEl.id, method: expression }, bubbles: true
        });
        componentEl.dispatchEvent(startEvent);

        fetch('arcphp.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(response => {
            if (response.state) {
                componentEl.__component.state = response.state;
            }
            if (response.html) {
                Alpine.morph(componentEl, response.html, {
                    updating(el, toEl) {
                        if(el.value){
                            el.value = componentEl.__component.state[el.name];
                        }
                    }
                });
            }
            let stopEvent = new CustomEvent('arc:loading.stop', {
                detail: { component: componentEl.id, method: expression }, bubbles: true
            });
            componentEl.dispatchEvent(stopEvent);
        });
    });
}
