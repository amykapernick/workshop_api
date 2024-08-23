const parseItems = (notionData) => {
	const data = [];

	notionData.forEach((item) => {
		const name = item.properties.Name.title[0]?.plain_text;

		if (!name) return;

		if(name === 'track') {
			console.log({...item.properties})
		}

		data.push({
			name,
			id: item.id,
			votes: item.properties.Votes?.number,
			links: {
				html_reference: item.properties['HTML Reference']?.url,
				mdn: item.properties.MDN?.url,
			},
			self_closing: item.properties['Self Closing']?.checkbox,
			example: item.properties.Example.checkbox,
			content: item?.content || null
		});
	});

	return data;
};

export default parseItems;
