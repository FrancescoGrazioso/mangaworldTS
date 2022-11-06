import { MangaWorld } from '../index';

test('Manga creator', async () => {
  const mangaTitle = await MangaWorld("https://www.mangaworld.so/manga/2741/kiseijuu")
  expect(mangaTitle).toBe('Your manga is Kiseijuu');
});
