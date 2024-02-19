async function updateIcon(){
    const { enabled = false } = await chrome.storage.local.get(['enabled']);

    if (enabled) {
        chrome.action.setIcon({ path: 'icons/logo.png' });
    } else {
        chrome.action.setIcon({ path: 'icons/logo_inactive.png' });
    }
};

updateIcon();

chrome.storage.onChanged.addListener(updateIcon);


chrome.webRequest.onAuthRequired.addListener(async function(details, callbackFn) {
    const { enabled = false, proxies = [], activeProxyId } = await chrome.storage.local.get(['enabled', 'proxies', 'activeProxyId']);

    if(!enabled){
        return;
    }

    const activeProxy = proxies.find((proxy) => proxy.id === activeProxyId);

    if(!activeProxy.hasAuth){
        return;
    }

    callbackFn({
        authCredentials: { 
            username: activeProxy.username,
            password: activeProxy.password 
        }
    });
}, { urls: ['<all_urls>'] }, ['asyncBlocking']);