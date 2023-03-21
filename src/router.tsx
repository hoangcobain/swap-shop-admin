import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { path } from './constants/path';

const Loader = (Component) => (props) =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );

// Pages

const Login = Loader(lazy(() => import('src/content/login')));

// Dashboards

const Overview = Loader(lazy(() => import('src/content/dashboards/Overview')));

// Applications

const Transactions = Loader(
    lazy(() => import('src/content/applications/Transactions')),
);

const UserSettings = Loader(
    lazy(() => import('src/content/applications/Users/settings')),
);

// Status

const Status404 = Loader(
    lazy(() => import('src/content/pages/Status/Status404')),
);
const Status500 = Loader(
    lazy(() => import('src/content/pages/Status/Status500')),
);
const StatusComingSoon = Loader(
    lazy(() => import('src/content/pages/Status/ComingSoon')),
);
const StatusMaintenance = Loader(
    lazy(() => import('src/content/pages/Status/Maintenance')),
);

const routes: RouteObject[] = [
    {
        path: '',
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: path.login,
                element: <Login />,
            },
            {
                path: 'status',
                children: [
                    {
                        path: '',
                        element: <Navigate to="404" replace />,
                    },
                    {
                        path: '404',
                        element: <Status404 />,
                    },
                    {
                        path: '500',
                        element: <Status500 />,
                    },
                    {
                        path: 'maintenance',
                        element: <StatusMaintenance />,
                    },
                    {
                        path: 'coming-soon',
                        element: <StatusComingSoon />,
                    },
                ],
            },
            {
                path: '*',
                element: <Status404 />,
            },
        ],
    },
    {
        path: 'dashboards',
        element: <SidebarLayout />,
        children: [
            {
                path: '',
                element: <Navigate to="overview" replace />,
            },
            {
                path: 'overview',
                element: <Overview />,
            },
        ],
    },
    {
        path: 'management',
        element: <SidebarLayout />,
        children: [
            {
                path: '',
                element: <Navigate to="articles" replace />,
            },
            {
                path: 'articles',
                element: <Transactions />,
            },
            {
                path: 'users',
                element: <Transactions />,
            },
            {
                path: 'categories',
                element: <Transactions />,
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        element: <Navigate to="settings" replace />,
                    },
                    {
                        path: 'settings',
                        element: <UserSettings />,
                    },
                ],
            },
        ],
    },
];

export default routes;
