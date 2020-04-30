import axios from 'axios';
import { createQuery } from './helper';

const BASE_URL = "https://api.thecatapi.com/v1";

const getCategories = () => {
	return axios({
		method: 'get',
		url: `${BASE_URL}/categories`
	});
}

const getBreedIdByName = (catName) => {
	const query = {
		q: catName
	}
	return axios({
		method: 'get',
		url: `${BASE_URL}/breeds/search?${createQuery(query)}`
	});
}

export const getRandom50 = async () => {
	try {
		const categories = await getCategories();
		const randomId = categories.data[Math.floor(Math.random() * categories.data.length)].id
		const query = {
			limit: 50,
			category_ids: randomId
		}
		return axios({
			method: 'get',
			url: `${BASE_URL}/images/search?${createQuery(query)}`
		});

	}catch(err) {
		new Error(`api network : ${err}`);
	}
}

export const getSearchDataByName = async (catKind) => {
	try {
		const breedData = await getBreedIdByName(catKind);
		const breedId = breedData.data[0].id;
		const query = {
			breed_ids: breedId,
			limit: 50
		}

		return axios({
			method: 'get',
			url: `${BASE_URL}/images/search?${createQuery(query)}`
		});
	}catch(err) {
		new Error(err);
	}
}

export const getSearchDataById = async (catId) => {
	return axios({
		method: 'get',
		url: `${BASE_URL}/images/${catId}`
	});
}