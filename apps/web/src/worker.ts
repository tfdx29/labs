interface Env {
  SERVER: Fetcher;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Proxy API and RPC calls to the server worker
    if (url.pathname.startsWith("/api") || url.pathname.startsWith("/rpc")) {
      return env.SERVER.fetch(request);
    }

    // Everything else is served from the Vite static assets
    return env.ASSETS.fetch(request);
  },
};
