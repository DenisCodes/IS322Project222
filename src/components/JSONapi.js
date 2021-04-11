import axios from 'axios';

const openDataBase = axios.create({
    baseURL:'https://my-json-server.typicode.com/DenisCodes/database'
});

const getDataBaseById = async (ID) => {
    const response = await openDataBase.get('/tasks/'+ String(ID));
    return response;
}

export default{
    openDataBase, getDataBaseById
}