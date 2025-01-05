import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Recipe } from "src/types";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop()
  username: string

  @Prop()
  password: string

  @Prop()
  recipes: Recipe[]
}

export const UserSchema = SchemaFactory.createForClass(User)
