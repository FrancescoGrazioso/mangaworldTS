export interface Chapter {
    url: string;
    volume?: number;
    chapterNumber: number;
    pageNumber?: number;
    visual?: number;
    visualToday?: number;
    pageUrl?: string[];
    dateAdd: string;
    keywords?: string[];
    response: string;
	title: string
}