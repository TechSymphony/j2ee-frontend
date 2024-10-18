/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self' http://*;
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' http://localhost:8080;
`
const nextConfig = {
    // re-render token two times because mode
    reactStrictMode: process.env.STRICT != "OFF" ,
    // async headers() {
    //     return [
    //       {
    //         source: '/(.*)',
    //         headers: [
    //           {
    //             key: 'Content-Security-Policy',
    //             value: cspHeader.replace(/\n/g, ''),
    //           },
    //         ],
    //       },
    //     ]
    //   },
};

export default nextConfig;
