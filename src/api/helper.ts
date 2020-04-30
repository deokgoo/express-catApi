export const createQuery = (queryObject: Object) => {
	let query = []

	Object.entries(queryObject).forEach(x => {
		query.push(x.join('='));
	})

	return query.join('&');
}