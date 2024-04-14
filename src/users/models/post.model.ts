import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { UserModel } from './user.model';

export type PostDocument = HydratedDocument<PostModel>;

@Schema()
export class PostModel {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	text: string;

	@Prop({ type: MSchema.Types.ObjectId, ref: UserModel.name })
	author: UserModel;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
