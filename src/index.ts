import './scss/main.scss';
import 'material-icons/iconfont/material-icons.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { alert, error } from '@pnotify/core';
import refs from './helpers/vars';
import ApiService from './services/api.service';
import IntersectionObserverServices from './services/infinite-scroll.service';
import {
    inputFind,
    formReset,
    updateMarkup,
    updateRefsAndResetObservers,
    setRequestInformation,
} from './helpers/helpers';
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
    setRequestInformation({ page: 1, query: request, service: apiService });
    apiService.getImages().then(({ hits }) => {
        try {
            updateMarkup(hits);
            updateRefsAndResetObservers({
                service: apiService,
                images: [...document.querySelectorAll('.js-img')],
                lastCard: document.querySelector('.gallery__item:last-child'),
            });
        } catch (e) {
            console.log(e);
            error('Something went wrong');
        }
    });
});
