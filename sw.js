/* CFCC Convênios — service worker, cache versionado */
var CACHE='conv-cfcc-v2';
var ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){ self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS).catch(function(){});})); });
self.addEventListener('activate',function(e){ e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==CACHE)return caches.delete(k);}));}).then(function(){return self.clients.claim();})); });
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);
  /* nunca cachear o JSON de dados (vive no OneDrive/sistema de arquivos) */
  if(u.pathname.endsWith('convenios.json')||u.pathname.endsWith('servidores.json')){ return; }
  e.respondWith(caches.match(e.request).then(function(r){ return r||fetch(e.request).then(function(resp){ var cp=resp.clone(); caches.open(CACHE).then(function(c){try{c.put(e.request,cp);}catch(x){}}); return resp; }).catch(function(){return r;}); }));
});
