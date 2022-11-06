import { parseManga } from "./services/Scraper";

export const MangaWorld = async (url: string) => {
    const manga = await parseManga(url);
    return 'Your manga is '+manga.title;
};
