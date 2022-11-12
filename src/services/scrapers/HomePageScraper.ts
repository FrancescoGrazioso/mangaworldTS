import { BASE_URL } from './../Constants';
import { fetchHTMLWebPage, parseHTML } from './BaseScraper';

async function getHomepageDOM(pageIndex?: number) {
  let url = BASE_URL;
  if (pageIndex) {
    url = url + '?page=' + pageIndex;
  }
  const html = await fetchHTMLWebPage(url);
  const document = await parseHTML(html);
  return document;
}

export async function getTrendingManga() {
  const trendingManga: string[] = [];
  const document = await getHomepageDOM();

  const mangaDiv = document.getElementById('chapters-slide');
  const entries = mangaDiv?.querySelectorAll('div.entry');
  if (entries) {
    for (const e of Array.from(entries)) {
      const mangaURL = e.children[0].getAttribute('href');
      if (mangaURL) {
        trendingManga.push(mangaURL);
      }
    }
  }
  return trendingManga;
}

export async function getLastAdded(pageIndex?: number) {
  const lastAddedManga: string[] = [];
  const document = await getHomepageDOM(pageIndex);

  const mangaDiv = document.querySelector('div.comics-grid');
  const entries = mangaDiv?.querySelectorAll('div.entry');
  if (entries) {
    for (const e of Array.from(entries)) {
      const mangaURL = e.children[0].getAttribute('href');
      if (mangaURL) {
        lastAddedManga.push(mangaURL);
      }
    }
  }
  return lastAddedManga;
}

export async function gtLastMonthPopular() {
  const lastMonthPopular: string[] = [];
  const document = await getHomepageDOM();

  const mangaDiv = document.querySelector('div.short')?.parentElement?.parentElement;
  const entries = mangaDiv?.querySelectorAll('div.entry');
  if (entries) {
    for (const e of Array.from(entries)) {
      const url = e.querySelectorAll('a')[0].getAttribute('href');
      if (url) {
        lastMonthPopular.push(url);
      }
    }
  }
  return lastMonthPopular;
}
