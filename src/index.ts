import { Chapter } from './model/Chapter';
import { Manga } from './model/Manga';
import { searchManga, searchMangaURLs } from './services/scrapers/QueryScraper';
import { getChapterDetails } from './services/scrapers/ChapterScraper';
import { getLastAdded, getTrendingManga, gtLastMonthPopular } from './services/scrapers/HomePageScraper';
import { parseManga, parseMangaBasicInfo } from './services/scrapers/MangaScraper';

export const getMangaFromUrl = async (url: string) => {
  const manga = await parseManga(url);
  return manga;
};

export const getMangaBasicInfoFromUrl = async (url: string) => {
  const manga = await parseMangaBasicInfo(url);
  return manga;
};

export const searchMangaByKeywords = async (searchTerms: string) => {
  const mangaResult: Manga[] = await searchManga(searchTerms);
  return mangaResult;
};

export const searchMangaURLsByKeywords = async (searchTerms: string) => {
  const mangaResult: string[] = await searchMangaURLs(searchTerms);
  return mangaResult;
};

export const getChapterDetail = async (chapter: Chapter) => {
  const newChapter = await getChapterDetails(chapter);
  return newChapter;
};

export const getTrendingMangas = async () => {
  const mangas: string[] = await getTrendingManga();
  return mangas;
};

export const getLastAddedMangas = async (pageIndex?: number) => {
    const mangas: string[] = await getLastAdded(pageIndex);
    return mangas;
};

export const gtLastMonthPopularMangas = async () => {
  const mangas: string[] = await gtLastMonthPopular();
  return mangas;
};
