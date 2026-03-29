import modelRegistry from "@/config/models.json";

export const supportedModels = modelRegistry;
export const defaultModelId = supportedModels[0]?.id ?? "";

export const summaryTypeMap = {
  Short: "short",
  Detailed: "medium",
  "Bullet Points": "bullet",
  "Key Insights": "key",
};

export const getModelDisplayName = (modelId) =>
  supportedModels.find((model) => model.id === modelId)?.displayName ?? modelId;
