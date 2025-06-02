import { StripeController } from "./stripe.controller";
import { StripeService } from "./stripe.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    controllers: [StripeController],
    providers: [StripeService]
})
export class StripeModule { };