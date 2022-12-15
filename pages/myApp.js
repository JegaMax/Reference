import {modal_default}from "../services/modalService";
import { editor_default as Editor } from "../services/editorService";
const myApp = () => {
    return(
        <>
    <meta charSet="utf-8" />
    <title>Editor / webStories.io</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="With webStories you can create amp-stories quick and easily. No code needed." />
    <meta property="og:image" content="https://webstories.io/images/social.png" />
    <meta property="og:title" content="webStories" />
    <meta property="og:description" content="Make amp-stories quick and easily. No code needed." />
    <meta property="og:site_name" content="webStories" />
    <meta property="twitter:image" content="https://webstories.io/images/social-twitter.png" />
    <meta property="twitter:title" content="webStories" />
    <meta property="twitter:description" content="Make amp-stories quick and easily. No code needed." />
    <meta name="twitter:card" value="summary" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <link rel="apple-touch-icon" sizes="180x180" href="./assets/icons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="./assets/icons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="./assets/icons/favicon-16x16.png" />
    <link rel="mask-icon" href="./assets/icons/safari-pinned-tab.svg" color="#7868ba" />
    <link rel="manifest" href="./site.webmanifest" />
    <meta name="msapplication-TileColor" content="#7868ba" />
    <meta name="theme-color" content="#7868ba" />
    <link rel="stylesheet" id="common-css" href="./assets/css/app.css" />



    <script type="text/javascript">{`
        document.body.className = document
            .body
            .className
            .replace(no-js, js);
    `}</script>
    <div id="modal__welcome" className="c-modal c-modal--center">
        <div className="c-modal__window c-modal__window--large mdl-card mdl-shadow--2dp">
            <img alt="webStories logo" title="webStories" src="/assets/images/logo-full-color.svg" height="64" className="c-logo" />
            <h2 className="c-modal__subtitle">Make amp-stories quick and easily. No code needed.</h2>
            <ul className="c-features">
                <li>
                    <div>
                        <div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
<path d="M23 7V1h-6v2H7V1H1v6h2v10H1v6h6v-2h10v2h6v-6h-2V7h2zM3 3h2v2H3V3zm2 18H3v-2h2v2zm12-2H7v-2H5V7h2V5h10v2h2v10h-2v2zm4 2h-2v-2h2v2zM19 5V3h2v2h-2zm-5.27 9h-3.49l-.73 2H7.89l3.4-9h1.4l3.41 9h-1.63l-.74-2zm-3.04-1.26h2.61L12 8.91l-1.31 3.83z" />
</svg>
                            </div>
                        </div>
                        <div>
                            <h4>
                                Visual Editor
                            </h4>
                            <p>
                                You can edit stories through the WYSIWYG editor like you used to do on Keynote or PowerPoint apps.
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z" />
</svg>
                            </div>
                        </div>
                        <div>
                            <h4>
                                Share to your public
                            </h4>
                            <p>
                                Doesn't have a website? No problem. You can export stories to a public link which anyone can access.
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
 <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 4h7l5 5v8.58l-1.84-1.84c1.28-1.94 1.07-4.57-.64-6.28C14.55 8.49 13.28 8 12 8c-1.28 0-2.55.49-3.53 1.46-1.95 1.95-1.95 5.11 0 7.05.97.97 2.25 1.46 3.53 1.46.96 0 1.92-.28 2.75-.83L17.6 20H6V4zm8.11 11.1c-.56.56-1.31.88-2.11.88s-1.55-.31-2.11-.88c-.56-.56-.88-1.31-.88-2.11s.31-1.55.88-2.11c.56-.57 1.31-.88 2.11-.88s1.55.31 2.11.88c.56.56.88 1.31.88 2.11s-.31 1.55-.88 2.11z" />
</svg>
                            </div>
                        </div>
                        <div>
                            <h4>
                                SEO Friendly
                            </h4>
                            <p>
                                AMP-Stories are optimized to appear on Google and compatible search engines. It also helps you rank better.
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
<path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z" />
</svg>
                            </div>
                        </div>
                        <div>
                            <h4>
                                Works everywhere
                            </h4>
                            <p>
                                Exported stories works on mobile and desktop devices.
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
            <button data-text="Continue" onClick={event => { window.App.welcome(); }} className="c-button--cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
Get started
</button>
            <div className="c-content__footer c-content__footer--modal">
                <a href="/privacy">Privacy</a>
                <b className="c-content__separator" />
                <a href="/terms">Terms</a>
                <b className="c-content__separator" />
                <a href="/cdn-cgi/l/email-protection#3a5c5f5f5e585b59517a4d5f58494e5548535f49145355">Give Feedback</a>
            </div>
        </div>
    </div>
    <div id="body">
        <header className="c-header">
            <h1 className="c-header__logo">
                <a className="c-header__logoLink" tabIndex={0} href="/" onClick={event => { // TODO: Fix event handler code
`Modal.open('modal__welcome'); return false;`; }} title="webStories">
<svg title="webStories icon" xmlns="http://www.w3.org/2000/svg" style={{ isolation: "isolate" }} viewBox="0 0 1000 1000" className="c-icon c-header__logoImage" icon="logo" iconpack="app/solid" pack="app/solid" id="logo" height="18" data-icon="logo" data-icon_pack="app/solid">
<defs>
<clipPath id="a">
<path d="M0 0h1000v1000H0z" />
</clipPath>
</defs>
<g clipPath="url(#a)">
<path d="M458.67 17.67c-28.81 8.83-205.37 61.56-305.49 91.3-36.47 10.69-71.09 22.3-77.36 25.55-15.33 8.59-32.99 28.11-41.82 46.46-6.97 14.63-7.43 17.65-7.2 39.03 0 21.84.93 26.25 15.33 73.18 8.59 27.41 34.38 113.6 57.61 191.66 92.46 310.14 102.68 344.06 106.63 350.33l4.18 6.74 3.95-21.84c7.2-39.26 124.99-618.42 134.05-659.31 6.04-27.41 15.33-45.3 31.36-60.4 17.42-16.49 37.87-25.79 60.87-27.18 15.56-.93 26.95.7 87.58 13.01 38.33 7.9 70.86 13.94 72.48 13.71 1.86-.46.93-6.04-3.02-18.58-13.94-43.67-51.81-71.78-96.87-71.32-11.85 0-24.16 2.32-42.28 7.66z" />
<path d="M458.67 137.08c-26.72 9.29-49.95 29.27-60.64 52.27-3.25 7.67-11.38 40.89-20.44 85.49-58.54 285.05-106.4 521.78-107.56 531.3-2.55 21.37 6.97 50.64 23.23 70.62 8.83 10.92 27.41 23.93 41.12 28.57 11.62 3.95 77.13 17.66 255.54 53.43 157.97 31.83 160.53 32.06 177.72 30.9 29.74-2.56 62.72-25.32 76.43-53.43 5.81-12.08 9.06-27.18 71.09-330.58 48.33-236.95 58.09-286.43 58.09-297.35 0-37.17-26.71-76.2-60.87-88.98-20.21-7.43-410.96-86.42-427.69-86.42-7.9.23-19.75 1.86-26.02 4.18zM527 545" />
</g>
</svg>
<span title="webstories">
w<span className="c-header__logoTextSlide">eb</span>S<span className="c-header__logoTextSlide">tories</span>
</span>
</a>
            </h1>
            <span className="c-header__logo--beta">(beta)</span>
            <div className="c-header__actions s-hidePreloading" />
        </header>
        <div id="edit-story" className="hide-if-no-js">
            <div className="loading-message" title="Loading...">
                <img src="/assets/images/loader.svg" title="Loading" alt="Loading..." />
            </div>
        </div>
    </div>
    <div id="modal__export" className="c-modal c-modal--center">
        <div className="c-modal__window c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp" title="Export">
            <div className="c-modal__content" />
        </div>
    </div>
    <div id="modal__login" className="c-modal">
        <div className="c-modal__window c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp">
            <div className="c-modal__content">
                <div id="firebaseui-auth-container" />
            </div>
        </div>
    </div>
    <div id="modal__upload" className="c-modal">
        <div className="c-modal__window c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp" title="Upload files">
            <div className="c-modal__content" />
        </div>
    </div>
    <div id="modal__account" className="c-modal">
        <div className="c-modal__window c-modal__window--extralarge c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp" title="My Stories">
            <div className="c-modal__content" />
        </div>
    </div>
    <div id="modal__templates" className="c-modal">
        <div className="c-modal__window c-modal__window--extralarge c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp" title="Select a Template">
            <div className="c-modal__content" />
        </div>
    </div>
    <div id="modal__preview" className="c-modal">
        <div className="c-modal__window c-modal__window--withHeader c-modal__window--full mdl-card mdl-shadow--2dp" title="Preview">
            <div className="c-modal__content" />
        </div>
    </div>
    <link rel="stylesheet" id="edit-story-css" href="./assets/editor/css/edit-story.css" />
    <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js" />
    <script src="./assets/js/wp.js" />
    <script src="./assets/js/wp.i18n.js" />
    <script src="./assets/js/app.bundle.js" />
    <script id="edit-story-js-translations">{`
        (function(domain, translations) {
            var localeData = translations.locale_data[domain] || translations.locale_data.messages;
            localeData[""].domain = domain;
            wp
                .i18n
                .setLocaleData(localeData, domain);
        })("web-stories", {
            "locale_data": {
                "messages": {
                    "": {}
                }
            }
        });
    `}</script>
    <script src="./assets/editor/js/edit-story.js" id="edit-story-js" />

    <script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js" />

    <script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-analytics.js" />
    <script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-auth.js" />
    <script src="https://www.gstatic.com/firebasejs/7.24.0/firebase-storage.js" />
    <script src="https://www.gstatic.com/firebasejs/ui/4.7.0/firebase-ui-auth.js" />
{/* <button onClick={()=> {modal_default.open('modal__login')}} className="c-header__actionsButton s-showUnauthenticated">
            <svg className="c-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <g>
                    <rect fill="none" height="24" width="24" />
                </g>
                <g>
                    <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
                </g>
            </svg>
            <span>Login</span>
        </button><button onClick={()=> {modal_default.open('modal__account')}} className="c-header__actionsButton s-showAuthenticated">
                <svg className="c-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M10.25 13c0 .69-.56 1.25-1.25 1.25S7.75 13.69 7.75 13s.56-1.25 1.25-1.25 1.25.56 1.25 1.25zM15 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm7 .25c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM10.66 4.12C12.06 6.44 14.6 8 17.5 8c.46 0 .91-.05 1.34-.12C17.44 5.56 14.9 4 12 4c-.46 0-.91.05-1.34.12zM4.42 9.47c1.71-.97 3.03-2.55 3.66-4.44C6.37 6 5.05 7.58 4.42 9.47zM20 12c0-.78-.12-1.53-.33-2.24-.7.15-1.42.24-2.17.24-3.13 0-5.92-1.44-7.76-3.69C8.69 8.87 6.6 10.88 4 11.86c.01.04 0 .09 0 .14 0 4.41 3.59 8 8 8s8-3.59 8-8z" />
                </svg>
                <span>My Stories</span>
            </button><button onClick={()=> {modal_default.open('modal__templates')}} className="c-header__actionsButton">
                <svg className="c-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z" />
                </svg>
                <span>New Story</span>
            </button><button onClick={Editor.actions.preview()} className="c-header__actionsButton">
                <svg className="c-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z" />
                </svg>
                <span>Preview</span>
            </button><button onClick={Editor.actions.save()} className="c-header__actionsButton">
                <svg className="c-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z" />
                </svg>
                <span>Save</span>
            </button><button onClick={()=> {modal_default.open('modal__export')}} className="c-header__actionsButton c-header__actionsButton--primary">
                <svg className="c-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />
                </svg>
                <span>Export</span>
            </button>
            <><div id="modal__export" className="c-modal c-modal--center">
        <div className="c-modal__window c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp" title="Export">
            <div className="c-modal__content" />
        </div>
    </div>
    <div id="modal__login" className="c-modal">
        <div className="c-modal__window c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp">
            <div className="c-modal__content">
                <div id="firebaseui-auth-container" />
            </div>
        </div>
    </div>
    <div id="modal__upload" className="c-modal">
        <div className="c-modal__window c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp" title="Upload files">
            <div className="c-modal__content" />
        </div>
    </div>
    <div id="modal__account" className="c-modal">
        <div className="c-modal__window c-modal__window--extralarge c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp" title="My Stories">
            <div className="c-modal__content" />
        </div>
    </div>
    <div id="modal__templates" className="c-modal">
        <div className="c-modal__window c-modal__window--extralarge c-modal__window--withHeader c-modal__window--managed mdl-card mdl-shadow--2dp" title="Select a Template">
            <div className="c-modal__content" />
        </div>
    </div>
    <div id="modal__preview" className="c-modal">
        <div className="c-modal__window c-modal__window--withHeader c-modal__window--full mdl-card mdl-shadow--2dp" title="Preview">
            <div className="c-modal__content" />
        </div>
    </div></> */}
            </>
    );
    // welcome() {
    //     const welcome = user_default.data.get("welcome");
    //     modal_default.close("modal__welcome");
    //     if (!welcome) {
    //         modal_default.open("modal__templates");
    //         user_default.data.set("welcome", true);
    //     }
    //     const ctaLink = document.querySelector("#modal__welcome .c-button--cta");
    //     if (ctaLink) {
    //         ctaLink.textContent = ctaLink.getAttribute("data-text");
    //     }
    //     auth_default.update();
    // },
    // refresh() {
    //     window.location.reload();
    // },
    // init() {
    //     const welcome = user_default.data.get("welcome");
    //     modal_default.init();
    //     services_default.init();
    //     media_default.init();
    //     api_default.init();
    //     auth_default.init();
    //     user_default.init();
    //     myApp.actions();
    //     if (!welcome) {
    //         modal_default.open("modal__welcome");
    //     } else {
    //         myApp.welcome();
    //     }
    // }
    // const headerActions = document.querySelector(".c-header__actions");
    //     if (!headerActions.firstElementChild) {
    //         headerActions.innerHTML = html;
    //     }
};

export default myApp;