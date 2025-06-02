import { StripeModule } from "./stripe/stripe.module";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    StripeModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { };