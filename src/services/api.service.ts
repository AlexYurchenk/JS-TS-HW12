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
interface Response {
    total: number;
    totalHits: number;
    hits: Card[];
}
class ApiService {
    private page: number;
    private query: string;
    constructor() {}
    async getImages() {
        return await fetch(
            `${process.env.BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${process.env.SECRET_KEY}`
        ).then((r) => {
            if (!r.ok) {
                throw new Error('Something went wrong');
            }
            const response: Promise<Response> = r.json();
            return response;
        });
    }
    setPage(p: number) {
        this.page = p;
    }
    setQuery(q: string) {
        this.query = q;
    }
    requestReset() {
        this.page = 1;
        this.query = '';
    }
    getPage() {
        return this.page;
    }
    getQuery() {
        return this.query;
    }
}
export default ApiService;
