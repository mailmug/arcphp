export function component(el) {
    return {
        id: el.id,
        component: el.dataset.component || null,
        state: {},

        init() { 
            if (el.dataset.state) {
                this.state = JSON.parse(el.dataset.state);
            }

            this.updateBindings();
        },

        async callMethod(method) {
            el.dispatchEvent(new CustomEvent('arc:loading.start', {
                detail: { component: this.component, method },
                bubbles: true
            }));

            let res;
            try {
                res = await fetch("arcphp.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        component: this.component,
                        method: method,
                        id: this.id,
                        state: this.state
                    })
                });
            } finally {
                el.dispatchEvent(new CustomEvent('arc:loading.stop', {
                    detail: { component: this.component, method },
                    bubbles: true
                }));
            }

            const json = await res.json();

            // Update state and morph HTML
            if (json.state) this.state = json.state;
            if (json.html) Alpine.morph(el, json.html);
            this.updateBindings();
        },

        updateBindings() {
            Object.keys(this.state).forEach(key => {
                el.querySelectorAll(`[arc-text="${key}"]`).forEach(span => {
                    span.textContent = this.state[key];
                });
            });
        }
    };
}