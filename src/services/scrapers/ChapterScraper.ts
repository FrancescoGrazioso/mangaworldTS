import { CHAPTER_SUFFIX } from './../Constants';
import { Chapter } from '../../model/Chapter';
import { fetchHTMLWebPage, parseHTML } from './BaseScraper';

export async function getChapterDetails(chapter:Chapter) {
    const url = chapter.url + CHAPTER_SUFFIX;
    const html = await fetchHTMLWebPage(url);
    const document = await parseHTML(html);

    const pageUrl: string[] = [];

    const pagesDiv = document.getElementById('page');
    if (pagesDiv) {
        const pages = Array.from(pagesDiv?.querySelectorAll('img'));
        pages.forEach(
            p => {
                pageUrl.push(p.src);
            }
        )
    }

    chapter.pageUrl = pageUrl;
    chapter.pageNumber = pageUrl.length;

    return chapter;
}