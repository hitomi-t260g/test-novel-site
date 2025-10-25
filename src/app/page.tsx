import { redirect } from "next/navigation";
import { SideMenu } from "@/_components/SideMenu";
import { getContents } from "@/_features/contents/endpoint/get-contents";

export default async function Home() {
  // コンテンツ一覧を取得
  const contents = await getContents();

  // updatedAtで降順にソート（最新が上）
  const sortedData = [...contents].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  // コンテンツがある場合、最新のコンテンツにリダイレクト
  if (sortedData.length > 0) {
    const latestContent = sortedData[0];
    redirect(`/contents/${latestContent.id}`);
  }

  // コンテンツがない場合の空状態表示
  return (
    <div className="flex">
      <SideMenu>{null}</SideMenu>

      <main className="flex flex-col flex-1">
        <div className="flex-1 px-10 pt-[30px] pb-0 overflow-y-auto flex items-center justify-center">
          <p className="text-text-light">コンテンツがありません</p>
        </div>
        <footer className="flex justify-between items-center h-[60px] px-10 pt-[22px] pb-[21px] text-caption">
          <p>Copyright © 2025 Sample</p>
          <p>運営会社</p>
        </footer>
      </main>
    </div>
  );
}
