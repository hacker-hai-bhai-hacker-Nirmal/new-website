globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as renderers } from './chunks/astro_C1ciDD7V.mjs';
import { c as createExports } from './chunks/@astrojs_DNDSpFo-.mjs';
import { manifest } from './manifest_Cu6LDf13.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/checkout.astro.mjs');
const _page3 = () => import('./pages/dashboard.astro.mjs');
const _page4 = () => import('./pages/delivery.astro.mjs');
const _page5 = () => import('./pages/kitchen.astro.mjs');
const _page6 = () => import('./pages/login.astro.mjs');
const _page7 = () => import('./pages/menu.astro.mjs');
const _page8 = () => import('./pages/rewards.astro.mjs');
const _page9 = () => import('./pages/test-appwrite.astro.mjs');
const _page10 = () => import('./pages/test-simple.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin.astro", _page1],
    ["src/pages/checkout.astro", _page2],
    ["src/pages/dashboard.astro", _page3],
    ["src/pages/delivery.astro", _page4],
    ["src/pages/kitchen.astro", _page5],
    ["src/pages/login.astro", _page6],
    ["src/pages/menu.astro", _page7],
    ["src/pages/rewards.astro", _page8],
    ["src/pages/test-appwrite.astro", _page9],
    ["src/pages/test-simple.astro", _page10],
    ["src/pages/index.astro", _page11]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
