// Require in the bindings file to access the BookService using JavaScript API calls instead of REST requests
var service = require('ti.cloud.BookService');

// Override the Backbone.sync method with the following
module.exports.sync = function(method, model, options) {

	var payload = model.toJSON();
	var error;

	switch(method) {

		// This case is called by the Model.fetch and Collection.fetch methods to retrieve data.
		case 'read':
			// Use the idAttribute property in case the model ID is set to something else besides 'id'
			if (payload[model.idAttribute]) {
				// If we have an ID, fetch only one document
				service.book_bookRead(payload[model.idAttribute], null, cb)
			}
			else {
				// if not, fetch all documents
				service.book_bookReadAll(cb)
			}
			break;

		// This case is called by the Model.save and Collection.create methods
		// to a initialize model if the IDs are not set.
		case 'create':
			if (payload.title && payload.author) {
				service.book_bookCreate({title: payload.title, author: payload.author}, cb)
			}
			else {
				error = 'ERROR: Cannot create model without an author or title!';
			}
			break;

		// This case is called by the Model.destroy method to delete the model from storage.
		case 'delete':
			if (payload[model.idAttribute]) {
				service.book_bookDelete(payload[model.idAttribute], null, cb)
			}
			else {
				error = 'ERROR: Model does not have an ID!';
			}
			break;

		// This case is called by the Model.save and Collection.create methods
		// to update a model if they have IDs set.
		case 'update':
			if (payload[model.idAttribute]) {
				service.book_bookUpdate(payload[model.idAttribute], {title: payload.title, author: payload.author}, cb)
			}
			else {
				error = 'ERROR: Cannot update model without an ID!';
			}
			break;

		default :
			error = 'ERROR: Sync method not recognized!';
	};

	if (error) {
		options.error(model, error, options);
		Ti.API.error(error);
		model.trigger('error');
	}

	// Success callback to API calls
	function cb (r, e) {
		options.success(r, JSON.stringify(r), options);
	}
};


// Perform some actions before creating the Model class
module.exports.beforeModelCreate = function(config, name) {
	config = config || {};
	return config;
};

// Perform some actions after creating the Model class 
module.exports.afterModelCreate = function(Model, name) {
	// Nothing to do
};