import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  // This line logs all visitor IPs to your Netlify Edge logs so you can find the attacker
  console.log(`Visitor IP: ${context.ip} accessed ${request.url}`);

  // Add the spammer's IP address to this array
  const blockedIPs = [
    "123.45.67.89", // Replace with the actual attacker IP
  ];

  // If the visitor's IP is in the blocked list, instantly reject the request
  if (blockedIPs.includes(context.ip)) {
    return new Response("Access Denied.", {
      status: 403,
      headers: { "Content-Type": "text/plain" },
    });
  }
};
