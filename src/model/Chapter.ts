export interface Chapter {
    url: string;
	title: string
    chapterNumber: number;
    dateAdd: string;
    response: string;
    pageUrl?: string[];
    pageNumber?: number;
    keywords?: string[];
    visual?: number;
    visualToday?: number;
    volume?: number;
}