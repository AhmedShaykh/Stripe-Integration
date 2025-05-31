import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
    apiVersion: "2022-11-15",
});

export const POST = async (request: NextRequest) => {

    const body = await request.json();

    try {

        if (body.length > 0) {

            const session = await stripe.checkout.sessions.create({
                submit_type: "pay",
                mode: "payment",
                payment_method_types: ["card"],
                billing_address_collection: "auto",
                shipping_options: [
                    { shipping_rate: "shr_1NO1jCBYP40wltzrhRn0EU1H" },
                    { shipping_rate: "shr_1NO1kuBYP40wltzrhGKJR1zY" },
                ],
                invoice_creation: {
                    enabled: true,
                },
                line_items: body.map((item: any) => {
                    return {
                        price_data: {
                            currency: "pkr",
                            product_data: {
                                name: item.name,
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: item.quantity,
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                            maximum: 10,
                        },
                    };
                }),
                success_url: `${request.headers.get("origin")}/`,
                cancel_url: `${request.headers.get("origin")}/?canceled=true`,
            });

            return NextResponse.json({ session });

        }
        else {

            return NextResponse.json({ message: "No Data Found" });

        }

    } catch (error) {

        return NextResponse.json(
            { message: (error as { message: string }).message }
        );

    }

};