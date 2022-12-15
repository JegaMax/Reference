var media_default = (() => {
    const Media = {
        thumbnail(video, callback) {
            let canvas = document.querySelector("#media-canvas");
            let canvasObj = null;
            if (!canvas) {
                canvasObj = document.createElement("canvas");
                canvasObj.id = "media-canvas";
                canvasObj.className = "visuallyHidden";
                document.body.appendChild(canvasObj);
            } else {
                canvasObj = canvas;
            }
            canvasObj.width = video.videoWidth;
            canvasObj.height = video.videoHeight;
            utils_default.log("[Media] Canvas draw", video, 0, 0, video.videoWidth, video.videoHeight);
            canvasObj.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            video.hasThumbnail = true;
            canvasObj.toBlob(function(blob) {
                callback(blob);
                const canvasElement = document.querySelector("#media-canvas");
                canvasElement.parentNode.removeChild(canvasElement);
            }, "image/jpeg");
        },
        reader(file, callback) {
            utils_default.log("[Media] Reader read", file, file.type);
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                const result = e.target.result;
                utils_default.log("[Media] Reader read result", file.type);
                if (file.type.indexOf("image") !== -1) {
                    const image = new Image();
                    image.src = result;
                    image.onload = function() {
                        const height = image.height;
                        const width = image.width;
                        callback(file, {
                            data: result,
                            width,
                            height
                        });
                    };
                } else if (file.type.indexOf("video") !== -1) {
                    const video = document.createElement("video");
                    video.className = "visuallyHidden";
                    video.setAttribute("src", result);
                    video.style.width = "auto";
                    video.style.height = "auto";
                    video.hasThumbnail = false;
                    utils_default.log("[Media] Reader read video create", file.type);
                    document.body.appendChild(video);
                    const seekTo = 1;
                    video.addEventListener("loadeddata", function(e2) {
                        if (video.duration < seekTo) {
                            return;
                        }
                        setTimeout(() => {
                            video.currentTime = seekTo;
                        }, 200);
                        video.addEventListener("seeked", () => {
                            if (!video.hasThumbnail) {
                                utils_default.log("[Media] Reader read callback meta", video.videoWidth, video.videoHeight);
                                const height = video.videoHeight;
                                const width = video.videoWidth;
                                const duration = video.duration;
                                Media.thumbnail(video, (thumbnail) => {
                                    callback(file, {
                                        data: result,
                                        width,
                                        height,
                                        duration,
                                        thumbnail
                                    });
                                    video.parentNode.removeChild(video);
                                });
                            }
                        });
                    });
                } else {
                    callback(false);
                }
            };
        },
        prepare(file, onSuccess, onError) {
            const userData = auth_default.get();
            const userId = userData.uid;
            const fileName = file.name;
            const fileType = file.type;
            utils_default.log("[Media] File", file);
            Media.reader(file, (fileMedia, fileObject) => {
                utils_default.log("[Media] Reader callback", fileMedia, fileObject);
                const uploadMedia = (thumbnailPath, downloadURLThumbnail) => {
                    const meta = {
                        customMetadata: {
                            width: fileObject.width,
                            height: fileObject.height
                        }
                    };
                    if (downloadURLThumbnail) {
                        meta.customMetadata.thumbnail = downloadURLThumbnail;
                        meta.customMetadata.thumbnailPath = thumbnailPath;
                    }
                    if (fileObject.duration) {
                        meta.customMetadata.duration = fileObject.duration;
                    }
                    api_default.upload(file, `${window.STORAGE_PATH}user/${userId}/media/${fileName}`, meta).then((snapshot) => {
                        utils_default.log("[Media] Uploader settled", snapshot);
                        snapshot.ref.getDownloadURL().then((downloadURL) => {
                            utils_default.log("[Media] Upload url", downloadURL);
                            const upload = {
                                imageUrl: downloadURL,
                                meta: {
                                    name: fileName,
                                    thumbnail: downloadURLThumbnail,
                                    contentType: fileType,
                                    ...meta
                                }
                            };
                            onSuccess(upload);
                        }).catch((error) => {
                            onError(error);
                        });
                    }).catch((error) => {
                        onError(error);
                    });
                };
                if (fileMedia) {
                    if (fileObject.thumbnail) {
                        const thumbnailPath = `${window.STORAGE_PATH}user/${userId}/thumbnail/${fileName}.jpg`;
                        api_default.upload(fileObject.thumbnail, thumbnailPath).then((snapshot) => {
                            snapshot.ref.getDownloadURL().then((downloadURLThumbnail) => {
                                uploadMedia(thumbnailPath, downloadURLThumbnail);
                            });
                        });
                    } else {
                        uploadMedia();
                    }
                } else {
                    onError();
                }
            });
        },
        uploader(options) {
            const callbacks = {};
            const lastUpload = {};
            const triggerEvent = (name2) => {
                utils_default.log("[Media] Trigger", name2);
                if (callbacks[name2]) {
                    callbacks[name2]();
                }
            };
            return {
                on(event, callback) {
                    callbacks[event] = callback;
                },
                open() {
                    const userData = auth_default.get();
                    const userId = userData.uid;
                    if (!userId) {
                        return modal_default.open("modal__upload");
                    }
                    let uploader = null;
                    const mediaUploader = document.querySelector("#media-uploader");
                    if (!mediaUploader) {
                        uploader = document.createElement("input");
                        uploader.type = "file";
                        uploader.className = "visuallyHidden";
                        uploader.id = "media-uploader";
                        document.body.appendChild(uploader);
                    } else {
                        uploader = mediaUploader;
                    }
                    if (uploader) {
                        uploader.click();
                        uploader.onchange = () => {
                            Media.prepare(uploader.files[0], (upload) => {
                                lastUpload.imageUrl = upload.imageUrl;
                                lastUpload.meta = upload.meta;
                                triggerEvent("select");
                                triggerEvent("close");
                            }, () => {
                                triggerEvent("close");
                            });
                        };
                    }
                },
                state() {
                    return {
                        get(what) {
                            utils_default.log("[Media] State get", what);
                            if (what === "selection") {
                                return {
                                    first() {
                                        utils_default.log("[Media] State first");
                                        return {
                                            toJSON() {
                                                const uploadJSON = api_default.objects.upload(lastUpload.imageUrl, lastUpload.meta);
                                                utils_default.log("[Media] Upload JSON", uploadJSON);
                                                return uploadJSON;
                                            }
                                        };
                                    }
                                };
                            }
                        }
                    };
                }
            };
        },
        init() {
            if (window.wp) {
                wp.media = Media.uploader;
            }
        }
    };
    return Media;
})();