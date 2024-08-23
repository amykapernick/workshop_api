import type { HttpResponseInit } from "@azure/functions"
import { Client } from '@notionhq/client';

const notion = new Client({
	auth: process.env.NOTION_API,
}); 

const fetchNotion = async (query) => {
	return await notion.databases
		.query(query)
		.then((res) => {
			if(res?.has_more) {
				return fetchNotion({
					...query,
					start_cursor: res.next_cursor
				})
					.then(res2 => {
						return {
							...res,
							...res2,
							results: [
								...res.results,
								...res2.results
							]
						}
					})
			}
			return res
		})
		.catch((error) => ({error}));
}

const fetchDatabase = async (
	source: string, 
	response: HttpResponseInit, 
	parseData: any,
	filter = undefined
) => {
	const data: any = await fetchNotion(
		{
			database_id: source,
			filter: filter,
		}
	)
		.then((res) => res)
		.catch((error) => ({error}));

	if (data?.error) {
		return {
			...response,
			status: 500,
			jsonBody: {
				message: `Error fetching data`,
				error: data?.error,
			},
		};
	}

	return await parseData(data?.results || []);
}

export default fetchDatabase