/**
 * randomID
 */
export const randomId = (length) => {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
/**
 * Create slug
 */
 export const createSlug = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, "-")
    const cleanedSlug = slug.replace(/[^a-z0-9-]/g,"")
    return cleanedSlug
}