import { expect, test } from "@playwright/test";

test.describe("新規小説作成フロー", () => {
  test("ユーザーが新規小説を作成できる", async ({ page }) => {
    // Arrange: サイトにアクセス
    await page.goto("http://localhost:3000");

    // Act: サイドメニューの一番下のeditボタンをクリック
    // 注: 画面には複数のeditボタンがあるため、サイドメニュー内のものを特定
    const sidebar = page.locator('aside, nav, [role="navigation"]').first();
    const sidebarButtons = sidebar.getByRole("button", { name: /edit/i });
    const editButton = sidebarButtons.last(); // 一番下のeditボタン
    await editButton.click();

    // Assert: editボタンが消えてNew pageボタンが表示される
    await expect(editButton).not.toBeVisible();
    const newPageButton = sidebar.getByRole("button", { name: /new page/i });
    await expect(newPageButton).toBeVisible();

    // Act: New pageボタンをクリック
    await newPageButton.click();

    // Assert: メインエリアにフォームが表示され、placeholderが正しいこと
    const titleInput = page.getByPlaceholder("新規タイトル");
    const contentTextarea = page.getByPlaceholder("本文を入力してください");
    await expect(titleInput).toBeVisible();
    await expect(contentTextarea).toBeVisible();

    // Assert: サイドメニューのリストの一番上に「新規タイトル」が表示される
    const sidebarListItems = sidebar.locator('li, [role="listitem"]');
    const firstListItem = sidebarListItems.first();
    await expect(firstListItem).toContainText("新規タイトル");

    // Assert: タイトルフォームをクリックしても入力ができない
    await titleInput.click();
    await expect(titleInput).toBeDisabled();

    // Act: タイトルフォームの右にあるeditボタンをクリック
    // タイトル入力欄の近くのeditボタンを特定
    const titleSection = titleInput.locator("..");
    const titleEditButton = titleSection.getByRole("button", { name: /edit/i });
    await titleEditButton.click();

    // Assert: editボタンの代わりにcancelとsaveボタンが表示される
    await expect(titleEditButton).not.toBeVisible();
    const titleCancelButton = titleSection.getByRole("button", {
      name: /cancel/i,
    });
    const titleSaveButton = titleSection.getByRole("button", { name: /save/i });
    await expect(titleCancelButton).toBeVisible();
    await expect(titleSaveButton).toBeVisible();

    // Assert: フォーム入力が可能となる
    await expect(titleInput).toBeEnabled();

    // Act: タイトルに「坊ちゃん」と入力
    await titleInput.clear();
    await titleInput.fill("坊ちゃん");

    // Act: saveボタンをクリック
    await titleSaveButton.click();

    // Assert: タイトルフォーム入力値が「坊ちゃん」のまま変更できなくなる
    await expect(titleInput).toHaveValue("坊ちゃん");
    await expect(titleInput).toBeDisabled();

    // Assert: 本文フォームをクリックしても入力ができない
    await contentTextarea.click();
    await expect(contentTextarea).toBeDisabled();

    // Act: 本文フォームの右にあるeditボタンをクリック
    const contentSection = contentTextarea.locator("..");
    const contentEditButton = contentSection.getByRole("button", {
      name: /edit/i,
    });
    await contentEditButton.click();

    // Assert: editボタンの代わりにcancelとsaveボタンが表示される
    await expect(contentEditButton).not.toBeVisible();
    const contentCancelButton = contentSection.getByRole("button", {
      name: /cancel/i,
    });
    const contentSaveButton = contentSection.getByRole("button", {
      name: /save/i,
    });
    await expect(contentCancelButton).toBeVisible();
    await expect(contentSaveButton).toBeVisible();

    // Assert: フォーム入力が可能となる
    await expect(contentTextarea).toBeEnabled();

    // Act: 本文に長文を入力
    const novelContent =
      "親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。";
    await contentTextarea.clear();
    await contentTextarea.fill(novelContent);

    // Act: saveボタンをクリック
    await contentSaveButton.click();

    // Assert: 本文フォーム入力値が変更できなくなる
    await expect(contentTextarea).toHaveValue(novelContent);
    await expect(contentTextarea).toBeDisabled();

    // Assert: サイドメニューのリストの一番上に「坊ちゃん」が表示される
    await expect(firstListItem).toContainText("坊ちゃん");

    // Assert: 「新規タイトル」がなくなっている
    await expect(firstListItem).not.toContainText("新規タイトル");
  });
});
