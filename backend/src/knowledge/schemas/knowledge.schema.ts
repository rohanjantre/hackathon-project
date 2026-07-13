import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type KnowledgeDocument = HydratedDocument<Knowledge>;

@Schema({
    timestamps: true,
})
export class Knowledge {

    @Prop({
        required: true,
        trim: true,
    })
    title: string;

    @Prop({
        required: true,
        trim: true,
    })
    category: string;

    @Prop({
        required: true,
        trim: true,
    })
    department: string;

    @Prop({
        required: true,
    })
    content: string;

    @Prop({
        type: [String],
        default: [],
    })
    tags: string[];

    @Prop({
        type: [String],
        default: [],
    })
    attachments: string[];

    @Prop({
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE",
    })
    status: string;

    @Prop({
        type: Types.ObjectId,
        ref: "User",
        required: true,
    })
    createdBy: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: "User",
    })
    updatedBy: Types.ObjectId;
}

export const KnowledgeSchema =
    SchemaFactory.createForClass(Knowledge);