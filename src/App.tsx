import React, { Suspense, useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppViewContext } from '@/providers/AppViewProvider';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading/Loading';
import { OverlayComponentsContainer } from '@/components/OverlayComponentsContainer';
import Layout from '@/components/Layout/Layout';

import Page404 from './pages/Errors/Page404';
import './styles/App.scss';

const ShoppingListItemPage = React.lazy(() => import('@/pages/ShoppingListItem/ShoppingListItemPage'));
const SettingsPage = React.lazy(() => import('@/pages/Settings/SettingsPage'));

const App = () => {
    const { initAppView } = useContext(AppViewContext);

    useEffect(() => {
        initAppView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ErrorBoundary>
            <OverlayComponentsContainer />
            <Layout>
                <Suspense fallback={<Loading fillContainer />}>
                    <Routes>
                        <Route path="" element={<ShoppingListItemPage />} />
                        <Route path="list/:id" element={<ShoppingListItemPage />} />

                        <Route path="settings" element={<SettingsPage />} />

                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </Suspense>
            </Layout>
        </ErrorBoundary>
    );
}

export default App;
