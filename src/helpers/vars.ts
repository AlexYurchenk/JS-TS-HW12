interface refs {
    list: HTMLUListElement;
    form: HTMLFormElement;
    lastCard: null | HTMLElement;
    images: HTMLImageElement[];
}
const refs: refs = {
    list: document.querySelector('.gallery'),
    form: document.querySelector('.search-form'),
    lastCard: null,
    images: [],
};

export default refs;
