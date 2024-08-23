import type { HttpResponseInit } from "@azure/functions"
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({
	auth: process.env.NOTION_API,
}); 

const n2m = new NotionToMarkdown({
	notionClient: notion
})

const updatePage = async (
	pageId: string,
	response: HttpResponseInit,
	parseData: any,
	updatedProperties: any
) => {
	const data: any = await notion.pages
		.update({
			page_id: pageId,
			properties: updatedProperties
		})
		.then((res) => res)
		.catch((error) => ({ error }));

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

	const pageData = await n2m.pageToMarkdown(pageId)
		.then(res => n2m.toMarkdownString(res))

	return await parseData([{
		...data,
		content: pageData?.parent
	}] || [])?.[0];

}

export default updatePage