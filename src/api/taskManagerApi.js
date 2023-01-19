/** Libraries */
import axios from 'axios';

/** Helpers */
import { getEnvironmets } from '../helpers/getEnvironmets';

const { VITE_REACT_APP_API_URL } = getEnvironmets();

const taskManagerApi = axios.create({
    baseURL: VITE_REACT_APP_API_URL
});


// Todo: configurar interceptores
taskManagerApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        // eslint-disable-next-line
        ['x-token']: localStorage.getItem('token')
    }

    return config;
})

export default taskManagerApi;



