import React, { createContext, useReducer, useContext, useEffect, useCallback, useRef } from 'react';
import { AppState, Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';

export type USER_TYPE = 'INIT' | 'NOT_LOGGED_IN' | 'LOGGED_IN';

export interface UserState {
    username: string;
    userType: USER_TYPE;
    accessToken?: string;
    signUp: ({ username, password }: { username: string; password: string; }) => Promise<any>;
    login: ({ username, password }: { username: string; password: string; }) => Promise<any>;
    refreshToken: ({ accessToken }: { accessToken?: string; })  => Promise<any>;
    logout: () => Promise<void>;
}

export const initialState: UserState = {
    username: '',
    userType: 'INIT',
    accessToken: undefined,
    signUp: async () => {},
    login: async () => {},
    refreshToken: async () => {},
    logout: async () => {},
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

    const controlReducer = (_state: UserState, action: any): UserState => {
        switch (action.name) {
            case 'LOG_IN':
                return {
                    ..._state,
                    userType: 'LOGGED_IN',
                    username: action.username,
                    accessToken: action.value,
                };
            case 'LOG_IN_ERROR':
                return {
                    ..._state,
                    userType: 'INIT',
                };
            case 'LOG_OUT': {
                return {
                    ..._state,
                    accessToken: undefined,
                    userType: 'NOT_LOGGED_IN',
                };
            }
            default:
                return {
                    ..._state,
                };
        }
    };

    const [state, dispatch] = useReducer(controlReducer, initialState);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            try {
                let tokenData = await getKeychainToken();

                if (tokenData !== undefined && tokenData !== null && tokenData.refreshToken) {
                    await authActions.refreshToken(tokenData);
                } else {
                    await doLogout();
                }
            } catch {
                await doLogout();
            }
        };
            bootstrapAsync();
    }, []);

    //eslint-disable-next-line react-hooks/exhaustive-deps
    const getKeychainToken = async () => {
        let kcToken = null;
        let output = null;
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                kcToken = credentials.password;
            }
            if (kcToken) {
                output = JSON.parse(kcToken);
            }
        } catch (error) {
            console.error(error);
        }
        return output;
    };

    const getTokens = (responseParams: []) => {
        let tokenObject = new Object();
        responseParams.forEach((val: { paramName: string; paramValue: string }) => {
            return (tokenObject[val.paramName] = val.paramValue);
        });
        return tokenObject;
    };

    const doLogin = async ({
        response,
    }: {
        response: any;
    }): Promise<string> => {
        return new Promise(async resolve => {
            // let responseTokens: any;
            // if (!(response.accessToken || response.refreshToken)) {
            //     responseTokens = getTokens(response.params);
            // }
            // let accessToken = response.accessToken
            //     ? response.accessToken
            //     : responseTokens && responseTokens.accessToken;
            // let refreshToken = response.refreshToken
            //     ? response.refreshToken
            //     : responseTokens && responseTokens.refreshToken;

            // let payload = JSON.stringify({ accessToken, refreshToken });
            // await Keychain.setGenericPassword(accessToken, payload);

            const accessToken = 'asd'

            dispatch({
                name: 'LOG_IN',
                username : response.username,
                value: accessToken,
            });
            resolve(accessToken);
        });
    };

    const doLogout = useCallback(async () => {
        console.log('here1')
        await Keychain.resetGenericPassword();
        dispatch({ name: 'LOG_OUT' });
    }, []);

    const authActions = React.useMemo(
        () => ({
            login: async ({
                username,
                password,
            }: {
                username?: string;
                password?: string;
            }) => {
                try {
                    //login func
                    // const response = login();
                    const response = {username: username, password: password}
                    await doLogin({ response });
                    return response;
                } catch (e) {
                    console.log("Error login", e)
                }
            },
            refreshToken: async (tokenData: any) => {
                try {
                    //refresh token and do login again
                } catch (e) {
                    console.log("Error login", e)
                }
            },
            signUp: async ({ username, password }: { username: string; password: string; }) => {
                try {
                    // sign up
                } catch (e) {
                    console.log('error', e)
                }
            },
            logout: async () => {
                try {
                    //try logout
                    await doLogout();
                } catch (e) {
                    console.log('error', e)
                }
            },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ doLogout, state.accessToken],
    );

    return (
        <AuthContext.Provider
            value={{
                ...state,
                ...authActions,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthContext');
    }
    return context;
};
