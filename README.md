# mangaworld API

[![ts](https://flat.badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)](https://www.npmjs.com/package/mangaworld)

This implements many API that allow web scraping from the site [Mangaworld](https://www.mangaworld.so/).

THE API IS CURRENTLY UNDER DEVELOPMENT
PLEASE KEEP THE IMPLEMENTATION UPDATED
NEW FEATURES AND FIX WILL BE RELEASED

It implements:

* Getting information of manga and chapters.
* Searching manga by creating queries and querying the site.
* Getting page url of chapters. 
* Getting trending manga and new releases. 
* Downloading the chapters. (To be done)
---

* [Install](#install)
* [Examples](#examples)
* [Info](#info)
* [Creting manga object](#creating-manga-object)
* [Query](#query)
* [Homepage](#homepage)

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
        //your code here...
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
Right now the only parameter accepted is the title of the manga.
Let's see how it works

```js
const manga = await searchMangaByKeywords('one piece');
```

The `searchMangaByKeywords` function will return an array of `Manga` object,
if none is find, the array will be empty

### Homepage

The homepage functions gives you a list of URLs directly from the homepage.
The following functions show how to use it:

```js
// gives you a list of 12 trending manga urls
const trend = await getTrendingMangas();

// gives you the last 16 added manga
const lastAdded = await getLastAddedMangas();

// if you want other 16 just add the 
// optional parameter to the function
const otherLastAdded = await getLastAddedMangas(2);

// gives you the top ten popular manga of the last month 
const popular = await gtLastMonthPopularMangas();

// if you want to get the object from one of them
// just use the getMangaFromUrl function
const manga = await getMangaFromUrl(popular[0]);
```


## License

MIT licensed. See the LICENSE file for details.