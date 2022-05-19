// Должно быть true в production
const doCache = false;

// Имя кэша
const CACHE_NAME = 'my-wallet-cache';

// Очищает старый кэш
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then(keyList =>
                Promise.all(keyList.map(key => {
                    if (!cacheWhitelist.includes(key)) {
                        console.log('Deleting cache: ' + key);
                        return caches.delete(key);
                    }
                })))
            .catch(err => console.error(err))
    );
});

// 'install' вызывается, как только пользователь впервые открывает PWA
self.addEventListener('install', function(event) {
    if (doCache) {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(function(cache) {
                    // Получаем данные из манифеста (они кэшируются)
                    Promise.all([fetch('/manifest.json'), fetch('/chunk_manifest.json')])
                        .then(([responseManifest, responseChunk]) => {
                            return Promise.all([responseManifest.json(), responseChunk.json()]);
                        })
                        .then(([assets, chunks]) => {

                            // Открываем и кэшируем нужные страницы и файлы
                            const urlsToCache = [
                                assets.start_url,
                                '/css/bootstrap.min.css'
                            ];
                            cache.addAll(urlsToCache.concat(
                                assets.icons.map(function(e) {return e.src;}),
                                Object.values(chunks)
                            ));
                            console.log('cached');
                        });
                })
                .catch(err => console.error(err))
        );
    }
});

// Когда приложение запущено, сервис-воркер перехватывает запросы и отвечает на них данными из кэша, если они есть
self.addEventListener('fetch', function(event) {
    if (doCache) {
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    return response || fetch(event.request);
                })
                .catch(err => console.error(err))
        );
    }
});