export function component(el) {
    return {
        id: el.id,
        component: el.dataset.component || null,
        state: {},
        init() { 
            if (el.dataset.state) {
                this.state = JSON.parse(el.dataset.state);
            }
        },
    };
}