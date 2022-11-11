import fetch from 'node-fetch' ;
import { JSDOM } from 'jsdom';

export async function fetchHTMLWebPage(url: string) {
    const res = await fetch(url);
    const html: string = await res.text();
    return html;
  }
  
  export async function parseHTML(html: string) {
    const dom = new JSDOM(html);
    return dom.window.document;
  }