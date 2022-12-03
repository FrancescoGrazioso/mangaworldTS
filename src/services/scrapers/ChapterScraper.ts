import { Chapter } from '../../model/Chapter';
import { fetchHTMLWebPage, parseHTML } from './BaseScraper';

const CHAPTER_SUFFIX = '?style=list';

export async function getChapterDetails(chapter: Chapter) {
  const url = chapter.url + CHAPTER_SUFFIX;
  const html = await fetchHTMLWebPage(url);
  const document = await parseHTML(html);

  const pageUrl: string[] = [];
  let visual: number = 0;
  let visualToday: number = 0;
  let keywords: string[] = [];
  let volume: number = 0;

  const pagesDiv = document.getElementById('page');
  if (pagesDiv) {
    const pages = Array.from(pagesDiv?.querySelectorAll('img'));
    pages.forEach((p:any) => {
      pageUrl.push(p.src);
    });
  }

  const visualDiv = document.querySelector('div.has-shadow.top-wrapper.row');
  if (visualDiv) {
    Array.from(visualDiv?.children).forEach((div:any) => {
      if (div.innerHTML.includes('Visualizzazioni:<')) {
        const parsedVisual = div.innerHTML.slice(div.innerHTML.indexOf('</span>') + 7).replace(/\D/g, '');
        if (parsedVisual) visual = parseInt(parsedVisual, 10);
      } else if (div.innerHTML.includes('Visualizzazioni di oggi:')) {
        const parsedVisual = div.innerHTML.slice(div.innerHTML.indexOf('</span>') + 7).replace(/\D/g, '');
        if (parsedVisual) visualToday = parseInt(parsedVisual, 10);
      }
    });
  }

  const volumeElement: HTMLSelectElement | null = document.querySelector('select.volume');
  if (volumeElement) volume = parseInt(volumeElement?.selectedOptions[0].innerHTML.replace(/\D/g, ''), 10);

  const readerContainerChilds = document.getElementById('reader')?.children;
  if (readerContainerChilds) {
    Array.from(readerContainerChilds).forEach((child:any) => {
      if (child.innerHTML.includes('Keywords:')) {
        const keys = child.querySelector('h2')?.innerHTML.split(' - ');
        if (keys) keywords = [...keys];
      }
    });
  }

  chapter.pageUrl = pageUrl;
  chapter.pageNumber = pageUrl.length;
  chapter.visual = visual;
  chapter.visualToday = visualToday;
  chapter.keywords = keywords;
  chapter.volume = volume;

  return chapter;
}
