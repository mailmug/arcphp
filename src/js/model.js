export function model(el, params) {
    const expression = params.expression;
    const component = el.closest('[arc\\:component]');

    if (!component || !component.__component) return;

    el.addEventListener('input', e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        component.__component.state[expression] = value;

        const payload = {
            action: 'update',
            property: expression,
            value: value,
            id: component.id,
            component: component.getAttribute('arc:component'),
            state: component.__component.state
        };

        fetch('arcphp.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        .then(res => res.json())
        .then(response => {
            if (response.state) component.__component.state = response.state;
            if (response.html) Alpine.morph(component, response.html);
        });
    });
}
