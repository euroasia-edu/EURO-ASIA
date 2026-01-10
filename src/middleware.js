import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, cookies, url } = context;

  // rulează DOAR pe homepage
  if (url.pathname !== "/") {
    return next();
  }

  const lang = cookies.get("lang")?.value;

  // dacă userul a ales o limbă înainte
  if (lang === "ro" || lang === "en") {
    return Response.redirect(new URL(`/${lang}`, url), 302);
  }

  // fallback default
  return Response.redirect(new URL("/ro", url), 302);
});
