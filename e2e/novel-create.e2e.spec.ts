import { expect, test } from "@playwright/test";

test.describe("新規小説作成フロー", () => {
  test("ユーザーが新規小説を作成できる", async ({ page }) => {
    // Arrange: サイトにアクセス
    await page.goto("http://localhost:3001");

    // Act: サイドメニューの一番下のEditボタンをクリック
    const sidebar = page.locator("aside").first();
    const editButton = sidebar.getByRole("button", { name: /edit/i });
    await editButton.click();

    // Assert: Editボタンが消えてNewPageボタンとDoneボタンが表示される
    await expect(editButton).not.toBeVisible();
    const newPageButton = sidebar.getByRole("button", { name: /newpage/i });
    const doneButton = sidebar.getByRole("button", { name: /done/i });
    await expect(newPageButton).toBeVisible();
    await expect(doneButton).toBeVisible();

    // Act: NewPageボタンをクリック
    await newPageButton.click();

    // Assert: 新規コンテンツが作成され、ページ遷移することを確認
    await page.waitForURL(/\/contents\/\d+/);

    // Assert: サイドメニューに新規コンテンツが表示される
    await expect(sidebar.getByText("(新規タイトル)").first()).toBeVisible();

    // Assert: メインエリアにタイトルと本文が表示される
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "(新規タイトル)",
    );
    await expect(page.getByText("(本文なし)")).toBeVisible();

    // Act: タイトルのEditボタンをクリック
    // メインエリアには2つのEditボタンがある（タイトル用と本文用）
    const mainArea = page.locator("main");
    const titleEditButton = mainArea
      .getByRole("button", { name: /edit/i })
      .first();
    await titleEditButton.click();

    // Assert
    const titleCancelButton = mainArea
      .getByRole("button", { name: /cancel/i })
      .first();
    const titleSaveButton = mainArea
      .getByRole("button", { name: /save/i })
      .first();
    await expect(titleCancelButton).toBeVisible();
    await expect(titleSaveButton).toBeVisible();

    // Assert: タイトル入力フォームが表示される
    const titleInput = page.locator('input[type="text"]');
    await expect(titleInput).toBeVisible();

    // Assert: 本文のEditボタンが無効化される（同時編集防止）
    const bodyEditButton = mainArea
      .getByRole("button", { name: /edit/i })
      .last();
    await expect(bodyEditButton).toBeDisabled();

    // Act: タイトルに「坊ちゃん」と入力
    await titleInput.clear();
    await titleInput.fill("坊ちゃん");

    // Act: Saveボタンをクリック
    await titleSaveButton.click();

    // Assert: サイドメニューのリストの一番上に「坊ちゃん」が表示される（再検証完了の目印）
    await expect(sidebar.getByRole("button", { name: "坊ちゃん" }).first()).toBeVisible();

    // Assert: タイトルが「坊ちゃん」に更新され、表示モードに戻る
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "坊ちゃん",
    );
    await expect(titleInput).not.toBeVisible();

    // Act: 本文のEditボタンをクリック
    const bodyEditButtonAfterTitleSave = mainArea
      .getByRole("button", { name: /edit/i })
      .last();
    await bodyEditButtonAfterTitleSave.click();

    // Assert: Editボタンの代わりにCancelとSaveボタンが表示される
    const bodyCancelButton = mainArea.getByRole("button", { name: /cancel/i });
    const bodySaveButton = mainArea.getByRole("button", { name: /save/i });
    await expect(bodyCancelButton).toBeVisible();
    await expect(bodySaveButton).toBeVisible();

    // Assert: 本文入力フォームが表示される
    const bodyTextarea = page.locator("textarea");
    await expect(bodyTextarea).toBeVisible();

    // Assert: タイトルのEditボタンが無効化される（同時編集防止）
    const titleEditButtonAfterBodyEdit = mainArea
      .getByRole("button", { name: /edit/i })
      .first();
    await expect(titleEditButtonAfterBodyEdit).toBeDisabled();

    // Act: 本文に長文を入力
    const novelContent =
      "親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。";
    await bodyTextarea.clear();
    await bodyTextarea.fill(novelContent);

    // Act: Saveボタンをクリック
    await bodySaveButton.click();

    // Assert: 本文が更新され、表示モードに戻る
    await expect(page.getByText(novelContent.substring(0, 50))).toBeVisible();
    await expect(bodyTextarea).not.toBeVisible();

    // Assert
    await expect(sidebar.getByRole("button", { name: /edit/i })).toBeVisible();
  });
});
