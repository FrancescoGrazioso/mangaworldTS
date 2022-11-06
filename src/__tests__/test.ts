import { MangaWorld } from '../index';

test('Manga creator', async () => {
  const mangaTitle = await MangaWorld("https://www.mangaworld.so/manga/909/bleach")
  expect(mangaTitle).toBe('Your manga is Bleach');
});
