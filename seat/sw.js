const PREFIX='seat-static-'+self.registration.scope+'-';
const CACHE=PREFIX+'v1';
const ASSETS=['./','./index.html','./style.css','./app.js','./core.js','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'];
const urls=ASSETS.map(x=>new URL(x,self.registration.scope).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(urls))));
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',event=>{const req=event.request;const url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin||url.search||!urls.includes(url.href))return;event.respondWith(caches.open(CACHE).then(async cache=>{const hit=await cache.match(req);return hit||fetch(req)}));});
