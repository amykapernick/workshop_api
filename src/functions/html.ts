import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import fetchDatabase from "../utils/notion/fetch/database";
import parseItems from "../utils/notion/parse/html";
import fetchPage from "../utils/notion/fetch/page";
import updatePage from "../utils/notion/update/page";

export async function html(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    let response: HttpResponseInit = {
		status: 200,
		headers: {
			'Content-Type': `application/json`,
		},
	};

    const { method } = request
    const { page } = request.params
    let data: any = {}

    if(method === 'GET') {
        if(page) {
            data = await fetchPage(
                page,
                response,
                parseItems,
            );
        }
        else {
            data = await fetchDatabase(
                process.env.NOTION_DB_HTML,
                response,
                parseItems,
            );
        }
    }
    else if(method === 'POST') {
        const params: any = await request.json()

        data = await updatePage(
            page,
            response,
            parseItems,
            {
                'Votes': {
                    number: parseInt(params.votes)
                }
            }
        );
    }

    if(data?.status) return data

    response.jsonBody = data

    return ({
		...response,
	});
};

app.http('html', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: html
});
