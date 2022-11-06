import { Genre } from './../model/Genre';
import { Manga } from './../model/Manga';
import { JSDOM } from 'jsdom';
import { Type } from '../model/Type';
import { State } from '../model/State';
const fetch = require('node-fetch');

export async function fetchHTMLWebPage(url: string) {
  const res = await fetch(url);
  const html: string = await res.text();
  return html;
}

export async function parseHTML(html: string) {
  const dom = new JSDOM(html);
  return dom.window.document;
}

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
      if (parsedVisual) visual = parseInt(parsedVisual);
    } else if (div.innerHTML.includes('>Anno di uscita:')) {
      yearStart = div.querySelector('a')?.innerHTML || '';
    } else if (div.innerHTML.includes('>Volumi totali:')) {
      const parsedVolume = div.querySelectorAll('span')[1].innerHTML;
      if (parsedVolume) volumeNumber = parseInt(parsedVolume);
    } else if (div.innerHTML.includes('>Capitoli totali:')) {
      const parsedChapterNumber = div.querySelectorAll('span')[1].innerHTML;
      if (parsedChapterNumber) chaptersNumber = parseFloat(parsedChapterNumber);
    }
  });


  const plot = document.getElementsByClassName('comic-description')[0]?.querySelector('div.mb-3')?.innerHTML || '';

  const coverUrl = document.querySelector('div.thumb')?.querySelector('img')?.getAttribute('src') || '';

  const manga: Manga = {
    url: url,
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
    response: html
  };

  return manga;
}
