const cardTemplates = require('../templates/card.hbs');

interface Card {
    id: number;
    pageURL: string;
    type: string;
    tags: string;
    previewURL: string;
    previewWidth: number;
    previewHeight: number;
    webformatURL: string;
    webformatWidth: number;
    webformatHeight: number;
    largeImageURL: string;
    imageWidth: number;
    imageHeight: number;
    imageSize: number;
    views: number;
    downloads: number;
    collections: number;
    likes: number;
    comments: number;
    user_id: number;
    user: string;
    userImageURL: string;
}

export const mackGalleryMarkup = (cards: Card[]) =>
    cards
        .map((c: Card) =>
            cardTemplates({
                webformatURL: c.webformatURL,
                likes: c.likes,
                tags: c.tags,
                views: c.views,
                comments: c.comments,
                downloads: c.downloads,
            })
        )
        .join('');
export const inputFind = (e: FormDataEvent) =>
    [...(e.target as HTMLFormElement).children].find(
        (e) => e.tagName === 'INPUT'
    );
export const formReset = (i: HTMLInputElement) => {
    i.value = '';
};
