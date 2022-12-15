export const editor_default = (() => {
    const Editor = {
        availableTemplates: [{
                id: "blank",
                name: "Blank"
            },
            {
                id: "beauty",
                name: "Beauty"
            },
            {
                id: "cooking",
                name: "Cooking"
            },
            {
                id: "diy",
                name: "DIY"
            },
            {
                id: "entertainment",
                name: "Entertainment"
            },
            {
                id: "fashion",
                name: "Fashion"
            },
            {
                id: "fitness",
                name: "Fitness"
            },
            {
                id: "travel",
                name: "Travel"
            },
            {
                id: "wellbeing",
                name: "Wellbeing"
            }
        ],
        new(refresh, story_data) {
            const blankTemplate = require_blank();
            const uid = auth_default.get().uid || utils_default.uniqid();
            if (story_data) {
                blankTemplate.body.story_data = story_data;
            }
            const newStory = blankTemplate.body;
            const newStoryId = `${uid}-${utils_default.uniqid()}`;
            newStory.id = newStoryId;
            if (newStory.title && !newStory || newStory.title || newStory.title.raw) {
                newStory.title = "Untitled";
            }
            user_default.data.set("currentStoryPost", newStory);
            if (refresh) {
                window.App.refresh();
            }
            return newStory;
        },
        template(id) {
            if (id === "blank") {
                return Editor.new(true);
            }
            const filename = `/assets/editor/templates/${id}.json`;
            var xhr = new XMLHttpRequest();
            xhr.onload = function(event) {
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200) {
                        const story = JSON.parse(xhr.responseText);
                        Editor.new(true, story);
                    }
                }
            };
            xhr.open("GET", filename);
            xhr.send();
        },
        select(storyId) {
            const storageRef = window.firebase.storage().ref();
            const userData = auth_default.get();
            const userId = userData.uid;
            const filename = `${window.STORAGE_PATH}user/${userId}/data/${storyId}.json`;
            storageRef.child(filename).getDownloadURL().then((url) => {
                var xhr = new XMLHttpRequest();
                xhr.onload = function(event) {
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            const story = JSON.parse(xhr.responseText);
                            user_default.data.set("currentStoryPost", story);
                            window.App.refresh();
                        }
                    }
                };
                xhr.open("GET", url);
                xhr.send();
            });
        },
        actions: {
            download() {
                Editor.actions.save().then(function() {
                    const fullStoryData = user_default.data.get("currentStoryPost");
                    const storyLink = document.createElement("a");
                    const content = fullStoryData.content;
                    storyLink.href = `data:text/html,${encodeURIComponent(content)}`;
                    storyLink.download = "story.html";
                    storyLink.style.display = "none";
                    document.body.appendChild(storyLink);
                    storyLink.click();
                    document.body.removeChild(storyLink);
                });
            },
            snackBar(options) {},
            preview() {},
            save() {}
        }
    };
    return Editor;
})();