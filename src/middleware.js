import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async ({ url, request, redirect }, next) => {
  if (url.pathname === "/") {
    const cookie = request.headers.get("cookie") || "";
    const match = cookie.match(/lang=(ro|en)/);
    const lang = match ? match[1] : "ro"; // fallback

    return redirect(`/${lang}`, 308);
  }

  return next();
});
