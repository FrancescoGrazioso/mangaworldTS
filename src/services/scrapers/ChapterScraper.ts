import { CHAPTER_SUFFIX } from './../Constants';
import { Chapter } from '../../model/Chapter';
import { fetchHTMLWebPage, parseHTML } from './BaseScraper';

export async function getChapterDetails(chapter: Chapter) {
  const url = chapter.url + CHAPTER_SUFFIX;
  const html = await fetchHTMLWebPage(url);
  const document = await parseHTML(html);

  const pageUrl: string[] = [];
//   let visual: number = 0;
//   let visualToday: number = 0;
  let keywords: string[]= []

  const pagesDiv = document.getElementById('page');
  if (pagesDiv) {
    const pages = Array.from(pagesDiv?.querySelectorAll('img'));
    pages.forEach((p) => {
      pageUrl.push(p.src);
    });
  }

  // TOBE uncommented, there's a bug in retrieving info for visual, will fix later

//   const visualDiv = document.querySelector('div.has-shadow.top-wrapper.row');
//   if (visualDiv) {
//     Array.from(visualDiv?.children).forEach((div) => {
//       if (div.innerHTML.includes('Visualizzazioni:<')) {
//         const parsedVisual = div.querySelectorAll('span')[0].innerHTML;
//         console.log(div.innerHTML);
//         if (parsedVisual) visual = parseInt(parsedVisual, 10);
//       } else if (div.innerHTML.includes('Visualizzazioni di oggi:')) {
//         const parsedVisual = div.querySelector('span')?.innerHTML;
//         if (parsedVisual) visualToday = parseInt(parsedVisual, 10);
//       }
//     });
//   }

  const readerContainerChilds = document.getElementById('reader')?.children;
  if(readerContainerChilds) {
    Array.from(readerContainerChilds).forEach(
        child => {
            if (child.innerHTML.includes('Keywords:')) {
                const keys = child.querySelector('h2')?.innerHTML.split(' - ');
                if (keys) keywords = [...keys]
            }
        }
    );
  }

  chapter.pageUrl = pageUrl;
  chapter.pageNumber = pageUrl.length;
//   chapter.visual = visual;
//   chapter.visualToday = visualToday;
  chapter.keywords = keywords;

  return chapter;
}
