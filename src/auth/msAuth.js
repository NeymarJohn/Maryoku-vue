const msalConfig = {
    auth: {
        clientId: "c5f0507b-2be5-4b08-97ef-c03631cb51fd",
        redirectUri: "",
        codeChallengeMethod: "S256",
        codeChallenge: "",
    },
};
const msalRequest = {
    scopes: ["user.read", "mailboxsettings.read", "calendars.readwrite"],
};
const msalClient = new msal.PublicClientApplication(msalConfig);

const getRondom = () => {
    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);

    const randText = document.getElementById("myRandText");
    randText.textContent = "The random numbers are: ";
    for (let i = 0; i < array.length; i++) {
        randText.textContent += array[i] + " ";
    }
};

export const msSignIn = async () => {
    // Login
    try {
        // Use MSAL to login
        const authResult = await msalClient.loginPopup(msalRequest);
        console.log("id_token acquired at: " + new Date().toString());
        // Save the account username, needed for token acquisition
        sessionStorage.setItem("msalAccount", authResult.account.username);
        // TEMPORARY
        console.log("Ms login success");
    } catch (error) {
        console.log(error);
    }
};
