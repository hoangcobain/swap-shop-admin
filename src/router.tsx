import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet, RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { path } from './constants/path';
import { useAuthContext } from './contexts/AuthContext';

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

const ArticleOverview = Loader(
    lazy(() => import('src/content/dashboards/ArticleOverView')),
);

// Applications

const ArticlesManagement = Loader(
    lazy(() => import('src/content/applications/ArticlesManagement')),
);

const UsersManagement = Loader(
    lazy(() => import('src/content/applications/UsersManagement')),
);

const CategoriesManagement = Loader(
    lazy(() => import('src/content/applications/CategoriesManagement')),
);

const NotificationManagement = Loader(
    lazy(() => import('src/content/applications/NotificationManagement')),
);

const UserSettings = Loader(
    lazy(() => import('src/content/applications/Users/settings')),
);

const ProtectedRoute = Loader(() => {
    const { isAuthenticated } = useAuthContext();
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
});

const RejectedRoute = Loader(() => {
    const { isAuthenticated } = useAuthContext();
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.overview} />;
});

const routes: RouteObject[] = [
    {
        path: '',
        element: <RejectedRoute />,
        children: [
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
                ],
            },
        ],
    },
    {
        path: '',
        element: <ProtectedRoute />,
        children: [
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
                    {
                        path: 'articleOverview',
                        element: <ArticleOverview />,
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
                        element: <ArticlesManagement />,
                    },
                    {
                        path: 'users',
                        element: <UsersManagement />,
                    },
                    {
                        path: 'categories',
                        element: <CategoriesManagement />,
                    },
                    {
                        path: 'notification',
                        element: <NotificationManagement />,
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
        ],
    },
];

export default routes;
