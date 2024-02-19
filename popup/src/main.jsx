import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import Default from './layouts/Default';
import Home from './routes/Home';
import AddProxy, { action as addProxyAction } from './routes/AddProxy';
import './index.css';

const router = createHashRouter([
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'add-proxy',
                element: <AddProxy />,
                action: addProxyAction,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
