import { AuthProvider } from 'react-admin';
import { BASE_URL } from "./config";
import * as Realm from "realm-web";
import realmApp from './realmconfig';


const authProvider: AuthProvider = {

    login: async (data: any) => {

        const request = new Request(`${BASE_URL}${data.api}`, {
            method: 'POST',
            body: JSON.stringify(data.data),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        try {

            const realmcredentials = Realm.Credentials.emailPassword(data.username, data.password);
            const realmuser = await realmApp.logIn(realmcredentials);
            console.log("Successfully logged in!", realmuser);
            console.log("==app data===", realmApp);

            const accessToken = realmuser.accessToken;

            localStorage.setItem("access_token", accessToken as string);
            return Promise.resolve();

            //return user;
        } catch (err) {
            console.error("Failed to log in", err);
            throw new Error("unable to login");

            //throw err;
        }
        return fetch(request).then(response => {
            return response.json();
        }).then((auth) => {
            if (auth.statusCode >= 200) {
                throw new Error(auth['message']);
            } else {
                localStorage.setItem("access_token", auth.accessToken);
                return Promise.resolve();
            }
        });

    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem("access_token");
            return Promise.reject({ redirectTo: '/login' });
        }
        return Promise.resolve();
    },
    signUp: async (data: any) => {
        try {
            const email = data.email;
            const password = data.password;

            const userData = {
                email: email,
                password: password
            };

            // Stringify the userData object
            const requestBody = JSON.stringify(userData);
            console.log("requestBody:", requestBody);

            // Register a new user with email/password credentials using MongoDB Realm SDK
            await realmApp.emailPasswordAuth.registerUser(userData);

            return Promise.resolve();
        } catch (err) {
            console.error("Failed to sign up", err);
            throw new Error("Unable to sign up");
        }
    },
    checkAuth: () => {
        return localStorage.getItem("access_token") ? Promise.resolve() : Promise.reject();
    },
    logout: () => {
        localStorage.clear();
        return Promise.resolve();
    },
    getIdentity: () => {
        return Promise.resolve({
            id: 1,
            fullName: `imageRec`
        })
    },
    getPermissions: () => {
        const user = "user";
        return user ? Promise.resolve(user) : Promise.reject();
    }
};

export default authProvider;