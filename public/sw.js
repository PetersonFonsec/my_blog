if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,r,n)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const c={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return i;case"module":return c;default:return e(s)}}))).then((e=>{const s=n(...e);return i.default||(i.default=s),i}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Curriculo-Peterson.pdf",revision:"0e667739e167a1fab200c5597f03b8a1"},{url:"/_next/static/chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.f395a1179efb242bc488.js",revision:"fXPhmxgT_sQoRKLJHFKiY"},{url:"/_next/static/chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.bdeaf574b3db658cef0c.js",revision:"fXPhmxgT_sQoRKLJHFKiY"},{url:"/_next/static/chunks/framework.e3de07479da4f2477dea.js",revision:"fXPhmxgT_sQoRKLJHFKiY"},{url:"/_next/static/chunks/main-37f9f1a83ddec0f04b6b.js",revision:"fXPhmxgT_sQoRKLJHFKiY"},{url:"/_next/static/chunks/pages/_app-a34db6d7204726c8cbd8.js",revision:"fXPhmxgT_sQoRKLJHFKiY"},{url:"/_next/static/chunks/pages/_error-db2bf71b26a510dee347.js",revision:"fXPhmxgT_sQoRKLJHFKiY"},{url:"/_next/static/chunks/pages/index-c65f2c153781819b63f2.js",revision:"fXPhmxgT_sQoRKLJHFKiY"},{url:"/_next/static/chunks/polyfills-4f14e8c8ea1352d3ef0d.js",revision:"fXPhmxgT_sQoRKLJHFKiY"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"fXPhmxgT_sQoRKLJHFKiY"},{url:"/_next/static/css/c731c2158329e998b715.css",revision:"fXPhmxgT_sQoRKLJHFKiY"},{url:"/_next/static/fXPhmxgT_sQoRKLJHFKiY/_buildManifest.js",revision:"fXPhmxgT_sQoRKLJHFKiY"},{url:"/_next/static/fXPhmxgT_sQoRKLJHFKiY/_ssgManifest.js",revision:"fXPhmxgT_sQoRKLJHFKiY"},{url:"/favicon/android-chrome-192x192.png",revision:"5467859869dde59249f0d5c469c77303"},{url:"/favicon/android-chrome-384x384.png",revision:"f93ee9241ef3e342d3a35da2f63735d6"},{url:"/favicon/apple-touch-icon.png",revision:"39d7db2f79e059d4f9ddc3d97e47d7f4"},{url:"/favicon/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/favicon/favicon-16x16.png",revision:"0e2d00765cf1bb4c478cb173efab591f"},{url:"/favicon/favicon-32x32.png",revision:"74a8825e5bb005ed9feefb94583816db"},{url:"/favicon/favicon.ico",revision:"52b96a383f983d8eeed951c1834e635f"},{url:"/favicon/mstile-150x150.png",revision:"27283d9128d3e327ded0c7273a4792c1"},{url:"/favicon/safari-pinned-tab.svg",revision:"1023a83fdbda3671a47c6daebb48acec"},{url:"/favicon/site.webmanifest",revision:"05914beb9c2d37fb6b7962a6f7ef8617"},{url:"/icons/angular.svg",revision:"c5e2e77dcd0a5701070688a140a15d8b"},{url:"/icons/close.svg",revision:"6ee5d50215b693e28495f44bf704ba55"},{url:"/icons/css.svg",revision:"767009ca2b4914c460d6ce8868d7cb13"},{url:"/icons/dark-lamp.svg",revision:"b6da6ced585af6e3e7592d5853b73c29"},{url:"/icons/docker.svg",revision:"a2a592f246586f08f2137fa946b807e7"},{url:"/icons/git.svg",revision:"f6cac3a5996ce798caa3da1a3c507c29"},{url:"/icons/github.svg",revision:"0dc52a633f0bfce33520a6c3a5db48bc"},{url:"/icons/gulp.svg",revision:"6622e10493f1939ea948c708054208b1"},{url:"/icons/html.svg",revision:"ca0747ef4377fafc64ff3dff716863d0"},{url:"/icons/instagram.svg",revision:"691cdf4bd7124746cb1fedacd1e8f4dc"},{url:"/icons/js.svg",revision:"30933b0c62e4c04af152b9c6014f94c3"},{url:"/icons/light-lamp.svg",revision:"8823ba8b292d79340b8bc4cc2f007415"},{url:"/icons/linkedin.svg",revision:"88691016f975411e747f85a23d862157"},{url:"/icons/logo-mobile.svg",revision:"b0f055d9e928a5a860731efa74a95fcc"},{url:"/icons/logo.svg",revision:"0372ff37d24ed3f11d702a470704649e"},{url:"/icons/menu.svg",revision:"c33b92073c8d82bfe8793d27c932e4b8"},{url:"/icons/react.svg",revision:"737ac8d242bd2a5d87a0d078a188898f"},{url:"/icons/sass.svg",revision:"58eb680b23d9e7807f7db8ef89f99d88"},{url:"/icons/search.svg",revision:"af32cdb62499d562e33b323972a085eb"},{url:"/icons/typescript.svg",revision:"c87187cad0ab07cb31c76fb8facda1e1"},{url:"/icons/vue.svg",revision:"cda4708a806248bc0019cfbbc23f1ff5"},{url:"/icons/webpack.svg",revision:"1501d04195cf0f45b3805b3545c08c07"},{url:"/icons/whatsapp.svg",revision:"f7e8e19b039ceb1118ba693e2faf16e8"},{url:"/photos/profile.jpg",revision:"d6db53db8b0c8e8b4e36fb5cfdbb6e63"},{url:"/projects/docloc-share.png",revision:"7b849a574b92b6702f5e835c29facb27"},{url:"/projects/guitars-share.png",revision:"ffc23a16cc8e7afd87e633b35774d5eb"},{url:"/projects/sindsep-share.png",revision:"28476cfa4e05b2bcb34d893c59c9d319"},{url:"/projects/sitio-share.png",revision:"26761c9e761a8d01d6ff3493ed34b9dc"},{url:"/projects/suabreja-share.png",revision:"846247ebf5b1c10b3f52ec97f8b6dae2"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:r})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));