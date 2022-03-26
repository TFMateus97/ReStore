import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { PaginatedReponse } from "../models/pagination";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true; //permitir que navegador receba e preencha o cookie

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
    async (response) => {
        await sleep();
        const pagination = response.headers['pagination'];//precisa ser minusculo, mesmo se no browser estiver maiusculo
        if(pagination){
            response.data = new PaginatedReponse(response.data, JSON.parse(pagination))
            return response;
        }
        return response;
    },
    (error: AxiosError) => {
        const { data, status } = error.response!;
        switch (status) {
            case 404:
                if (data.errors) {
                    const modelStateError: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key])
                            modelStateError.push(data.errors[key]);
                    }
                    throw modelStateError.flat();
                }
                toast.error(data.title);
                break;
            case 401:
                toast.error(data.title);
                break;
            case 500:
                history.push({
                    pathname: "/server-error",
                    state: { error: data },
                });
                break;
            default:
                break;
        }
        return Promise.reject(error.response);
    }
);

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
    list: (params: URLSearchParams) => requests.get("products", params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get('products/filters'),

};

const TestErrors = {
    get400error: () => requests.get("buggy/bad-request"),
    get401error: () => requests.get("buggy/unauthorized"),
    get404error: () => requests.get("buggy/not-found"),
    get500error: () => requests.get("buggy/server-error"),
    getValidationError: () => requests.get("buggy/validation-error"),
};

const Basket = {
    getBasket: () => requests.get("basket"),
    addItem: (productId: number, quantity: number = 1) =>
        requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity: number) =>
        requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const Account = {
    login: (values: any) => requests.post("account/login", values),
    register: (values: any) => requests.post("account/register", values),
    currentUser: () => requests.get("account/currentUser"),
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account
};

export default agent;
