export const isLoggedIn = () => {
    return !!localStorage.token
}

export const loginRequired = (nextState, replace) => {
    if (!isLoggedIn()) {
        replace({pathname: '/login/'})
    }
}

export const logoutRequired = (nextState, replace) => {
    if (isLoggedIn()) {
        replace({pathname: '/'})
    }
}
