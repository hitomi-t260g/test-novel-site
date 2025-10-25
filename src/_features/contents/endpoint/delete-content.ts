"use server";

import { revalidatePath } from "next/cache";
import { fetcher } from "@/_features/common/fetcher.server";

/**
 * コンテンツを削除
 * @param id 削除するコンテンツのID
 * @throws APIエラーの場合
 */
export async function deleteContent(id: number): Promise<void> {
  const response = await fetcher(`/content/${id}`, {
    method: "DELETE",
  });

  // APIエラーチェック
  if (!response.ok) {
    throw new Error(
      `Failed to delete content: ${response.status} ${response.statusText}`,
    );
  }

  // キャッシュを無効化してリストを再取得
  revalidatePath("/contents");
}
