export default class Proxy {
    static async set(proxy) {
        await chrome.proxy.settings.set({
            value: {
                mode: 'fixed_servers',
                rules: {
                    singleProxy: {
                        scheme: proxy.protocol,
                        host: proxy.host,
                        port: proxy.port,
                    },
                },
            },
            scope: 'regular',
        });
    }

    static async unset() {
        await chrome.proxy.settings.set({
            value: {
                mode: 'direct',
            },
            scope: 'regular',
        });
    }
}
