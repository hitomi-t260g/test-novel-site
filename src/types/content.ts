/**
 * Contentスキーマ（openapi.yamlに基づく）
 */
export interface Content {
  id: number;
  title: string | null;
  body: string | null;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}

/**
 * コンテンツ作成DTOスキーマ（openapi.yamlに基づく）
 */
export interface CreateContentDTO {
  title?: string | null;
  body?: string | null;
}

/**
 * コンテンツ更新DTOスキーマ（openapi.yamlに基づく）
 */
export interface UpdateContentDTO {
  title?: string | null;
  body?: string | null;
}
