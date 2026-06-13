import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  // Use Netlify's built-in tool to instantly check for the tracking cookie
  const hasOrdered = context.cookies.get("has_ordered");
  
  if (hasOrdered === "true") {
    return new Response("Limit one order per customer.", {
      status: 403,
      headers: { "Content-Type": "text/html" },
    });
  }

  return context.next();
};