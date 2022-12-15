import {user_default} from "./userService";
export const auth_default = (() => {
    const Auth = {
        get() {
            return user_default.data.get("currentData");
        },
        update() {
            const documentClass = document.documentElement.classList;
            documentClass.remove("s-isPreloading");
            if (Auth.get().uid) {
                documentClass.remove("s-isUnauthenticated");
                documentClass.add("s-isAuthenticated");
            } else {
                documentClass.remove("s-isAuthenticated");
                documentClass.add("s-isUnauthenticated");
            }
        },
        logout() {
            user_default.data.set("currentStoryPost", null);
            user_default.data.set("currentData", null);
            user_default.data.set("currentInfo", null);
            Auth.update();
            window.App.refresh();
        },
        init() {
            Auth.update();
            var uiConfig = {
                callbacks: {
                    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                        utils_default.log("[Auth] SIGN-IN SUCCESS", authResult);
                        utils_default.log("[Auth] SIGN-IN REDIRECT", redirectUrl);
                        user_default.data.set("currentData", {
                            displayName: authResult.user.displayName,
                            email: authResult.user.email,
                            emailVerified: authResult.user.emailVerified,
                            uid: authResult.user.uid,
                            phoneNumber: authResult.user.phoneNumber,
                            photoURL: authResult.user.photoURL,
                            metadata: authResult.user.metadata
                        });
                        user_default.data.set("currentInfo", {
                            isNewUser: authResult.additionalUserInfo.isNewUser,
                            providerId: authResult.additionalUserInfo.providerId,
                            profile: authResult.additionalUserInfo.profile
                        });
                        Auth.update();
                        modal_default.close("modal__login");
                        return false;
                    },
                    signInFailure: function(error) {
                        return false;
                    },
                    uiShown: function() {}
                },
                credentialHelper: firebaseui.auth.CredentialHelper.NONE,
                queryParameterForWidgetMode: "mode",
                queryParameterForSignInSuccessUrl: "signInSuccessUrl",
                signInFlow: "popup",
                signInSuccessUrl: "/",
                signInOptions: [{
                        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                        requireDisplayName: false
                    },
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID
                ],
                immediateFederatedRedirect: false,
                tosUrl: "/terms",
                privacyPolicyUrl: function() {
                    window.location.assign("/privacy");
                }
            };
            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            if (ui.isPendingRedirect()) {
                ui.start("#firebaseui-auth-container", uiConfig);
            } else {
                ui.start("#firebaseui-auth-container", uiConfig);
            }
            if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
                ui.start("#firebaseui-auth-container", uiConfig);
            }
            window.Auth = Auth;
        }
    };
    return Auth;
})();