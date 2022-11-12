import { getTrendingMangas, getLastAddedMangas, gtLastMonthPopularMangas } from './../index';

jest.setTimeout(15000);

describe('Homepage tests', () => {
  test('Checks that trending mangas are read', async () => {
    const mangas = await getTrendingMangas();

    expect(mangas.length).toBeGreaterThan(0);
  });

  test('Checks that last updated mangas are read',async () => {
    const mangas = await getLastAddedMangas();

    expect(mangas.length).toBeGreaterThan(0);
  })
  
  test('Checks that last month popular mangas are read',async () => {
    const mangas = await gtLastMonthPopularMangas();

    expect(mangas.length).toBeGreaterThan(0);
  })
});
