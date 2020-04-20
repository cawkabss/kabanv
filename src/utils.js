const SITE_URLS_MAP = {
    UA: 'https://kabanchik.ua',
    BY: 'https://kabanchik.by',
    KZ: 'https://megamaster.kz',
};

const versionRegStr = '\\d{1,2}\\.\\d{1,2}\\.\\d{1,2}';

export const getSiteUrl = (country) => {
    return SITE_URLS_MAP[country];
};

export const getVersionString = (html) => {
    const reg = new RegExp(`<\!-- version: v${versionRegStr} -->`);
    return html.match(reg)?.[0] || '';
};

export const extractVersionFromStr = (str) => {
    const reg = new RegExp(versionRegStr);
    return str.match(reg)?.[0] || '';
};
