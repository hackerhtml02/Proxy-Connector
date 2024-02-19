import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Storage from '../plugins/Storage';
import Proxy from '../plugins/Proxy';
import ProxyItem from '../components/ProxyItem';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

export default function Home() {
    const [enabled, setEnabled] = useState(false);
    const [proxies, setProxies] = useState([]);
    const [activeProxyId, setActiveProxyId] = useState();

    const activeProxy = proxies.find((proxy) => proxy.id === activeProxyId);

    useEffect(() => {
        (async function () {
            const enabled = (await Storage.get('enabled')) ?? false;
            const proxies = (await Storage.get('proxies')) ?? [];
            const activeProxyId = await Storage.get('activeProxyId');

            setEnabled(enabled);
            setProxies(proxies);
            setActiveProxyId(activeProxyId);
        })();
    }, []);

    async function toggleEnableHandler() {
        if (!activeProxyId) {
            alert(chrome.i18n.getMessage('noActiveProxy'));
            return;
        }

        await Storage.set('enabled', !enabled);

        if (enabled) {
            await Proxy.unset();
        } else {
            await Proxy.set(activeProxy);
        }

        setEnabled(!enabled);
    }

    async function proxySwitchHandler(id) {
        await Storage.set('activeProxyId', id);

        setActiveProxyId(id);

        if (enabled) {
            const activeProxy = proxies.find((proxy) => proxy.id === id);
            Proxy.set(activeProxy);
        }
    }

    async function proxyDeleteHandler(id) {
        if (!confirm(chrome.i18n.getMessage('confirmProxyDelete'))) {
            return;
        }

        const restOfProxies = proxies.filter((proxy) => proxy.id !== id);

        await Storage.set('proxies', restOfProxies);

        setProxies(restOfProxies);

        if (activeProxyId === id) {
            await Storage.set('activeProxyId', null);
            setActiveProxyId(null);

            await Storage.set('enabled', false);
            await Proxy.unset();
            setEnabled(false);
        }
    }

    return (
        <>
            <div className="max-w-md mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-semibold">
                        {chrome.i18n.getMessage('enabled')}
                    </div>

                    <button
                        className={`text-4xl ${enabled && 'text-green-500'}`}
                        onClick={toggleEnableHandler}
                    >
                        {enabled ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                </div>

                <a
                    href="#/add-proxy"
                    target="_blank"
                    className="bg-green-500 text-base text-black px-4 py-2 rounded-md mb-4 block w-full text-center hover-bg-green-600"
                >
                    {chrome.i18n.getMessage('addNewProxy')}
                </a>

                <div className="space-y-4">
                    {proxies.map((proxy) => (
                        <ProxyItem
                            key={proxy.id}
                            proxy={proxy}
                            activeProxyId={activeProxyId}
                            onSwitch={proxySwitchHandler}
                            onDelete={proxyDeleteHandler}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
