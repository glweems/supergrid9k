import { createSchema, Type, typedModel } from "ts-mongoose";

const userSchema = createSchema({
  email: Type.string({ required: true, unique: true }),
  password: Type.string({ required: true }),
});

const userModel = typedModel("User", userSchema);

export default userModel;
