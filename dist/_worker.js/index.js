globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BSFkpAEB.mjs';
import { manifest } from './manifest_ki7aghR6.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/api/check-env.astro.mjs');
const _page3 = () => import('./pages/checkout.astro.mjs');
const _page4 = () => import('./pages/dashboard.astro.mjs');
const _page5 = () => import('./pages/debug.astro.mjs');
const _page6 = () => import('./pages/delivery.astro.mjs');
const _page7 = () => import('./pages/kitchen.astro.mjs');
const _page8 = () => import('./pages/login.astro.mjs');
const _page9 = () => import('./pages/menu.astro.mjs');
const _page10 = () => import('./pages/rewards.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/admin.astro", _page1],
    ["src/pages/api/check-env.ts", _page2],
    ["src/pages/checkout.astro", _page3],
    ["src/pages/dashboard.astro", _page4],
    ["src/pages/debug.astro", _page5],
    ["src/pages/delivery.astro", _page6],
    ["src/pages/kitchen.astro", _page7],
    ["src/pages/login.astro", _page8],
    ["src/pages/menu.astro", _page9],
    ["src/pages/rewards.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
