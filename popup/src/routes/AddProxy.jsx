import { useState } from 'react';
import { Form, Link, redirect } from 'react-router-dom';
import Storage from '../plugins/Storage';

export default function AddProxy() {
    const [hasAuth, setHasAuth] = useState(false);

    return (
        <>
            <h1 className="text-2xl font-semibold mb-4">
                {chrome.i18n.getMessage('addProxy')}
            </h1>

            <Form method="post" className="max-w-md space-y-4">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder={chrome.i18n.getMessage('label')}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 outline-none text-base"
                    />
                </div>

                <div>
                    <select
                        name="protocol"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 outline-none text-base"
                    >
                        <option value="">
                            {chrome.i18n.getMessage('protocol')}
                        </option>
                        <option value="http">http</option>
                        <option value="https">https</option>
                        <option value="socks4">socks4</option>
                        <option value="socks5">socks5</option>
                    </select>
                </div>

                <div>
                    <input
                        type="text"
                        name="host"
                        placeholder={chrome.i18n.getMessage('host')}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-400 outline-none text-base"
                    />
                </div>

                <div>
                    <input
                        type="number"
                        step="1"
                        name="port"
                        placeholder={chrome.i18n.getMessage('port')}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-green-400 outline-none text-base"
                    />
                </div>

                <div className="flex items-center space-x-2 px-0.5">
                    <input
                        type="checkbox"
                        name="hasAuth"
                        id="hasAuth"
                        className="text-blue-500 focus:ring-green-400"
                        onChange={(event) => setHasAuth(event.target.checked)}
                    />

                    <label className="text-base" htmlFor="hasAuth">
                        {chrome.i18n.getMessage('hasAuth')}
                    </label>
                </div>

                {hasAuth && (
                    <>
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder={chrome.i18n.getMessage('username')}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-green-400 outline-none text-base"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="password"
                                placeholder={chrome.i18n.getMessage('password')}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-green-400 outline-none text-base"
                            />
                        </div>
                    </>
                )}

                <div className="flex space-x-4">
                    <button className="w-1/2 py-2 px-4 bg-blue-500 text-base text-white rounded-md hover:bg-green-600">
                        {chrome.i18n.getMessage('add')}
                    </button>

                    <Link
                        to="/"
                        className="w-1/2 py-2 px-4 bg-gray-300 text-base text-gray-700 rounded-md text-center hover:bg-gray-400"
                    >
                        {chrome.i18n.getMessage('cancel')}
                    </Link>
                </div>
            </Form>
        </>
    );
}

export async function action({ request }) {
    const formData = await request.formData();

    const hasAuth = !!formData.get('hasAuth');

    const proxyData = {
        id: Math.round(Math.random() * 1_000_000),
        label: formData.get('label'),
        protocol: formData.get('protocol'),
        host: formData.get('host'),
        port: parseInt(formData.get('port')),
        hasAuth,
    };

    if (hasAuth) {
        proxyData.username = formData.get('username');
        proxyData.password = formData.get('password');
    }

    const proxies = (await Storage.get('proxies')) ?? [];

    if (!proxies.length) {
        await Storage.set('activeProxyId', proxyData.id);
    }

    proxies.unshift(proxyData);
    await Storage.set('proxies', proxies);

    return redirect('/');
}
