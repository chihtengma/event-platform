import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";

export const POST = async (request: Request) => {
   const body = await request.text();

   const sig = request.headers.get("stripe-signature") as string;
   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

   let event;

   try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
   } catch (error) {
      return NextResponse.json({ message: "Webhook error", error: error });
   }

   // Get the ID and type
   const eventType = event.type;

   // Create
   if (eventType === "checkout.session.completed") {
      const { id, amount_total, metadata } = event.data.object;

      const order = {
         stripeId: id,
         eventId: metadata?.eventId || "",
         buyerId: metadata?.buyerId || "",
         totalAmount: amount_total ? (amount_total / 100).toString() : "0",
         createdAt: new Date()
      };

      const neworder = await createOrder(order);
      return NextResponse.json({ message: "OK", order: neworder });
   }

   return new Response("", { status: 200 });
};
