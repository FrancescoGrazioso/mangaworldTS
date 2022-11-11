import { Chapter } from './../lib/model/Chapter.d';
import { Manga } from './model/Manga';
import { searchManga } from "./services/Query";
import { getChapterDetails } from './services/scrapers/ChapterScraper';
import { parseManga } from "./services/scrapers/MangaScraper";

export const getMangaFromUrl = async (url: string) => {
    const manga = await parseManga(url);
    return manga;
};

export const searchMangaByKeywords =async (searchTerms:string) => {
    const mangaResult:Manga[] = await searchManga(searchTerms);
    return mangaResult;
}

export const getChapterDetail = async (chapter:Chapter) => {
    chapter = await getChapterDetails(chapter);
    return chapter;
}