

export async function fetchHTMLWebPage(url: string) {
  //const urlToFetch = 'http://www.whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?'
  const res = await fetch(url);
  let html: string = await res.text();
  // html = html.slice(2, html.length-1).trim();
  // const jsonHTML = JSON.parse(html)
  // return jsonHTML.contents;
  return html;
}

export async function parseHTML(html: string) {
  const dom:Document = new DOMParser().parseFromString(html, "text/html");
  return dom;
}
