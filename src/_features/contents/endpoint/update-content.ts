"use server";

import { revalidatePath } from "next/cache";
import * as v from "valibot";
import { fetcher } from "@/_features/common/fetcher.server";
import type { Content, UpdateContentDTO } from "@/types/content";

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
 * コンテンツを更新
 * @param id 更新するコンテンツのID
 * @param data 更新データ（titleまたはbody、または両方）
 * @returns 更新されたコンテンツ
 * @throws APIエラーまたはデータ不整合の場合
 */
export async function updateContent(
  id: number,
  data: UpdateContentDTO,
): Promise<Content> {
  const response = await fetcher(`/content/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  // APIエラーチェック
  if (!response.ok) {
    throw new Error(
      `Failed to update content: ${response.status} ${response.statusText}`,
    );
  }

  const responseData: unknown = await response.json();

  // レスポンスがContentであることを検証
  try {
    const parsedContent: Content = v.parse(ContentSchema, responseData);

    // キャッシュを無効化してコンテンツを再取得
    revalidatePath("/contents");

    return parsedContent;
  } catch (error) {
    console.error("Failed to parse updated content:", responseData, error);
    throw new Error("Invalid content data received from server");
  }
}
