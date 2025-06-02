import { Controller, Post, Body } from "@nestjs/common";
import { StripeService } from "./stripe.service";

@Controller("stripe")
export class StripeController {

    constructor(private readonly stripeService: StripeService) { };

    @Post("create-checkout-session")
    async createCheckoutSession(@Body("products") products: any[]) {

        const session = await this.stripeService.createCheckoutSession(products);

        return { url: session.url };

    };

};