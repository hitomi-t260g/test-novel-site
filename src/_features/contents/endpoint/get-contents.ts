import * as v from "valibot";
import { fetcher } from "@/_features/common/fetcher.server";
import type { Content } from "@/types/content";
import type { GetContentsResult } from "./schema";

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
 * コンテンツ一覧を取得
 * @param options Next.js fetch options (revalidate等)
 * @returns コンテンツ一覧
 * @throws APIエラーまたはデータ不整合の場合
 */
export async function getContents(options?: {
  next?: NextFetchRequestConfig;
}): Promise<GetContentsResult> {
  const response = await fetcher("/content", options);

  // APIエラーチェック
  if (!response.ok) {
    throw new Error(
      `Failed to fetch contents: ${response.status} ${response.statusText}`,
    );
  }

  const data: unknown = await response.json();

  // レスポンスがContent配列であることを検証
  if (!Array.isArray(data)) {
    throw new Error("Invalid response: expected array");
  }

  // 各要素をValibotで検証
  const parsedContents: Content[] = data.map((item, index) => {
    try {
      return v.parse(ContentSchema, item);
    } catch (error) {
      console.error(`Failed to parse content at index ${index}:`, item, error);
      throw new Error(`Invalid content data at index ${index}`);
    }
  });

  return parsedContents;
}
