# mangaworld API

![ts](https://flat.badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)(https://www.npmjs.com/package/mangaworld)

This implements many API that allow web scraping from the site [Mangaworld](https://www.mangaworld.so/).

It implements:

* Getting information of manga and chapters.
* Searching manga by creating queries and querying the site.
* Getting page url of chapters. (To be done)
* Getting trending manga and new releases. (To be done)
* Downloading the chapters. (To be done)
---

* [Install](#install)
* [Examples](#examples)
* [Info](#info)
* [Creting manga object](#creating-manga-object)
* [Query](#query)

---

## Install

With a [correctly configured](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/) NodeJS project:

```sh
npm install mangaworld
```

## Examples

### Info

Let's start by reading a manga by giving in the URL.

```js
import { getMangaFromUrl } from "mangaworld";

getMangaFromUrl('https://www.mangaworld.so/manga/1637/chainsaw-man').then(
    m => {
        console.log(m)
    }
)
```

We have seen how to retrieve `Manga` type. 
In its structure you can find many properties and object like the `Chapter` object

### Creting manga object

You can read an object and store it in a variable

```js
const manga = await getMangaFromUrl('https://www.mangaworld.so/manga/1637/chainsaw-man');
```

### Query


Queries are useful for searching for manga using keywords.
Let's see how it works

```js
const manga = await searchMangaByKeywords('one piece');
```

The `searchMangaByKeywords` function will return an array of `Manga` object,
if none is find, the array will be empty


## License

MIT licensed. See the LICENSE file for details.