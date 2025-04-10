import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useShallow } from 'zustand/shallow';

import { useAppConfigStore } from '@/stores/AppConfigStore';
import { useAuthStore } from '@/stores/AuthStore';
import { ROUTES } from '@/constants/routes';

import { OverlayComponentsContainer } from '@/components/OverlayComponents/OverlayComponentsContainer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading/Loading';
import Layout from '@/components/Layout/Layout';
import Page404 from '@/pages/Errors/Page404';

import { firebaseAuth } from './firebaseConfig';
import './styles/App.scss';

const ShoppingListItemPage = React.lazy(() => import('@/pages/ShoppingListItem/ShoppingListItemPage'));
const SettingsPage = React.lazy(() => import('@/pages/Settings/SettingsPage'));

const App = () => {
    const initAppConfig = useAppConfigStore(state => state.initAppConfig);
    const { isInit, handleAuthStateChanged } = useAuthStore(useShallow(({
        isInit,
        handleAuthStateChanged
    }) => ({
        isInit,
        handleAuthStateChanged
    })));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, handleAuthStateChanged);
        initAppConfig();

        return () => {
            unsubscribe();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ErrorBoundary>
            <OverlayComponentsContainer />
            {isInit ? (
                <Layout>
                    <Suspense fallback={<Loading fillContainer />}>
                        <Routes>
                            <Route path="" element={<ShoppingListItemPage />} />
                            <Route path={ROUTES.list.path} element={<ShoppingListItemPage />} />

                            <Route path={ROUTES.settings.path} element={<SettingsPage />} />

                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </Layout>
            ) : (
                <Loading fillContainer /> 
            )}
        </ErrorBoundary>
    );
}

export default App;
