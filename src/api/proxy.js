import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
    const proxy = createProxyMiddleware({
        target: 'https://5sim.biz',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        },
    });

    proxy(req, res, (result) => {
        if (result instanceof Error) {
            console.error(result);
            res.status(500).send('Proxy error');
        }
    });
}

export const config = {
    api: {
        bodyParser: false,
    },
};