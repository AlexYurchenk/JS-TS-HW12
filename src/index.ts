import './scss/main.scss';
import 'material-icons/iconfont/material-icons.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { alert, error } from '@pnotify/core';
import refs from './helpers/vars';
import ApiService from './services/api.service';
import IntersectionObserverServices from './services/infinite-scroll.service';
import { mackGalleryMarkup, inputFind, formReset } from './helpers/helpers';
const apiService = new ApiService();
const intersectionObserverServices = new IntersectionObserverServices();

const cleanContainer = () => (refs.list.innerHTML = '');
refs.form.addEventListener('submit', (e: FormDataEvent) => {
    e.preventDefault();
    cleanContainer();
    const input = inputFind(e) as HTMLInputElement;
    const request = input.value.trim();
    if (!request) {
        formReset(input);
        return alert('Bad request');
    }
    apiService.setQuery(request);
    apiService.setPage(1);
    apiService.getImages().then(({ hits }) => {
        try {
            const markup = mackGalleryMarkup(hits);
            refs.list.insertAdjacentHTML('beforeend', markup);
            const images = document.querySelectorAll('.js-img');
            images.forEach((img) => {
                intersectionObserverServices.lazyLoad().observe(img);
            });
            refs.lastCard = document.querySelector('.gallery__item:last-child');
            intersectionObserverServices
                .infinityScroll(apiService.getQuery(), apiService.getPage() + 1)
                .observe(refs.lastCard);
        } catch (e) {
            console.log(e);
            error('Something went wrong');
        }
    });
});
