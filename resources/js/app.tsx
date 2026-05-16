import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { createElement } from 'react';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: false });
        const path = `./Pages/${name}.tsx`;
        const loader = pages[path];
        if (!loader) throw new Error(`Page not found: ${path}`);
        return loader() as Promise<{ default: React.ComponentType }>;
    },
    setup({ el, App, props }) {
        if (el.hasChildNodes()) {
            hydrateRoot(el, createElement(App, props));
        } else {
            createRoot(el).render(createElement(App, props));
        }
    },
    progress: { color: '#B8860B' },
});
