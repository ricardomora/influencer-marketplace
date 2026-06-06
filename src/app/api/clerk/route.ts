import { type UserJSON, type WebhookEvent } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { api } from "../../../../convex/_generated/api";

type ClerkRole = "brand" | "influencer" | "admin";

function parseRole(metadata: unknown): ClerkRole | undefined {
  if (!metadata || typeof metadata !== "object") return undefined;
  const role = (metadata as { role?: string }).role;
  if (role === "brand" || role === "influencer" || role === "admin") {
    return role;
  }
  return undefined;
}

function roleFromUserData(data: UserJSON): ClerkRole | undefined {
  return (
    parseRole(data.public_metadata) ?? parseRole(data.unsafe_metadata)
  );
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!WEBHOOK_SECRET) {
    console.error("[clerk webhook] CLERK_WEBHOOK_SECRET is not set");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  if (!convexUrl) {
    console.error("[clerk webhook] NEXT_PUBLIC_CONVEX_URL is not set");
    return new Response("Convex URL not configured", { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("[clerk webhook] verification failed", err);
    return new Response("Webhook verification failed", { status: 400 });
  }

  const convex = new ConvexHttpClient(convexUrl);

  try {
    if (evt.type === "user.created" || evt.type === "user.updated") {
      const { email_addresses, first_name, last_name, image_url, id } =
        evt.data;
      const email = email_addresses?.[0]?.email_address;
      if (!email || !id) {
        console.error("[clerk webhook] missing email or clerk id", evt.type);
        return new Response("Missing email or user id", { status: 400 });
      }

      const name = [first_name, last_name].filter(Boolean).join(" ");
      const role = roleFromUserData(evt.data as UserJSON);

      await convex.mutation(api.users.syncUser, {
        clerkId: id,
        email,
        name: name || undefined,
        avatarUrl: image_url || undefined,
        role,
      });

      console.info("[clerk webhook] synced user", { clerkId: id, type: evt.type });
    }
  } catch (err) {
    console.error("[clerk webhook] sync failed", evt.type, err);
    return new Response("Sync failed", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}
