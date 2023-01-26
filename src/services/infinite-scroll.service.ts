import { mackGalleryMarkup } from '../helpers/helpers';
import ApiService from './api.service';
import refs from '../helpers/vars';
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
                    apiService.setPage(p);
                    apiService.setQuery(q);
                    apiService.getImages().then(({ hits }) => {
                        const markup = mackGalleryMarkup(hits);
                        refs.list.insertAdjacentHTML('beforeend', markup);
                        refs.lastCard = document.querySelector(
                            '.gallery__item:last-child'
                        );
                        const images = document.querySelectorAll('.js-img');
                        images.forEach((img) => {
                            intersectionObserverServices
                                .lazyLoad()
                                .observe(img);
                        });
                        intersectionObserverServices
                            .infinityScroll(
                                apiService.getQuery(),
                                apiService.getPage() + 1
                            )
                            .observe(refs.lastCard);
                    });
                }
            },
            optionsInfinityScroll
        );
    }
}
const intersectionObserverServices = new IntersectionObserverServices();

export default IntersectionObserverServices;
