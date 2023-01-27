import {
    updateMarkup,
    setRequestInformation,
    updateRefsAndResetObservers,
} from '../helpers/helpers';
import ApiService from './api.service';
const callbackLazyLoad = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
) => {
    entries.forEach((entry) => {
        const img = entry.target as HTMLImageElement;
        if (entry.isIntersecting && img.dataset.src) {
            img.classList.remove('js-img');
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
};

const optionsLazyLoad = {
    rootMargin: '20px 0px 0px 0px',
};
const optionsInfinityScroll = {
    rootMargin: '20px 0px 0px 0px',
};
class IntersectionObserverServices {
    lazyLoad() {
        return new IntersectionObserver(callbackLazyLoad, optionsLazyLoad);
    }
    infinityScroll(q: string, p: number) {
        const apiService = new ApiService();

        return new IntersectionObserver(
            (
                entries: IntersectionObserverEntry[],
                observer: IntersectionObserver
            ) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    setRequestInformation({
                        page: p,
                        query: q,
                        service: apiService,
                    });
                    apiService.getImages().then(({ hits }) => {
                        updateMarkup(hits);
                        updateRefsAndResetObservers({
                            lastCard: document.querySelector(
                                '.gallery__item:last-child'
                            ),
                            service: apiService,
                            images: [...document.querySelectorAll('.js-img')],
                        });
                    });
                }
            },
            optionsInfinityScroll
        );
    }
}
const intersectionObserverServices = new IntersectionObserverServices();

export default IntersectionObserverServices;
