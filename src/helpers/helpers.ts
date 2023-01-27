import ApiService from '../services/api.service';
import IntersectionObserverServices from '../services/infinite-scroll.service';
import refs from './vars';
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
interface Request {
    query: string;
    page: number;
    service: ApiService;
}
interface UpdatedRefsRequest {
    lastCard: Element;
    images: Element[];
    service: ApiService;
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
export const setRequestInformation = ({ page, query, service }: Request) => {
    service.setPage(page);
    service.setQuery(query);
};
export const updateMarkup = (hits: Card[]) => {
    const markup = mackGalleryMarkup(hits);
    refs.list.insertAdjacentHTML('beforeend', markup);
};
export const updateRefsAndResetObservers = ({
    lastCard,
    images,
    service,
}: UpdatedRefsRequest) => {
    const intersectionObserverServices = new IntersectionObserverServices();

    refs.images = images;
    refs.lastCard = lastCard;
    refs.images.forEach((img) => {
        intersectionObserverServices.lazyLoad().observe(img);
    });
    intersectionObserverServices
        .infinityScroll(service.getQuery(), service.getPage() + 1)
        .observe(refs.lastCard);
};
