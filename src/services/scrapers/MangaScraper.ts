import { Chapter } from '../../model/Chapter';
import { Genre } from '../../model/Genre';
import { Manga } from '../../model/Manga';
import { Type } from '../../model/Type';
import { State } from '../../model/State';
import { fetchHTMLWebPage, parseHTML } from './BaseScraper';

export async function parseManga(url: string) {
  const html = await fetchHTMLWebPage(url);
  const manga: Manga = await newManga(url, html);

  return manga;
}

async function newManga(url: string, html: string) {
  const document = await parseHTML(html);
  const divCollection = Array.from(document.getElementsByClassName('info'));
  const infoCollection = Array.from(divCollection[0].children);
  const mangaTitle = infoCollection[0].innerHTML;

  let mangaTitleAlternative = '';
  const genres: Genre[] = [];
  const authors: string[] = [];
  const artists: string[] = [];
  const type: Type = {type: undefined};
  const state: State = {state: undefined};
  let visual: number = 0;
  let yearStart: string = '';
  let volumeNumber: number = 0;
  let chaptersNumber: number = 0;
  let keywords: string[] = [];
  const chapters: Chapter[] = [];
  
  const divs = infoCollection[1].querySelectorAll('div');
  divs.forEach((div) => {
    if (div.innerHTML.includes('Titoli alternativi:')) {
      mangaTitleAlternative = div.innerHTML.slice(divs[0].innerHTML.indexOf('</span>') + 7);
    } else if (div.innerHTML.includes('Generi:')) {
      Array.from(div.querySelectorAll('a.p-1')).forEach((gen) => {
        genres.push({ genre: gen.innerHTML });
      });
    } else if (div.innerHTML.includes('Autore:')) {
      Array.from(div.querySelectorAll('a')).forEach((aut) => {
        authors.push(aut.innerHTML);
      });
    } else if (div.innerHTML.includes('>Artista:')) {
      Array.from(div.querySelectorAll('a')).forEach((art) => {
        artists.push(art.innerHTML);
      });
    } else if (div.innerHTML.includes('>Tipo:')) {
      type.type = div.querySelector('a')?.innerHTML;
    } else if (div.innerHTML.includes('>Stato:')) {
      state.state = div.querySelector('a')?.innerHTML;
    } else if (div.innerHTML.includes('>Visualizzazioni:')) {
      const parsedVisual = div.querySelectorAll('span')[1].innerHTML;
      if (parsedVisual) visual = parseInt(parsedVisual, 10);
    } else if (div.innerHTML.includes('>Anno di uscita:')) {
      yearStart = div.querySelector('a')?.innerHTML || '';
    } else if (div.innerHTML.includes('>Volumi totali:')) {
      const parsedVolume = div.querySelectorAll('span')[1].innerHTML;
      if (parsedVolume) volumeNumber = parseInt(parsedVolume, 10);
    } else if (div.innerHTML.includes('>Capitoli totali:')) {
      const parsedChapterNumber = div.querySelectorAll('span')[1].innerHTML;
      if (parsedChapterNumber) chaptersNumber = parseFloat(parsedChapterNumber);
    }
  });


  const plot = document.getElementsByClassName('comic-description')[0]?.querySelector('div.mb-3')?.innerHTML || '';
  const coverUrl = document.querySelector('div.thumb')?.querySelector('img')?.getAttribute('src') || '';
  const keywordDiv = document.querySelector('div.single-comic')?.querySelectorAll('div.top-wrapper');
  if (keywordDiv) {
    Array.from(keywordDiv).forEach(
      (obj) => {
        if (obj.innerHTML.includes('Keywords')) {
          const tempKeyords = obj.innerHTML.slice(obj.innerHTML.indexOf('<br>')+4).split(' - ')
          keywords = [...tempKeyords];
        }
      }
    )
  }

  const chaptersDiv = document.querySelectorAll('div.chapter');
  Array.from(chaptersDiv).reverse().forEach(
    (div) => {
      let chapterNumber = '';
      const extractedNumbers = div.querySelector('a')?.querySelector('span')?.innerHTML.match(/\d+/g);
      if (extractedNumbers) {
        if (extractedNumbers.length>1) {
          chapterNumber = extractedNumbers[0] + '.' + extractedNumbers[1]
        } else {
          chapterNumber = extractedNumbers[0]
        }
      }
      const chapter: Chapter = {
        url: div.querySelector('a')?.href || '',
        chapterNumber: parseFloat(chapterNumber),
        dateAdd: div.querySelector('i')?.innerHTML || '',
        response: div.innerHTML,
        title: div.querySelector('a')?.querySelector('span')?.innerHTML || 'Capitolo'
      }

      chapters.push(chapter)
    }
  )
  

  const manga: Manga = {
    url,
    title: mangaTitle,
    titleAlternative: mangaTitleAlternative,
    genres,
    authors,
    artists,
    type,
    state,
    visual,
    yearStart,
    volumeNumber,
    chaptersNumber,
    plot,
    coverUrl,
    response: html,
    keywords,
    chapters
  };

  return manga;
}
