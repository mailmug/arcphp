export function loading(el, params, context) {

    const modifiers = params.modifiers || [];
    const cleanup = context.cleanup;

    const delayMap = {
        'shortest': 50,
        'shorter': 100,
        'short': 150,
        'default': 200,
        'long': 300,
        'longer': 500,
        'longest': 1000,
    };

    let duration = 0;
    for (let mod of modifiers) {
        if (delayMap[mod]) { duration = delayMap[mod]; break; }
    }
    if (!duration && modifiers.includes('delay')) duration = delayMap.default;

    let timer;

    const show = () => {
        timer = setTimeout(() => {
            el.style.display = 'inline-flex';  
        }, duration);
    };

    const hide = () => {
        if (timer) clearTimeout(timer);
        el.style.display = 'none';
    };

    document.addEventListener('arc:loading.start', show);
    document.addEventListener('arc:loading.stop', hide);

    cleanup(() => {
        document.removeEventListener('arc:loading.start', show);
        document.removeEventListener('arc:loading.stop', hide);
    });
}
    

