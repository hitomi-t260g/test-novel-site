/**
 * API用のServer Fetcher
 * Next.js標準のfetch APIをラップし、型安全なAPI呼び出しを提供
 */

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

export interface FetcherOptions extends RequestInit {
  next?: NextFetchRequestConfig;
}

/**
 * APIへのHTTPリクエストを実行
 * @param path APIエンドポイントのパス（例: "/content", "/content/1"）
 * @param options fetch オプション
 * @returns Response オブジェクト
 */
export async function fetcher(
  path: string,
  options?: FetcherOptions,
): Promise<Response> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  return response;
}
