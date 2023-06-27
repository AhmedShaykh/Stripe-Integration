import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
    apiVersion: "2022-11-15",
});

export const POST = async (request: NextRequest) => {

    const body = await request.json();

    console.log(body);

    try {

        const session = await stripe.checkout.sessions.create({});

    } catch (error) {

        return NextResponse.json(
            { message: (error as { message: string }).message }
        );

    }

};