import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './models/user.model';
import { PostModel, PostSchema } from './models/post.model';

@Module({
	providers: [UsersService],
	imports: [
		MongooseModule.forFeature([
			{ name: UserModel.name, schema: UserSchema },
			{ name: PostModel.name, schema: PostSchema },
		]),
	],
})
export class UsersModule {}
