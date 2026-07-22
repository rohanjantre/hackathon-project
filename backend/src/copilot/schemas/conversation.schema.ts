import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export type ConversationDocument = Conversation & MongooseDocument;

@Schema()
export class Message {
  @Prop({ required: true })
  role: string; // 'user' or 'assistant'

  @Prop({ required: true })
  content: string;
  
  @Prop({ type: Number })
  confidence?: number;

  @Prop([String])
  referencedDocuments?: string[];

  @Prop([String])
  referencedAssets?: string[];

  @Prop([{ type: Object }])
  citations?: any[];

  @Prop([{ type: String }])
  suggestedFollowUps?: string[];
}

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop([Message])
  messages: Message[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
