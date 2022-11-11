import { Manga } from './../model/Manga';
import { getMangaFromUrl, searchMangaByKeywords } from '../index';

const searchTerm = 'one piec'

test ('Given keyword checks that e result is given',async () => {
  const mangaSearch = await searchMangaByKeywords(searchTerm);
  expect(mangaSearch.length).toBeGreaterThan(0);
})

test('Given a URL checks that a manga is responded', async () => {
  const mangaSearch = await searchMangaByKeywords(searchTerm);
  const manga: Manga = mangaSearch[0];
  expect(manga.title).not.toBe(undefined);
});

test ('After reading a manga object checks that it ha chapters',async () => {
  const mangaSearch = await searchMangaByKeywords(searchTerm);
  const manga: Manga = mangaSearch[0];
  expect(manga.chapters.length).toBeGreaterThan(0);
})

test ('Checks that manga chapter is initialized correctly',async () => {
  const mangaSearch = await searchMangaByKeywords(searchTerm);
  const manga: Manga = mangaSearch[0];
  const chapter = manga.chapters[0];
  expect(chapter.url).not.toBe(undefined);
})
