import * as Msal from "msal";
// if using cdn version, 'Msal' will be available in the global scope
export const msalConfig = {
    auth: {
        clientId: "b22003cd-54a7-4dba-99c1-fd9b74a4ff48",
    },
};
const msalInstance = new Msal.UserAgentApplication(msalConfig);
var loginRequest = {
    scopes: ["user.read", "calendars.readwrite"],
};

export const msSignIn = async () => {};

const getToken = async () => {
    if (!msalInstance.getAccount()) {
        return "";
    }
    var tokenRequest = {
        scopes: ["user.read", "mail.send"],
    };
    console.log("XXXXXX");
    try {
        msalInstance
            .acquireTokenSilent(tokenRequest)
            .then(response => {
                // get access token from response
                // response.accessToken
            })
            .catch(err => {
                // could also check if err instance of InteractionRequiredAuthError if you can import the class.
                console.log(err.name);
                if (err.name === "InteractionRequiredAuthError") {
                    return msalInstance
                        .acquireTokenPopup(tokenRequest)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(err => {
                            // handle error
                            console.log("final error", err);
                            msSignIn();
                        });
                }
            });
    } catch (silentError) {
        console.log(silentError);
        if (silentError instanceof msal.InteractionRequiredAuthError) {
            console.log(silentError);
            const interactiveResult = await msalInstance.acquireTokenPopup(tokenRequest);
            return interactiveResult.accessToken;
        } else {
            console.log(silentError);
            throw silentError;
            return "";
        }
    }
    // return "";
    // if (msalInstance.getAccount()) {
    //     var tokenRequest = {
    //         scopes: ["user.read", "mail.send"],
    //     };
    //     try {
    //         const silentResult = await msalInstance.acquireTokenSilent(tokenRequest);
    //         console.log(silentResult.accessToken);
    //         return silentResult.accessToken;
    //     } catch (silentError) {
    //         if (silentError instanceof msal.InteractionRequiredAuthError) {
    //             const interactiveResult = await msalInstance.acquireTokenPopup(msalRequest);
    //             return interactiveResult.accessToken;
    //         } else {
    //             throw silentError;
    //             return "";
    //         }
    //     }
    // } else {
    //     throw new Error("User account missing from session. Please sign out and sign in again.");
    //     return "";
    //     // user is not logged in, you will need to log them in to acquire a token
    // }
};

// export const msalConfig = {
//     auth: {
//         clientId: "c5f0507b-2be5-4b08-97ef-c03631cb51fd",
//         authority: "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a",
//     },
// };
// const msalRequest = {
//     scopes: ["user.read", "mailboxsettings.read", "calendars.readwrite"],
// };
// const msalClient = new msal.PublicClientApplication(msalConfig);

// const getRondom = () => {
//     const array = new Uint32Array(10);
//     window.crypto.getRandomValues(array);
// };

// export const msSignIn = async () => {
//     try {
//         // msalClient
//         //     .loginPopup(msalRequest)
//         //     .then(() => {})
//         //     .catch(e => {
//         //         console.log(e);
//         //     });
//         const authResult = await msalClient.loginPopup(msalRequest);
//         sessionStorage.setItem("msalAccount", authResult.account.username);
//     } catch (error) {
//         console.log(error);
//     }
// };

// const getToken = async () => {
//     let account = sessionStorage.getItem("msalAccount");
//     if (!account) {
//         throw new Error("User account missing from session. Please sign out and sign in again.");
//     }

//     try {
//         const silentRequest = {
//             scopes: msalRequest.scopes,
//             account: msalClient.getAccountByUsername(account),
//         };

//         const silentResult = await msalClient.acquireTokenSilent(silentRequest);
//         return silentResult.accessToken;
//     } catch (silentError) {
//         if (silentError instanceof msal.InteractionRequiredAuthError) {
//             const interactiveResult = await msalClient.acquireTokenPopup(msalRequest);
//             return interactiveResult.accessToken;
//         } else {
//             throw silentError;
//         }
//     }
// };

// // Initialize the Graph client
export const addOutlookCalendarEvent = async event => {
    msalInstance
        .loginPopup(loginRequest)
        .then(res => {
            if (msalInstance.getAccount()) {
                console.log("loginSuccess", res);
                msalInstance
                    .acquireTokenSilent(loginRequest)
                    .then(response => {
                        console.log("token Successed", response);
                        // get access token from response
                        // response.accessToken
                        const token = response.accessToken;
                        console.log(token);
                        const authProvider = {
                            getAccessToken: () => {
                                // Call getToken in auth.js
                                return token;
                            },
                        };
                        const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider });
                        try {
                            return graphClient.api("/me/events").post(event);
                        } catch (error) {
                            console.error(error);
                        }
                    })
                    .catch(err => {
                        // could also check if err instance of InteractionRequiredAuthError if you can import the class.
                        if (err.name === "InteractionRequiredAuthError") {
                            return msalInstance
                                .acquireTokenPopup(loginRequest)
                                .then(response => {
                                    // get access token from response
                                    // response.accessToken
                                    const token = response.accessToken;
                                    console.log(token);
                                    const authProvider = {
                                        getAccessToken: () => {
                                            // Call getToken in auth.js
                                            return token;
                                        },
                                    };
                                    const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider });
                                    try {
                                        graphClient.api("/me/events").post(event);
                                        getEvents();
                                    } catch (error) {
                                        console.error(error);
                                    }
                                })
                                .catch(err => {
                                    // handle error
                                });
                        }
                    });
            } else {
                // user is not logged in, you will need to log them in to acquire a token
            }
        })
        .catch(error => {
            console.log(error);
        });
};
