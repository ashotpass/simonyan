import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';
import { createElement } from 'react';

const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => {
            const path = `./Pages/${name}.tsx`;
            const mod = pages[path] as { default: React.ComponentType } | undefined;
            if (!mod) throw new Error(`Page not found: ${path}`);
            return mod;
        },
        setup: ({ App, props }) => createElement(App, props),
    }),
);
