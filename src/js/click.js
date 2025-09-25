export function click(el, params) {
    const expression = params.expression;

    el.addEventListener('click', e => {
        e.preventDefault(); 

        const component = el.closest('[arc\\:component]');
        if (!component || !component.__component) return;

        const payload = {
            action: 'call',
            method: expression,
            id: component.id,
            component: component.getAttribute('arc:component'),
            state: component.__component.state || {},
        };

        fetch('arcphp.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(response => {
            if (response.state) {
                component.__component.state = response.state;
                console.log(component.__component);
            }
            if (response.html) {
                Alpine.morph(component, response.html);
            }
        });
    });
}
