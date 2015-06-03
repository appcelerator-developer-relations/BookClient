exports.definition = {
	config: {
		adapter: {
			type: 'book_rest',
			collection_name: 'book',
			// Endpoint URL to access the Arrow application
			base_url: 'http://192.168.0.1:8080/api/book/',
			// API key for the Arrow application
			api_key: 'abcdef1234567890',
			// Authorization type. Set to either none, basic or apikey
			auth_type: 'basic'
		}
	}
};
