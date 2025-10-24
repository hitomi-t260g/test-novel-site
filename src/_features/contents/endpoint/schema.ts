import type { Content, CreateContentDTO } from "@/types/content";

/**
 * Content API のパス定義（openapi.yaml準拠）
 */
export interface paths {
  "/content": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": Content[];
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": CreateContentDTO;
        };
      };
      responses: {
        201: {
          content: {
            "application/json": Content;
          };
        };
      };
    };
  };
  "/content/{id}": {
    get: {
      parameters: {
        path: {
          id: number;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": Content;
          };
        };
        400: {
          description: "不正なリクエスト";
        };
      };
    };
  };
}

/**
 * データ取得関数の戻り値型
 */
export type GetContentsResult = Content[];
export type GetContentResult = Content | null;

/**
 * コンテンツ作成関数の戻り値型
 */
export type CreateContentResult = Content;
