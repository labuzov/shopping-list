import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import OverlayComponentProvider from '@/providers/OverlayComponentProvider.tsx';
import AppViewProvider from '@/providers/AppViewProvider.tsx';
import HeaderProvider from '@/providers/HeaderProvider.tsx';

import App from './App.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AppViewProvider>
            <OverlayComponentProvider>
                <HeaderProvider>
                    {/* <ShoppingListProvider> */}
                        <App />
                    {/* </ShoppingListProvider> */}
                </HeaderProvider>
            </OverlayComponentProvider>
        </AppViewProvider>
    </BrowserRouter>,
);
