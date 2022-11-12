import { Manga } from './../model/Manga';
import { BASE_URL } from './Constants';
import { fetchHTMLWebPage, parseHTML } from './scrapers/BaseScraper';
import { parseManga } from './scrapers/MangaScraper';

export async function searchManga(searchTerm: string) {
    const url = BASE_URL + 'archive?keyword=' + searchTerm;
    const res: Manga[] = [];

    const html = await fetchHTMLWebPage(url);
    const document = await parseHTML(html);

    const searchEntry = Array.from(document.querySelectorAll('div.entry'));
    for (const entry of searchEntry) {
        const mangaURL = entry.querySelector('a')?.href
            if (mangaURL) {
                const manga = await parseManga(mangaURL);
                res.push(manga);
            }
    }

    return res;
}

export async function searchMangaURLs(searchTerm: string) {
    const url = BASE_URL + 'archive?keyword=' + searchTerm;
    const res: string[] = [];

    const html = await fetchHTMLWebPage(url);
    const document = await parseHTML(html);

    const searchEntry = Array.from(document.querySelectorAll('div.entry'));
    for (const entry of searchEntry) {
        const mangaURL = entry.querySelector('a')?.href
            if (mangaURL) {
                res.push(mangaURL)
            }
    }

    return res;
}