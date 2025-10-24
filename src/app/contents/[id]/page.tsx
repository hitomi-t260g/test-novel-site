import { SideMenu } from "@/_components/SideMenu";
import { ContentEditorContainer } from "@/_features/contents/ContentEditor/ContentEditorContainer";
import { ContentList } from "@/_features/contents/ContentList";
import { getContent } from "@/_features/contents/endpoint/get-content";
import { getContents } from "@/_features/contents/endpoint/get-contents";

interface ContentPageProps {
  params: Promise<{ id: string }>;
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { id } = await params;
  const contentId = Number(id);

  // コンテンツ一覧を取得
  const contents = await getContents();

  // updatedAtで降順にソート
  const sortedData = [...contents].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  const currentContent = await getContent(contentId);

  if (!currentContent) {
    return (
      <div className="flex">
        <SideMenu>
          <ContentList contents={sortedData} selectedId={null} />
        </SideMenu>

        <main className="flex flex-col flex-1">
          <div className="flex-1 px-10 pt-[30px] pb-0 overflow-y-auto flex items-center justify-center">
            <p className="text-text-light">コンテンツが見つかりません</p>
          </div>
          <footer className="flex justify-between items-center h-[60px] px-10 pt-[22px] pb-[21px] text-caption">
            <p>Copyright © 2025 Sample</p>
            <p>運営会社</p>
          </footer>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideMenu>
        <ContentList contents={sortedData} selectedId={contentId} />
      </SideMenu>

      <main className="flex flex-col flex-1">
        <div className="flex-1 px-10 pt-[30px] pb-0 ">
          <ContentEditorContainer content={currentContent} />
        </div>

        <footer className="flex justify-between items-center h-[60px] px-10 pt-[22px] pb-[21px] text-caption">
          <p>Copyright © 2025 Sample</p>
          <p>運営会社</p>
        </footer>
      </main>
    </div>
  );
}
