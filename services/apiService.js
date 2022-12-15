import {html2canvas} from html2canvas;

var api_default = (() => {
    const API = {
        format: {
            storyPost(story) {
                const currentStoryPost = user_default.data.get("currentStoryPost");
                utils_default.log("[API] Format storyPost", story, currentStoryPost);
                if (currentStoryPost.id) {
                    story.storyId = currentStoryPost.id;
                } else if (currentStoryPost.storyId) {
                    story.storyId = currentStoryPost.storyId;
                }
                if (currentStoryPost.title && !currentStoryPost || currentStoryPost.title || currentStoryPost.raw) {
                    currentStoryPost.title = {
                        raw: currentStoryPost.title
                    };
                }
                return story;
            }
        },
        objects: {
            story(post) {
                return {
                    title: {
                        raw: post.title
                    },
                    status: post.status,
                    author: post.author,
                    slug: post.slug,
                    date_gmt: post.date_gmt,
                    modified: post.modified,
                    excerpt: {
                        raw: post.excerpt
                    },
                    link: post.link,
                    story_data: post.storyDataRaw,
                    featured_media: post.featuredMedia,
                    featured_media_url: post.featuredMediaUrl,
                    publisher_logo_url: post.publisherLogoUrl,
                    permalink_template: post.permalinkTemplate,
                    style_presets: post.stylePresets,
                    password: post.password
                };
            },
            upload(imageUrl, meta) {
                const width = meta ? meta.width : meta.customMetadata ? meta.width : 200;
                const height = meta ? meta.height : meta.customMetadata ? meta.height : 200;
                const duration = meta ? meta.duration : meta.customMetadata ? meta.duration : 0;
                const fileSize = meta ? meta.size : 0;
                const filename = meta.name;
                const contentType = meta ? meta.contentType:"";
                const date = meta ? meta.timeCreated:"";
                const modified = meta ? meta.updated:"";
                const id = meta ? meta.md5Hash : imageUrl;
                const thumbnail = meta ? meta.thumbnail : meta.customMetadata ? meta.thumbnail : imageUrl;
                const link = imageUrl;
                const slug = `${id}-${filename}`.replace(/ /gi, "-");
                const mediaType = contentType ? contentType.split("/")[0] : "image";
                const extension = `${filename}`.split(".").pop();
                const orientation = "landscape";
                const size = meta ? contentType.size : 100;
                const thumbObject = thumbnail ? {
                    src: thumbnail,
                    width,
                    height,
                    generated: true
                } : {};
                utils_default.log("[Upload] Single", imageUrl, width, height);
                return {
                    uploading: false,
                    date,
                    filename: name,
                    menuOrder: 0,
                    uploadedTo: 0,
                    type: mediaType,
                    subtype: extension,
                    id,
                    title: filename,
                    url: imageUrl,
                    link,
                    alt: "",
                    author: "1",
                    description: "",
                    caption: "",
                    name: slug,
                    status: "inherit",
                    modified,
                    mime: contentType,
                    icon: "",
                    dateFormatted: date,
                    nonces: {
                        update: "b1d9bf6f20",
                        delete: "3e0b632e87",
                        edit: "576b4c46ae"
                    },
                    editLink: "",
                    meta: false,
                    authorName: "admin",
                    filesizeInBytes: size,
                    filesizeHumanReadable: `${size}`,
                    context: "",
                    height: width,
                    width: height,
                    orientation,
                    featured_media_src: thumbObject,
                    media_details: thumbnail ? {
                        filesize: fileSize,
                        mime_type: contentType,
                        length: duration,
                        length_formatted: utils_default.formatTime(duration),
                        width,
                        height,
                        fileformat: extension,
                        audio: {
                            dataformat: extension,
                            codec: "ISO/IEC 14496-3 AAC",
                            sample_rate: 48e3,
                            channels: 2,
                            bits_per_sample: 16,
                            lossless: false,
                            channelmode: "stereo"
                        },
                        created_timestamp: date,
                        sizes: {}
                    } : {},
                    sizes: {},
                    compat: {
                        item: "",
                        meta: ""
                    }
                };
            },
            storyPost(id, template) {
                if (id === "current") {
                    const story = user_default.data.get("currentStoryPost") || API.objects.storyPost();
                    if (!story.title) {
                        story.title = {
                            raw: ""
                        };
                    }
                    if (!story.excerpt) {
                        story.excerpt = {
                            raw: ""
                        };
                    }
                    if (story.title && !story || story.title || story.raw) {
                        story.title = {
                            raw: story.title
                        };
                    }
                    story.permalink_template = "https://webstories.io/story/%pagename%";
                    user_default.data.set("currentStoryPost", story);
                    return story;
                } else {
                    return editor_default.new();
                }
            },
            uploadPost(imageUrl, meta) {
                const width = meta ? meta.width : meta.customMetadata ? meta.width : 200;
                const height = meta ? meta.height : meta.customMetadata ? meta.height : 200;
                const duration = meta ? meta.duration : meta.customMetadata ? meta.duration : 0;
                const fileSize = meta ? meta.size : 0;
                const filename = meta.name;
                const contentType = meta ? meta.contentType:"";
                const date = meta ? meta.timeCreated:"";
                const modified = meta ? meta.updated:"";
                const id = meta ? meta.md5Hash : imageUrl;
                const thumbnail = meta ? meta.thumbnail : meta.customMetadata ? meta.thumbnail : imageUrl;
                const link = imageUrl;
                const slug = `${id}-${filename}`.replace(/ /gi, "-");
                const mediaType = contentType ? contentType.split("/")[0] : "image";
                const extension = `${filename}`.split(".").pop();
                const orientation = "landscape";
                const size = meta ? contentType.size : 100;
                const thumbObject = thumbnail ? {
                    src: thumbnail,
                    width,
                    height,
                    generated: true
                } : {};
                utils_default.log("[Upload] Post", imageUrl, width, height);
                return {
                    id,
                    date,
                    date_gmt: date,
                    guid: {
                        rendered: imageUrl,
                        raw: imageUrl
                    },
                    modified,
                    modified_gmt: modified,
                    slug,
                    status: "inherit",
                    type: "attachment",
                    link,
                    title: {
                        raw: filename,
                        rendered: filename
                    },
                    author: 1,
                    featured_media: 0,
                    comment_status: "open",
                    ping_status: "closed",
                    template: "",
                    meta: {
                        web_stories_is_poster: false,
                        web_stories_poster_id: 0
                    },
                    permalink_template: link,
                    generated_slug: slug,
                    media_source: "editor",
                    description: {
                        raw: "",
                        rendered: ""
                    },
                    caption: {
                        raw: "",
                        rendered: ""
                    },
                    alt_text: "",
                    media_type: mediaType,
                    mime_type: contentType,
                    featured_media_src: thumbObject,
                    media_details: thumbnail ? {
                        filesize: fileSize,
                        length: duration,
                        length_formatted: utils_default.formatTime(duration),
                        mime_type: contentType,
                        width,
                        height,
                        fileformat: extension,
                        created_timestamp: date,
                        sizes: {}
                    } : {
                        width,
                        height,
                        file: imageUrl,
                        sizes: {
                            full: {
                                file: filename,
                                width,
                                height,
                                mime_type: contentType,
                                source_url: imageUrl
                            }
                        }
                    },
                    source_url: imageUrl,
                    missing_image_sizes: []
                };
            }
        },
        middlewares() {
            return {
                "/web-stories/v1/web-story/22?context=edit": {
                    body: API.objects.storyPost("current"),
                    headers: {
                        Link: '<http://localhost:8899/?post_type=web-story&p=22>; rel="alternate"; type=text/html'
                    }
                },
                "/web-stories/v1/media?context=edit&per_page=100&page=1&_web_stories_envelope=true": {
                    body: {
                        body: [],
                        status: 200,
                        headers: {
                            "X-WP-Total": 4,
                            "X-WP-TotalPages": 1
                        }
                    },
                    headers: []
                },
                "/web-stories/v1/web-story/22": {
                    body: API.objects.storyPost("current"),
                    headers: {
                        Link: '<http://localhost:8899/?post_type=web-story&p=22>; rel="alternate"; type=text/html'
                    }
                }
            };
        },
        refreshEditURL() {},
        upload(file, path, meta) {
            const storageRef = window.firebase.storage().ref();
            const mediaRef = storageRef.child(path);
            utils_default.log("[API] Upload", file, path, meta);
            return meta ? mediaRef.put(file, meta) : mediaRef.put(file);
        },
        fetch(...args) {
            const params = args[0];
            const pathMiddleware = params.path && API.middlewares()[params.path];
            const userData = auth_default.get();
            const userId = userData.uid;
            utils_default.log("[API] Request", params.path, params, userId);
            return new Promise((resolve, reject) => {
                if (params.path.indexOf("/web-stories/v1/web-story/22") !== -1 && params.method === "GET") {
                    utils_default.log("[API] Get Story", params.path, params);
                    resolve(API.objects.storyPost("current"));
                } else if (params.path.indexOf("/web-stories/v1/web-story/22") !== -1 && params.method === "POST") {
                    utils_default.log("[API] Save Story", params.path, { ...params.data
                    });
                    const data = API.format.storyPost(params.data);
                    const title = data.title ? data.title.raw : data.title;
                    utils_default.log("[API] Save Story Data", params.path, { ...data
                    });
                    user_default.data.set("currentStoryPost", data);
                    if (params.path.indexOf("/autosaves") !== -1 || !userId) {
                        editor_default.actions.snackBar({
                            message: "Changes saved locally"
                        });
                        resolve(data);
                    } else {
                        utils_default.log("[API] Get first page preview", data, data.storyId);
                        const firstPagePreview = document.querySelector('[class*="carousel__ItemContainer"] [class*="reorderableItem__Container"] button:first-child > div');
                        const filename = `${data.storyId.split(`-`)[1]}`;
                        utils_default.log("[API] Get first page preview 2", filename);
                        if (firstPagePreview) {
                            utils_default.log("[API] Shot page preview", firstPagePreview);
                            html2canvas.default(firstPagePreview, {
                                useCORS: true,
                                allowTaint: true,
                                scale: 15,
                                backgroundColor: null
                            }).then(function(canvas) {
                                utils_default.log("[API] first page preview shot", canvas);
                                canvas.className = "visuallyHidden";
                                canvas.crossorigin = "anonymous";
                                canvas.toBlob((blob) => {
                                    API.upload(blob, `${window.STORAGE_PATH}user/${userId}/thumbnail-story/${filename}.jpg`).then((status) => {
                                        utils_default.log("[API] Upload story thumb", status);
                                    });
                                }, "image/jpeg", 0.8);
                            });
                        }
                        const file = new File([JSON.stringify(data)], `${filename}.json`, {
                            type: "application/json",
                            lastModified: new Date().getTime()
                        });
                        API.upload(file, `${window.STORAGE_PATH}user/${userId}/data/${filename}.json`, {
                            customMetadata: {
                                title
                            }
                        }).then((status) => {
                            utils_default.log("[API] Upload", filename, status);
                            editor_default.actions.snackBar({
                                message: "Story successfully saved"
                            });
                            resolve(data);
                        }).catch(() => {
                            reject({
                                message: "Error while saving data. Are you logged in?"
                            });
                        });
                    }
                } else if (params.path === "/web-stories/v1/media" && params.method === "POST") {
                    utils_default.log("[API] Upload image", params.path, params.body.entries());
                    for (const p of params.body.entries()) {
                        if (p[0] === "file") {
                            const file = p[1];
                            media_default.prepare(file, (upload) => {
                                utils_default.log("[API] Upload success", upload);
                                resolve(API.objects.uploadPost(upload.imageUrl, upload.meta));
                            }, () => {
                                utils_default.log("[API] Upload reject");
                                reject({
                                    message: "Error while uploading file. Are you logged in?"
                                });
                            });
                        }
                    }
                } else if (params.path.indexOf("/web-stories/v1/media") !== -1) {
                    utils_default.log("[API] List media", params.path);
                    const storageRef = window.firebase.storage().ref();
                    storageRef.child(`${window.STORAGE_PATH}user/${userId}/media`).listAll().then((results) => {
                        const items = results.items;
                        const urlPromises = [];
                        const metadataPromises = [];
                        items.forEach((itemSnapshot) => {
                            urlPromises.push(itemSnapshot.getDownloadURL());
                            metadataPromises.push(itemSnapshot.getMetadata());
                        });
                        Promise.allSettled(urlPromises).then((urlResults) => {
                            Promise.allSettled(metadataPromises).then((metadataResults) => {
                                const apiResult = {
                                    body: [],
                                    status: 200,
                                    headers: {
                                        "X-WP-Total": items.length,
                                        "X-WP-TotalPages": 1
                                    }
                                };
                                utils_default.log("[API] List media meta", metadataResults);
                                urlResults.forEach(({
                                    value
                                }, index) => {
                                    apiResult.body.push(API.objects.uploadPost(value, metadataResults[index].value));
                                });
                                utils_default.log("[API] List media result", apiResult);
                                resolve(apiResult);
                            });
                        });
                    }).catch((error) => {
                        reject({
                            message: "Error while listing media files. Are you logged in?"
                        });
                    });
                } else if (pathMiddleware) {
                    resolve(pathMiddleware.body);
                } else {
                    reject();
                }
            });
        },
        init() {
            window.APIManager = API;
            window.API = API.fetch;
        }
    };
    API.init();
    return API;
})();