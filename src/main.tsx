import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import OverlayComponentProvider from '@/providers/OverlayComponentProvider.tsx';
// import ShoppingListProvider from '@/providers/ShoppingListProvider.tsx';
import AppViewProvider from './providers/AppViewProvider.tsx';

import App from './App.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AppViewProvider>
            <OverlayComponentProvider>
                {/* <ShoppingListProvider> */}
                    <App />
                {/* </ShoppingListProvider> */}
            </OverlayComponentProvider>
        </AppViewProvider>
    </BrowserRouter>,
);
