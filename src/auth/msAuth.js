export const msalConfig = {
    auth: {
        clientId: "c5f0507b-2be5-4b08-97ef-c03631cb51fd",
        authority: "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a",
    },
};
const msalRequest = {
    scopes: ["user.read", "mailboxsettings.read", "calendars.readwrite"],
};
const msalClient = new msal.PublicClientApplication(msalConfig);

const getRondom = () => {
    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
};

export const msSignIn = async () => {
    try {
        const authResult = await msalClient.loginPopup(msalRequest);
        sessionStorage.setItem("msalAccount", authResult.account.username);
    } catch (error) {
        console.log(error);
    }
};

const getToken = async () => {
    let account = sessionStorage.getItem("msalAccount");
    if (!account) {
        throw new Error("User account missing from session. Please sign out and sign in again.");
    }

    try {
        const silentRequest = {
            scopes: msalRequest.scopes,
            account: msalClient.getAccountByUsername(account),
        };

        const silentResult = await msalClient.acquireTokenSilent(silentRequest);
        return silentResult.accessToken;
    } catch (silentError) {
        if (silentError instanceof msal.InteractionRequiredAuthError) {
            const interactiveResult = await msalClient.acquireTokenPopup(msalRequest);
            return interactiveResult.accessToken;
        } else {
            throw silentError;
        }
    }
};

const authProvider = {
    getAccessToken: async () => {
        // Call getToken in auth.js
        return await getToken();
    },
};

// Initialize the Graph client
const graphClient = MicrosoftGraph.Client.initWithMiddleware({ authProvider });
export const addCalendarEvent = async event => {
    try {
        await graphClient.api("/me/events").post(event);
        // getEvents();
    } catch (error) {
        console.error(error);
    }
};
