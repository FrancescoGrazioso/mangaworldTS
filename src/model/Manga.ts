import { Chapter } from "./Chapter";
import { Genre } from "./Genre";
import { State } from "./State";
import { Type } from "./Type";

export interface Manga {
    url: string;
    title: string;
    titleAlternative: string;
    coverUrl: string;
    genres: Genre[];
    authors: string[];
    artists: string[];
    type: Type;
    state: State;
    plot: string;
    yearStart: string;
    volumeNumber: number;
    chaptersNumber: number;
    chapters: Chapter[];
    visual: number;
    keywords: string[];
    response: string;
}