

import withSerwistInit from "@serwist/next";


const withSerwist = withSerwistInit({
    swSrc: "public/sw.ts",
    swDest: "public/sw.js",
    reloadOnOnline: true,
    register: true,

});

export default withSerwist({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 't.me',
            },
        ],
    },

});




