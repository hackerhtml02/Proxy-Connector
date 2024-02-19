import { FaCircle, FaTrash } from 'react-icons/fa';

export default function ProxyItem({
    proxy,
    activeProxyId,
    onSwitch,
    onDelete,
}) {
    return (
        <div key={proxy.id} className="flex items-center justify-between gap-3">
            <div
                onClick={() => onSwitch(proxy.id)}
                className={`group basis-full cursor-pointer p-4 rounded-md border ${
                    proxy.id === activeProxyId
                        ? 'border-blue-500'
                        : 'border-teal-300'
                }`}
            >
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            {proxy.label}
                        </h2>

                        <p className="text-base text-gray-600 break-all">{`${
                            proxy.protocol
                        }://${
                            proxy.hasAuth
                                ? `${proxy.username}:${proxy.password}@`
                                : ''
                        }${proxy.host}:${proxy.port}`}</p>
                    </div>

                    <div className="flex space-x-2">
                        <div
                            className={`p-2 rounded-full ${
                                proxy.id === activeProxyId
                                    ? 'bg-green-500 text-black'
                                    : 'bg-red-300 text-black-700'
                            } group-hover:bg-green-600 group-hover:text-black`}
                        >
                            <FaCircle />
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="p-2 rounded-full bg-red-500 text-black hover:bg-red-600"
                onClick={() => onDelete(proxy.id)}
            >
                <FaTrash />
            </button>
        </div>
    );
}
