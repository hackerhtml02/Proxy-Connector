export default class Storage {
    static async get(key) {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return JSON.parse(localStorage.getItem(key));
        } else {
            const { [key]: value } = await chrome.storage.local.get([key]);

            return value;
        }
    }

    static async set(key, value) {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return localStorage.setItem(key, JSON.stringify(value));
        } else {
            await chrome.storage.local.set({ [key]: value });
        }
    }
}
