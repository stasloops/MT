

import withSerwistInit from "@serwist/next";


const withSerwist = withSerwistInit({
    swSrc: "src/shared/lib/serwist/sw.ts",
    swDest: "public/sw.js",
    reloadOnOnline: true,
});

export default withSerwist({

});




