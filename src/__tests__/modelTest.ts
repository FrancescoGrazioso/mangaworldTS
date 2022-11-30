import { getMangaFromUrl } from '../index';
import { Manga } from '../model/Manga';
import { getChapterDetail, searchMangaByKeywords, searchMangaURLsByKeywords } from '../index';

const searchTerm = 'one pi';

describe('Manga query utilities', () => {
  test('Given keyword checks that e result is given', async () => {
    const mangaSearch = await searchMangaByKeywords(searchTerm);
    expect(mangaSearch.length).toBeGreaterThan(0);
  });
});

describe('Manga info utilities', () => {
  test('Given a URL checks that a manga is responded', async () => {
    const manga: Manga = await getMangaFromUrl('https://www.mangaworld.so/manga/1848/blue-lock/');
    expect(manga.title).not.toBe(undefined);
  });

  test('After reading a manga object checks that it has chapters', async () => {
    const manga: Manga = await getMangaFromUrl('https://www.mangaworld.so/manga/1848/blue-lock/');
    expect(manga.chapters).not.toBeUndefined();
    if (manga.chapters) expect(manga.chapters.length).toBeGreaterThan(0);
  });
});

describe('Chapter info utilities', () => {
  test('Checks that manga chapter is initialized correctly', async () => {
    const mangaSearch = await searchMangaURLsByKeywords(searchTerm);
    const manga: Manga = await getMangaFromUrl(mangaSearch[0]);
    expect(manga.chapters).not.toBeUndefined();
    if (manga.chapters) {
      let chapter = manga.chapters[0];
      expect(chapter.url).not.toBe(undefined);
    }
  });

  test('Checks chapter detailed are retrieved correctly', async () => {
    const mangaSearch = await searchMangaURLsByKeywords(searchTerm);
    const manga: Manga = await getMangaFromUrl(mangaSearch[0]);

    expect(manga.chapters).not.toBeUndefined();
    if (manga.chapters) {
      let chapter = manga.chapters[0];
      chapter = await getChapterDetail(chapter);

      expect(chapter.pageUrl).not.toBe(undefined);
      if (chapter.pageUrl) expect(chapter.pageUrl[0]).not.toBe(undefined);

      expect(chapter.keywords?.length).toBeGreaterThan(0);
      expect(chapter.visual).toBeGreaterThan(0);
      expect(chapter.visualToday).toBeGreaterThan(0);
      expect(chapter.volume).toBeGreaterThan(0);
    }
  });
});
