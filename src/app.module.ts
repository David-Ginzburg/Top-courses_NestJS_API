import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './users/models/user.model';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot('mongodb://localhost/test'),
		MongooseModule.forFeature(),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
		UserModel,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
