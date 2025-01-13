export const ROUTES = {
    list: {
        path: '/list/:id',
        get: (listId: string) => `/list/${listId}`
    },
    settings: {
        path: '/settings',
        get: () => '/settings'
    },
    login: {
        path: '/login',
        get: () => '/login'
    },
    profile: {
        path: '/profile',
        get: () => '/profile'
    }
}
