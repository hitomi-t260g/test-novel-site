import * as v from "valibot";
import { fetcher } from "@/_features/common/fetcher.server";
import type { Content } from "@/types/content";
import type { GetContentResult } from "./schema";

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
 * 特定IDのコンテンツを取得
 * @param id コンテンツID
 * @param options Next.js fetch options (revalidate等)
 * @returns コンテンツ（存在しない場合はnull）
 * @throws APIエラー（404以外）の場合
 */
export async function getContent(
  id: number,
  options?: {
    next?: NextFetchRequestConfig;
  },
): Promise<GetContentResult> {
  const response = await fetcher(`/content/${id}`, options);

  // 404の場合はnullを返す
  if (response.status === 404) {
    return null;
  }

  // その他のエラーはthrow
  if (!response.ok) {
    throw new Error(
      `Failed to fetch content: ${response.status} ${response.statusText}`,
    );
  }

  const data: unknown = await response.json();

  // Valibotで型検証
  try {
    const parsedContent: Content = v.parse(ContentSchema, data);
    return parsedContent;
  } catch (error) {
    console.error("Failed to parse content:", data, error);
    throw new Error("Invalid content data");
  }
}
