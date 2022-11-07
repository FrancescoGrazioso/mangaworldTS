import { Manga } from './model/Manga';
import { searchManga } from "./services/Query";
import { parseManga } from "./services/Scraper";

export const getMangaFromUrl = async (url: string) => {
    const manga = await parseManga(url);
    return manga;
};

export const searchMangaByKeywords =async (searchTerms:string) => {
    const mangaResult:Manga[] = await searchManga(searchTerms);
    return mangaResult;
}
