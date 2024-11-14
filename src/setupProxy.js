const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api1', // Путь для первого прокси
        createProxyMiddleware({
            target: 'http://localhost:8177', // Адрес первого сервера
            changeOrigin: true,
        })
    );

    app.use(
        '/api2', // Путь для второго прокси
        createProxyMiddleware({
            target: 'http://localhost:8080', // Адрес второго сервера
            changeOrigin: true,
        })
    );

    // Добавьте дополнительные прокси по мере необходимости
};

