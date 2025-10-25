import * as v from "valibot";
import { fetcher } from "@/_features/common/fetcher.server";
import type { Content, CreateContentDTO } from "@/types/content";
import type { CreateContentResult } from "./schema";

/**
 * Content型のValibotスキーマ
 */
const ContentSchema = v.object({
  id: v.number(),
  title: v.nullable(v.string()),
  body: v.nullable(v.string()),
  createdAt: v.string(),
  updatedAt: v.string(),
});

/**
 * 新規コンテンツを作成
 * @param data コンテンツ作成データ（空オブジェクトまたは省略可能）
 * @param options Next.js fetch options (revalidate等)
 * @returns 作成されたコンテンツ
 * @throws APIエラーまたはデータ不整合の場合
 */
export async function createContent(
  data: CreateContentDTO = {},
  options?: {
    next?: NextFetchRequestConfig;
  },
): Promise<CreateContentResult> {
  const response = await fetcher("/content", {
    method: "POST",
    body: JSON.stringify(data),
    ...options,
  });

  // APIエラーチェック
  if (!response.ok) {
    throw new Error(
      `Failed to create content: ${response.status} ${response.statusText}`,
    );
  }

  const responseData: unknown = await response.json();

  // レスポンスがContentであることを検証
  try {
    const parsedContent: Content = v.parse(ContentSchema, responseData);
    return parsedContent;
  } catch (error) {
    console.error("Failed to parse created content:", responseData, error);
    throw new Error("Invalid content data received from server");
  }
}
