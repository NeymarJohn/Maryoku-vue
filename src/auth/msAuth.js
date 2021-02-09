export const msalConfig = {
    auth: {
        clientId: "3b6954a6-fa95-462d-828a-43607e115fd2",
        authority: "https://login.microsoftonline.com/8a0e3e43-10cf-4b0b-9761-c764b35aaf5f",
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
