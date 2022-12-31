const NAMES = {
    ROBOTS: 'robots',
    BOT: 'googlebot',
    GOOGLE: 'google'
};

export const GoogleSchema = {
    DisableTransaltion: ({ name: NAMES.GOOGLE, content: 'notranslate' }),
    DisableReadLoud: ({ name: NAMES.GOOGLE, content: 'nopagereadaloud' })
};
