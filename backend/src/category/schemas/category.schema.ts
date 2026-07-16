import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    timestamps: true,
})
export class Category {
    @Prop({
        required: true,
        unique: true,
        trim: true,
    })
    name: string;

    @Prop({
        required: true,
        trim: true,
    })
    department: string;

    @Prop({
        default: "",
    })
    description: string;

    @Prop({
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE",
    })
    status: string;
}

export const CategorySchema =
    SchemaFactory.createForClass(Category);