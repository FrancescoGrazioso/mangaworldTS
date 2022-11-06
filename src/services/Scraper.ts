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
  const document = await parseHTML(html);
  const manga: Manga = await newManga(url, document);

  return manga;
}

async function newManga(url: string, document: Document) {
  const divCollection = Array.from(document.getElementsByClassName('info'));
  const infoCollection = Array.from(divCollection[0].children);
  const mangaTitle = infoCollection[0].innerHTML;

  const divs = infoCollection[1].querySelectorAll('div');

  let mangaTitleAlternative = '';
  const genres: Genre[] = [];
  const authors: string[] = [];
  const artists: string[] = [];
  const type: Type = {type: undefined};
  const state: State = {state: undefined};
  let visual: number = 0;

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
    }
  });

  const manga: Manga = {
    url: url,
    title: mangaTitle,
    titleAlternative: mangaTitleAlternative,
    genres,
    authors,
    artists,
    type,
    state,
    visual
  };

  divs.forEach((div, idx) => {
    console.log(idx + ' - ' + div.innerHTML);
  });

  console.log(manga)

  return manga;
}
