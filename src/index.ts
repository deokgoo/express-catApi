import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import dotenv from 'dotenv';

import { getRandom50, getSearchDataByName , getSearchDataById } from './api/catApi';

dotenv.config();
const {API_PORT} = process.env;

const app = express();
let router = express.Router();

app.use(cors());
app.use(morgan('dev'));

router.get('/random50', async (_, res) => {
	try{
		let randomData = await getRandom50();
		const parseRandomData = randomData.data.map(x => {
			return {
				id: x.id,
				url: x.url,
				name: `${x.categories[0].name}-${x.id}`
			}
		})

		res.send(parseRandomData);
	}catch(err) {
		new Error(err)
	}
})

router.get('/search', async (req, res) => {
	const catKind = req.query.q
	try{
		const searchData = await getSearchDataByName(catKind);
		const parseSearchData = searchData.data.map(x => {
			const {id, url} = x;
			return {
				id,
				url,
				name: `${catKind}-${id}`,
			}
		})

		res.send(parseSearchData);
	}catch(err) {
		res.send([])
	}
})

router.get('/:id', async (req, res) => {
	try{
		const catId = req.params.id;
		const searchData = await getSearchDataById(catId);
		const {url, width, height} = searchData.data;
		const {name, id, temperament, origin} = searchData.data.breeds[0];

		const parseSearchData = {
			name,
			id,
			temperament,
			origin,
			url,
			width,
			height,
		}

		res.send(parseSearchData);
	}catch(err) {
		res.send([]);
	}
})

app.use('/cats', router);


app.listen(API_PORT || 80, () => 
	console.log(chalk.whiteBright.bgBlue(`Cat API listening on port ${API_PORT}!`)));