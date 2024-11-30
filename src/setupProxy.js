const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api1', // Путь для первого прокси
        createProxyMiddleware({
            target: 'https://localhost:8177', // Адрес первого сервера
            changeOrigin: true,
            secure: false,
        })
    );

    app.use(
        '/api2', // Путь для второго прокси
        createProxyMiddleware({
            target: 'https://localhost:8181/managementservice-1.0-SNAPSHOT', // Адрес второго сервера
            changeOrigin: true,
            secure: false,
        })
    );

    // Добавьте дополнительные прокси по мере необходимости
};

