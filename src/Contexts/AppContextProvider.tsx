import React, { Context, useEffect, useContext, useState } from 'react';
import { useAuth } from './AuthContextProvider';
import { useNetworkStatus } from './NetworkContextProvider';

export type AppNavigationState =
    | 'INIT'
    | 'AUTH'
    | 'BROWSE_APP'
    | 'OFFLINE';

interface AppState {
    appNavigationState: AppNavigationState;
}

interface AppActions {
    splashLoaded: () => Promise<void>;
    triggerAuthFlow: () => Promise<void>;
}

const initialState: AppState = {
    appNavigationState: 'INIT',
};

const AppContext: Context<AppState & AppActions> = React.createContext({
    ...initialState,
    splashLoaded: async () => {},
    triggerAuthFlow: async () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [splashLoaded, setSplashLoaded] = useState<boolean>(false);
    const { isInternetReachable } = useNetworkStatus();
    const userState = useAuth();
    const { userType, accessToken } = userState;
    const [state, dispatch] = React.useReducer((prevState, action) => {
        switch (action.type) {
            case 'INIT':
                return {
                    ...prevState,
                    appNavigationState: 'INIT',
                };
            case 'NOT_LOGGED_IN':
                return {
                    ...prevState,
                    appNavigationState: 'AUTH',
                };
            case 'LOGGED_IN':
                return {
                    ...prevState,
                    appNavigationState: 'BROWSE_APP',
                    accessToken: action.payload.accessToken,
                };
            case 'OFFLINE':
                return {
                    ...prevState,
                    appNavigationState: action.type,
                };
            case 'REGION_LOCK':
                return {
                    ...prevState,
                    appNavigationState: action.type,
                };
        }
    }, initialState);

    const appContext = React.useMemo(
        () => ({
            splashLoaded: async () => {
                setSplashLoaded(true);
            },
            triggerAuthFlow: async () => {
                dispatch({ type: 'NOT_LOGGED_IN' });
            },
        }),
        [accessToken],
    );

    useEffect(() => {

        const manageAppContext = async () => {
            // Still determining internet connectivity
            // or
            // Struum logo still loading
            if (isInternetReachable === null || !splashLoaded) {
                return;
            }

            // When user is already browsing, when losing network, remain in browse mode
            if (
                isInternetReachable === false &&
                (state.appNavigationState === 'BROWSE_APP')
            ) {
                return;
            }

            const routeToOffline = isInternetReachable === false;

            // user is offline and does not have any offline downloads,
            // route user to offline screen
            if (routeToOffline) {
                dispatch({ type: 'OFFLINE' });
                return;
            }

            // user is online, route based on user state
            if (userType !== 'INIT') {
                dispatch({
                    type: userType,
                    payload: { accessToken: accessToken, routeToDownloads: false },
                });
            }
        };

        manageAppContext();

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userType, splashLoaded, isInternetReachable]);

    return (
        <AppContext.Provider
            value={{
                ...state,
                ...userState,
                ...appContext,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContextProvider, AppContext };

export const useAppState = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within a AppContext');
    }
    return context;
};
