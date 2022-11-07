import { Manga } from './../model/Manga';
import { getMangaFromUrl, searchMangaByKeywords } from '../index';

test('Given a URL checks that a manga is responded', async () => {
  const manga: Manga = await getMangaFromUrl("https://www.mangaworld.so/manga/1637/chainsaw-man")
  expect(manga.title).not.toBe(undefined);
});

test ('Given keyword checks that e result is given',async () => {
  const mangaSearch = await searchMangaByKeywords('chainsaw');
  console.log(mangaSearch)
  expect(mangaSearch.length).toBeGreaterThan(0);
})
