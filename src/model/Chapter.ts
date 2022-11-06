export interface Chapter {
    url: string;
    volume: number;
    chapterNumber: number;
    pageNumber: number;
    visual: number;
    visualToday: number;
    pageUrl: string[];
    dateAdd: string;
    keywords: string[];
    response: string;
}

const MonthNames = {
	"Gennaio":   1,
	"Febbraio":  2,
	"Marzo":     3,
	"Aprile":    4,
	"Maggio":    5,
	"Giugno":    6,
	"Luglio":    7,
	"Agosto":    8,
	"Settembre": 9,
	"Ottobre":   10,
	"Novembre":  11,
	"Dicembre":  12,
}