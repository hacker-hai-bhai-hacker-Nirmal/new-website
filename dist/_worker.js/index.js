globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D6_9RzNp.mjs';
import { manifest } from './manifest_Cktkxhhj.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/api/admin/roles.astro.mjs');
const _page3 = () => import('./pages/api/auth/logout.astro.mjs');
const _page4 = () => import('./pages/api/auth/me.astro.mjs');
const _page5 = () => import('./pages/api/auth/refresh.astro.mjs');
const _page6 = () => import('./pages/api/auth/register.astro.mjs');
const _page7 = () => import('./pages/api/auth/send-otp.astro.mjs');
const _page8 = () => import('./pages/api/auth/verify-otp.astro.mjs');
const _page9 = () => import('./pages/api/auth.astro.mjs');
const _page10 = () => import('./pages/api/check-env.astro.mjs');
const _page11 = () => import('./pages/api/test-auth.astro.mjs');
const _page12 = () => import('./pages/api/test-correct-pattern.astro.mjs');
const _page13 = () => import('./pages/api/users/profile.astro.mjs');
const _page14 = () => import('./pages/api-test.astro.mjs');
const _page15 = () => import('./pages/brevo-test.astro.mjs');
const _page16 = () => import('./pages/checkout.astro.mjs');
const _page17 = () => import('./pages/dashboard.astro.mjs');
const _page18 = () => import('./pages/debug.astro.mjs');
const _page19 = () => import('./pages/delivery.astro.mjs');
const _page20 = () => import('./pages/kitchen.astro.mjs');
const _page21 = () => import('./pages/login.astro.mjs');
const _page22 = () => import('./pages/login-test.astro.mjs');
const _page23 = () => import('./pages/menu.astro.mjs');
const _page24 = () => import('./pages/otp-login.astro.mjs');
const _page25 = () => import('./pages/rewards.astro.mjs');
const _page26 = () => import('./pages/verify-otp.astro.mjs');
const _page27 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/admin.astro", _page1],
    ["src/pages/api/admin/roles.ts", _page2],
    ["src/pages/api/auth/logout.ts", _page3],
    ["src/pages/api/auth/me.ts", _page4],
    ["src/pages/api/auth/refresh.ts", _page5],
    ["src/pages/api/auth/register.ts", _page6],
    ["src/pages/api/auth/send-otp.ts", _page7],
    ["src/pages/api/auth/verify-otp.ts", _page8],
    ["src/pages/api/auth/index.astro", _page9],
    ["src/pages/api/check-env.ts", _page10],
    ["src/pages/api/test-auth.ts", _page11],
    ["src/pages/api/test-correct-pattern.ts", _page12],
    ["src/pages/api/users/profile.ts", _page13],
    ["src/pages/api-test.astro", _page14],
    ["src/pages/brevo-test.astro", _page15],
    ["src/pages/checkout.astro", _page16],
    ["src/pages/dashboard.astro", _page17],
    ["src/pages/debug.astro", _page18],
    ["src/pages/delivery.astro", _page19],
    ["src/pages/kitchen.astro", _page20],
    ["src/pages/login.astro", _page21],
    ["src/pages/login-test.astro", _page22],
    ["src/pages/menu.astro", _page23],
    ["src/pages/otp-login.astro", _page24],
    ["src/pages/rewards.astro", _page25],
    ["src/pages/verify-otp.astro", _page26],
    ["src/pages/index.astro", _page27]
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
