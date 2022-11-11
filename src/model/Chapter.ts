export interface Chapter {
    url: string;
	title: string
    chapterNumber: number;
    dateAdd: string;
    response: string;
    pageUrl?: string[];
    pageNumber?: number;

    volume?: number;
    visual?: number;
    visualToday?: number;
    keywords?: string[];
}