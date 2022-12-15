export const utils_default = (() => {
    const Utils = {
        popup(name2, url) {
            const winWidth = 600;
            const winHeight = 400;
            const winTop = screen.height / 2 - winHeight / 2;
            const winLeft = screen.width / 2 - winWidth / 2;
            window.open(url, name2, "top=" + winTop + ",left=" + winLeft + ",toolbar=0,status=0,width=" + winWidth + ",height=" + winHeight);
            return false;
        },
        uniqid() {
            return String.fromCharCode(65 + Math.floor(Math.random() * 26)) + new Date().getTime();
        },
        formatTime(seconds) {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor(seconds % 3600 / 60);
            const s = Math.round(seconds % 60);
            return [
                h,
                m > 9 ? m : h ? "0" + m : m || "0",
                s > 9 ? s : "0" + s
            ].filter(Boolean).join(":");
        },
        log(...args) {
            const mode = "dev";
            const configMode = "dev";
            if (window.document && configMode !== "dev" || true) {
                return false;
            } else {
                if (console) {
                    console.log.apply(null, args);
                }
            }
        },
        storage: {
            get(key) {
                return JSON.parse(window.localStorage.getItem(key));
            },
            set(key, value) {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        },
        fromObj(vars, notation) {
            if (!vars || typeof notation !== "string") {
                return false;
            }
            if (!notation) {
                return vars;
            }
            const parts = notation.split(".");
            while (parts.length) {
                if (!vars[parts[0]]) {
                    return false;
                }
                vars = vars[parts.shift()];
            }
            return vars;
        },
        setObj(obj, path, value, separator) {
            separator = separator || ".";
            if (!path) {
                return value;
            }
            const pList = path.split(separator);
            const key = pList.pop();
            const pointer = pList.reduce((accumulator, currentValue) => {
                if (accumulator[currentValue] === void 0) {
                    accumulator[currentValue] = {};
                }
                return accumulator[currentValue];
            }, obj);
            pointer[key] = value;
            return obj;
        }
    };
    // window.Utils = Utils;
    return Utils;
})();