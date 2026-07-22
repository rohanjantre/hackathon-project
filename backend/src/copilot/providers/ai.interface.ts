export interface AICopilotProvider {
  generateResponse(query: string, context: any): Promise<AIResponse>;
  streamResponse(query: string, context: any): AsyncGenerator<string, void, unknown>;
}

export interface AIResponse {
  answer: string;
  confidence: number;
  referencedDocuments: string[];
  referencedAssets: string[];
  citations: any[];
  suggestedFollowUps: string[];
}
