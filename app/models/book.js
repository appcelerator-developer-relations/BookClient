exports.definition = {
	config: {
		adapter: {
			type: "book_acs", //< use either book_rest or book_acs
			collection_name: "book",
			// Endpoint URL to access the service for the REST sync adapter
			base_url: 'BASE_URL/book/'
		}
	},		
	extendModel: function(Model) {
		// Mongo uses _id as the model ID
		_.extend(Model.prototype, {
			idAttribute: '_id'
		});
		return Model;
	}
}
