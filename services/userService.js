import { utils_default } from "./utilsService";
export const user_default = (() => {
    const User = {
        store: false,
        data: {
            get(notation) {
                User.sync();
                return utils_default.fromObj(User.store, notation);
            },
            set(path, value, separator) {
                const returnValue = utils_default.setObj(User.store, path, value, separator);
                utils_default.storage.set("user", User.store);
                return returnValue;
            }
        },
        sync() {
            if (!User.store) {
                User.store = utils_default.storage.get("user") || {};
            }
        },
        init() {
            User.sync();
            window.User = User;
        }
    };
    return User;
})();