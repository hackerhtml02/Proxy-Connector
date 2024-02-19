import { Outlet } from 'react-router-dom';

export default function Default() {
    return (
        <div className="w-96 p-4">
            <img src="/icons/logo.png" width="40" className="mx-auto mb-6" />

            <Outlet />
        </div>
    );
}
