const CACHE_NAME = "bos-kaya-v1";

const FILES_TO_CACHE = [

"/",
"index.html",
"style.css",
"script.js",
"manifest.json",

"assets/images/bakso.png",
"assets/images/warung.png",
"assets/images/minimarket.png",
"assets/images/supermarket.png",
"assets/images/restoran.png",
"assets/images/mall.png",
"assets/images/pabrik.png",
"assets/images/konglomerat.png",

"assets/icons/icon-192.png",
"assets/icons/icon-512.png"

];

self.addEventListener("install", event => {

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache => {

return cache.addAll(
FILES_TO_CACHE
);

})

);

});

self.addEventListener("activate", event => {

event.waitUntil(

caches.keys()

.then(keys => {

return Promise.all(

keys.map(key => {

if(key !== CACHE_NAME){

return caches.delete(key);

}

})

);

})

);

});

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)

.then(response => {

return response || fetch(event.request);

})

);

});
