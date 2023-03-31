import React, { createContext, useContext, useEffect } from 'react';

interface NetworkState {
    type: any;
    isInternetReachable: boolean | null;
    retry: () => Promise<void>;
}

const initialState: NetworkState = {
    type: 'true',
    isInternetReachable: null,
    retry: async () => {},
};

export const NetworkContext = createContext<NetworkState>(initialState);

export const NetworkContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer((prevState, action) => {
        if (action.type === 'UPDATE_STATE') {
            return {
                ...prevState,
                type: action.value.type,
            };
        } else if (action.type === 'UPDATE_INTERNET_REACHABLE') {
            return {
                ...prevState,
                isInternetReachable: action.value,
            };
        } else if (action.type === 'RESET_STATE') {
            return {
                ...initialState,
            };
        }
        return prevState;
    }, initialState);

    const checkInternetAvailable = async () => {
        dispatch({ type: 'UPDATE_INTERNET_REACHABLE', value: true });
    };

    useEffect(() => {
        checkInternetAvailable();
    }, []);

    console.debug('[NetworkContext] changed: ', state);

    return (
        <NetworkContext.Provider
            value={{
                ...state,
            }}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetworkStatus = () => {
    const context = useContext(NetworkContext);
    if (context === undefined) {
        throw new Error('useNetworkStatus must be used within a NetworkContextProvider');
    }
    return context;
};
