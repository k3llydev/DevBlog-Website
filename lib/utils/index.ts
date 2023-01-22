import { CONSTANTS } from '../constants';
import { sep, posix } from 'path';

export const ForceUnixUri = (path: string) => path.split(sep).join(posix.sep);

/**
 * A solution made to automatically generate URLs for SEO based on file names in Next.js
 * @param nodejs__filename
 * @param params
 * @returns {String}
 */
export const StaticUrlGenerator = (nodejs__filename: string, params?: Object): string => {
    // Length of string + 1 to get only the remaining url
    const lastIndex = nodejs__filename.indexOf('pages') + 6;
    // Replacing .js because it's how files are handled by Next.js on build time
    let rawPath = ForceUnixUri(nodejs__filename).substring(lastIndex, nodejs__filename.length).replace('.js', '');
    // Replacing dynamic paths in URL with the ones provided in params. E.g.: [index], [page]
    if(params) {
        for(let [keyword, value] of Object.entries(params)) {
            rawPath = rawPath.replace(`[${keyword}]`, value);
        }
    }
    return new URL(rawPath, CONSTANTS.APP_HOST).href;
};

/**
 * A function that helps translate html charcodes into the actual character.
 * Useful for <title> and alike tags.
 * @param str The string where the html charcodes will be replaced.
 * @returns {String}
 */
export const decodeHtmlCharCodes = (str: string) => str.replace(/(&#(\d+);)/g, (_, __, charCode) => String.fromCharCode(charCode));
