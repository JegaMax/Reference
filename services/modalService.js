import {auth_default} from "./authService";
import { editor_default } from "./editorService";
import { utils_default } from "./utilsService";
import { editor_default as Editor } from "../services/editorService";
import ClipboardJS from "clipboard";
export const modal_default = (() => {
    const Modal = {
        open(id) {
            const modals = document.querySelectorAll(".c-modal");
            modals.forEach((modal4) => {
                if (modal4.id === id && !modal4.classList.contains("active")) {
                    modal4.classList.add("active");
                    Modal.header(id);
                    Modal.content(id);
                    Modal.events(id);
                    // if (gtag) {
                    //     const title = modal4.getAttribute("title");
                    //     gtag("event", "screen_view", {
                    //         screen_name: title || id
                    //     });
                    // }
                } else if (modal4.id !== id) {
                    modal4.classList.remove("active");
                }
            });
        },
        close(id) {
            const modals = document.querySelectorAll(".c-modal");
            modals.forEach((modal4) => {
                if (modal4.id === id) {
                    modal4.classList.remove("active");
                }
            });
        },
        events(id) {
            const modalId = id.replace("modal__", "");
            const modalElement = document.getElementById(id);
            const userData = auth_default.get();
            const userId = userData.uid;
            const setContent = (html) => {
                if (modalElement) {
                    const modalContent = modalElement.querySelector(".c-modal__content");
                    modalContent.innerHTML = html;
                }
            };
            switch (modalId) {
                case "login":
                    break;
                case "account":
                    const storageRef = window.firebase.storage().ref();
                    const accountPanel = `<div class="c-accountDetails">
        <div class="c-accountDetails__name">
          Logged in as <strong>${userData.displayName || userData.email}</strong>
        </div>

        <div class="c-accountDetails__actions">
          <button onclick="window.Auth.logout();" class="c-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Logout</button>
        </div>
      </div>`;
                    const noContentMessage = `<div class="c-modal__message">
        You don't have any saved stories yet. <br><br>
        <button onclick="Modal.open('modal__templates');" class="c-button--auto mdl-button mdl-js-button mdl-js-ripple-effect">Create one!</button>
      </div>`;
                    storageRef.child(`${window.STORAGE_PATH}user/${userId}/thumbnail-story`).listAll().then((thumbnailResults) => {
                        storageRef.child(`${window.STORAGE_PATH}user/${userId}/data`).listAll().then((results) => {
                            const items = results.items;
                            const itemsThumbnail = thumbnailResults.items;
                            const urlPromises = [];
                            const thumbnailPromises = [];
                            const metadataPromises = [];
                            items.forEach((itemSnapshot) => {
                                urlPromises.push(itemSnapshot.getDownloadURL());
                                metadataPromises.push(itemSnapshot.getMetadata());
                            });
                            itemsThumbnail.forEach((itemSnapshot) => {
                                thumbnailPromises.push(itemSnapshot.getDownloadURL());
                            });
                            Promise.allSettled(urlPromises).then((urlResults) => {
                                Promise.allSettled(metadataPromises).then((metadataResults) => {
                                    Promise.allSettled(thumbnailPromises).then((thumbnailResults2) => {
                                        utils_default.log("[Modal] Story list results", thumbnailResults2, urlResults, metadataResults);
                                        const thumbnailList = {};
                                        thumbnailResults2.forEach((thumbnailResult) => {
                                            if (thumbnailResult.value) {
                                                const id2 = thumbnailResult.value.split("thumbnail-story%2F")[1].split(".")[0];
                                                thumbnailList[id2] = thumbnailResult.value;
                                            }
                                        });
                                        if (modalElement) {
                                            let html = "";
                                            if (urlResults.length > 0) {
                                                html += '<div class="c-storyList">';
                                                urlResults.forEach((urlResult, index) => {
                                                    const meta = metadataResults[index] ? metadataResults[index] : urlResult.value;
                                                    const id2 = urlResult.value.split("data%2F")[1].split(".")[0];
                                                    const title = meta ? meta.customMetadata : meta.title;
                                                    const date = new Date().toISOString().split(" GMT")[0];
                                                    utils_default.log("[Modal] Url results", urlResult, meta);
                                                    html += `<button onclick="Editor.select('${id2}');" type="button" class="c-storyList__item">

                                <span class="c-storyList__itemPreview">
                                ${thumbnailList[id2] ? `<img src="${thumbnailList[id2]}" width="100" />` : "<span>No preview available</span>"}
                                </span>

                                <span class="c-storyList__itemTitle">${title || date}</span>
                              </button>`;
                                                });
                                                html += "</div>";
                                            } else {
                                                html = noContentMessage;
                                            }
                                            html += accountPanel;
                                            setContent(html);
                                        }
                                    });
                                });
                            });
                        }).catch((error) => {
                            let html = noContentMessage;
                            html += accountPanel;
                            setContent(html);
                        });
                    }).catch((error) => {
                        let html = noContentMessage;
                        html += accountPanel;
                        setContent(html);
                    });
                    break;
                case "export":
                    if (userId) {
                        editor_default.actions.save();
                        const exportStory = () => {
                            const currentStory = user_default.data.get("currentStoryPost");
                            const content = currentStory.content;
                            const title = currentStory ? currentStory.title.raw : currentStory.title;
                            const filepath = `${window.STORAGE_PATH}user/${userId}/story/${currentStory.storyId}`;
                            const filename = `${filepath}/index.html`;
                            let file = new File([content], "index.html", {
                                type: "text/html"
                            });
                            console.log("[API] Upload start", filename, title, currentStory);
                            api_default.upload(file, filename, {
                                customMetadata: {
                                    title
                                }
                            }).then((snapshot) => {
                                snapshot.ref.getDownloadURL().then((exportedURL) => {
                                    console.log("[API] Upload complete", filename, exportedURL);
                                    const shareTitle = encodeURIComponent("");
                                    const shareUrl = encodeURIComponent(exportedURL);
                                    const html = `
                <div class="c-content--left c-content--padding">
                  <p>Copy this link to share anywhere:</p>

                  <div id="export-link-form" class="flex items-center justify-center">
                    <div class="mdl-textfield mdl-js-textfield flex-grow">
                      <input id="export-link" class="mdl-textfield__input" type="text" value="${exportedURL}" readonly id="sample1">
                    </div>

                    <div class="items-center">
                      <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" data-clipboard-target="#export-link">
                        Copy
                      </button>
                    </div>
                  </div>

                  <p class="c-content__title">Or select an option below:</p>
                  <div class="flex justify-between">
                    <div class="items-center">
                      <a onclick="return Utils.popup('sharer', this.href);" href="https://www.facebook.com/dialog/share?app_id=140586622674265&display=popup&href=${shareUrl}" class="c-shareIcon">
                        <svg xmlns="http://www.w3.org/2000/svg"
                        aria-label="Facebook" role="img"
                        viewBox="0 0 512 512"><rect
                        width="512" height="512"
                        rx="15%"
                        fill="#1877f2"/><path d="M355.6 330l11.4-74h-71v-48c0-20.2 9.9-40 41.7-40H370v-63s-29.3-5-57.3-5c-58.5 0-96.7 35.4-96.7 99.6V256h-65v74h65v182h80V330h59.6z" fill="#fff"/></svg>
                      </a>
                      <a onclick="return Utils.popup('sharer', this.href);" href="https://twitter.com/intent/tweet?text=${shareTitle}${shareUrl}&related=" class="c-shareIcon">
                        <svg xmlns="http://www.w3.org/2000/svg"
                        aria-label="Twitter" role="img"
                        viewBox="0 0 512 512"><rect
                        width="512" height="512"
                        rx="15%"
                        fill="#1da1f2"/><path fill="#fff" d="M437 152a72 72 0 01-40 12a72 72 0 0032-40a72 72 0 01-45 17a72 72 0 00-122 65a200 200 0 01-145-74a72 72 0 0022 94a72 72 0 01-32-7a72 72 0 0056 69a72 72 0 01-32 1a72 72 0 0067 50a200 200 0 01-105 29a200 200 0 00309-179a200 200 0 0035-37"/></svg>
                      </a>
                      <a onclick="return Utils.popup('sharer', this.href);" href="https://linkedin.com/sharing/share-offsite/?url=${shareUrl}" class="c-shareIcon">
                        <svg xmlns="http://www.w3.org/2000/svg"
                        aria-label="LinkedIn" role="img"
                        viewBox="0 0 512 512"
                        fill="#fff"><rect
                        width="512" height="512"
                        rx="15%"
                        fill="#0077b5"/><circle cx="142" cy="138" r="37"/><path stroke="#fff" stroke-width="66" d="M244 194v198M142 194v198"/><path d="M276 282c0-20 13-40 36-40 24 0 33 18 33 45v105h66V279c0-61-32-89-76-89-34 0-51 19-59 32"/></svg>
                      </a>
                      <a onclick="return Utils.popup('sharer', this.href);" href="https://api.whatsapp.com/send?text=${shareTitle}${shareUrl}" class="c-shareIcon">
                        <svg xmlns="http://www.w3.org/2000/svg"
                        aria-label="WhatsApp" role="img"
                        viewBox="0 0 512 512"><rect
                        width="512" height="512"
                        rx="15%"
                        fill="#25d366"/><path fill="#25d366" stroke="#fff" stroke-width="26" d="M123 393l14-65a138 138 0 1150 47z"/><path fill="#fff" d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"/></svg>
                      </a>
                      <a onclick="return Utils.popup('sharer', this.href);" href="https://telegram.me/share/url?url=${shareUrl}&text=${shareTitle}" class="c-shareIcon">
                        <svg xmlns="http://www.w3.org/2000/svg"
                        aria-label="Telegram" role="img"
                        viewBox="0 0 512 512"><rect
                        width="512" height="512"
                        rx="15%"
                        fill="#37aee2"/><path fill="#c8daea" d="M199 404c-11 0-10-4-13-14l-32-105 245-144"/><path fill="#a9c9dd" d="M199 404c7 0 11-4 16-8l45-43-56-34"/><path fill="#f6fbfe" d="M204 319l135 99c14 9 26 4 30-14l55-258c5-22-9-32-24-25L79 245c-21 8-21 21-4 26l83 26 190-121c9-5 17-3 11 4"/></svg>
                      </a>
                    </div>
                    <div class="items-center">
                      <button onClick="window.Editor.actions.download();" class="c-button--big mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                        Download HTML file
                      </button>
                    </div>
                  </div>
                </div>
              `;
                                    setContent(html);
                                });
                            }).catch(() => {
                                editor_default.actions.snackBar({
                                    message: "Error while exporting your story. Are you logged in?"
                                });
                            });
                        };
                        const checkId = () => {
                            window.clearTimeout(window.exportTime);
                            const currentStory = user_default.data.get("currentStoryPost");
                            if (currentStory.storyId) {
                                console.log("[Story] Is Saved");
                                exportStory();
                            } else {
                                console.log("[Story] Not Saved");
                                window.exportTime = setTimeout(() => {
                                    checkId();
                                }, 500);
                            }
                        };
                        checkId();
                    }
                    break;
            }
            if (modalElement) {
                const close = modalElement.querySelector(".c-modal__close");
                if (close) {
                    close.onclick = () => {
                        Modal.close(modalElement.id);
                    };
                }
            }
        },
        header(id) {
            let html = (title) => `
    <button class="mdl-button mdl-js-button mdl-button--icon c-modal__close">
      <i class="material-icons">&times;</i>
    </button>
    ${title ? `
    <div class="firebaseui-card-header">
      <span class="firebaseui-title">${title}</span>
    </div>` : ``}
  `;
            const modalElement = document.getElementById(id);
            const modalWindow = modalElement.querySelector(".c-modal__window--withHeader");
            const modalContent = modalElement.querySelector(".c-modal__content");
            const modalHeader = modalElement.querySelector(".c-modal__header");
            if (modalWindow && modalContent && !modalHeader) {
                const title = modalWindow.getAttribute("title");
                const div = document.createElement("div");
                div.className = "c-modal__header";
                div.innerHTML = html(title);
                modalContent.parentNode.insertBefore(div, modalContent);
            }
        },
        content(id) {
            let html = null;
            const modalId = id.replace("modal__", "");
            const userData = auth_default.get();
            const userId = userData.uid;
            const loading = `
  <div class="c-modal__loading">
    <img class="c-modal__loadingImage" src="/assets/images/loader.svg" />
    <span>Loading...</span>
  </div>`;
            switch (modalId) {
                case "export":
                    const downloadButton = `
      <button onClick="window.Editor.actions.download();" class="c-button--cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
        Download HTML file
      </button>`;
                    if (!userId) {
                        html = `
          <div class="c-content c-content--center">
            <img alt="Export file" src="/assets/images/undraw_download_files_aydf.svg" height="128"/>

            <p>You can download and edit only 1 story without an account.</p>
            <p>Create an account to upload assets and save multiple stories in the cloud!</p>
          </div>

          ${downloadButton}

          <div class="c-button--spacer">or</div>
          <button onclick="Modal.open('modal__login')" class="c-button--auto mdl-button mdl-js-button mdl-js-ripple-effect">
            Create an account
          </button>
        `;
                    } else {
                        html = loading;
                    }
                    break;
                case "preview":
                    const currentStory = user_default.data.get("currentStoryPost");
                    const content = currentStory.content;
                    const updatedPreviewLink = `data:text/html,${encodeURIComponent(content)}`;
                    html = `<iframe src="${updatedPreviewLink}" border="0"></iframe>`;
                    break;
                case "account":
                    html = loading;
                    break;
                case "upload":
                    if (!userId) {
                        html = `
        <div class="c-content c-content--center c-content--textCenter">
          <img alt="Export file" src="/assets/images/undraw_upload_87y9.svg" height="128"/>

          <p>To upload media files you need to login.</p>

          <button onclick="Modal.open('modal__login')" class="c-button--auto c-button--modal c-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Create an account
          </button>
        </div>
          `;
                    }
                    break;
                case "templates":
                    html = "";
                    const availableTemplates = editor_default.availableTemplates;
                    if (availableTemplates.length > 0) {
                        html += '<div class="c-storyList c-storyList--visible">';
                        availableTemplates.forEach((template, index) => {
                            const id2 = template.id;
                            const title = template.name;
                            const thumb = `/assets/images/templates/${id2}.png`;
                            utils_default.log("[Modal] Url results", template);
                            html += `<button onclick="Editor.template('${id2}');" type="button" class="c-storyList__item">

                    <span class="c-storyList__itemPreview">
                    ${thumb ? `<img src="${thumb}" width="100" />` : "<span>No preview available</span>"}
                    </span>

                    <span class="c-storyList__itemTitle">${title}</span>
                  </button>`;
                        });
                        html += "</div>";
                    }
                    break;
            }
            if (html) {
                const modalElement = document.getElementById(id);
                const contentWrapper = modalElement ? modalElement.querySelector(".c-modal__content") : null;
                if (contentWrapper) {
                    contentWrapper.innerHTML = html;
                }
                // const clipboard2 = ClipboardJS.default("[data-clipboard-target]");
                // clipboard2.on("success", function(e) {
                //     e.clearSelection();
                //     editor_default.actions.snackBar({
                //         message: "Link copied to your clipboard"
                //     });
                // });
            }
        },
        init() {
            window.Modal = Modal;
        }
    };
    return Modal;
})();