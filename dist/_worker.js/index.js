globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_A8gDAFh0.mjs';
import { manifest } from './manifest_8ic1BUks.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/api/auth/send-otp.astro.mjs');
const _page3 = () => import('./pages/api/auth/status.astro.mjs');
const _page4 = () => import('./pages/api/auth/verify-otp.astro.mjs');
const _page5 = () => import('./pages/api/auth.astro.mjs');
const _page6 = () => import('./pages/api/users/auth.astro.mjs');
const _page7 = () => import('./pages/api/users/profile.astro.mjs');
const _page8 = () => import('./pages/checkout.astro.mjs');
const _page9 = () => import('./pages/dashboard.astro.mjs');
const _page10 = () => import('./pages/delivery.astro.mjs');
const _page11 = () => import('./pages/kitchen.astro.mjs');
const _page12 = () => import('./pages/login.astro.mjs');
const _page13 = () => import('./pages/login-test.astro.mjs');
const _page14 = () => import('./pages/menu.astro.mjs');
const _page15 = () => import('./pages/otp-login.astro.mjs');
const _page16 = () => import('./pages/rewards.astro.mjs');
const _page17 = () => import('./pages/test-appwrite.astro.mjs');
const _page18 = () => import('./pages/test-simple.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/admin.astro", _page1],
    ["src/pages/api/auth/send-otp.js", _page2],
    ["src/pages/api/auth/status.js", _page3],
    ["src/pages/api/auth/verify-otp.js", _page4],
    ["src/pages/api/auth.js", _page5],
    ["src/pages/api/users/auth.js", _page6],
    ["src/pages/api/users/profile.js", _page7],
    ["src/pages/checkout.astro", _page8],
    ["src/pages/dashboard.astro", _page9],
    ["src/pages/delivery.astro", _page10],
    ["src/pages/kitchen.astro", _page11],
    ["src/pages/login.astro", _page12],
    ["src/pages/login-test.astro", _page13],
    ["src/pages/menu.astro", _page14],
    ["src/pages/otp-login.astro", _page15],
    ["src/pages/rewards.astro", _page16],
    ["src/pages/test-appwrite.astro", _page17],
    ["src/pages/test-simple.astro", _page18],
    ["src/pages/index.astro", _page19]
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
