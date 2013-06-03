// This sync adapter makes HTTP requests to the BookService to manage data

// Global URL variable
var BASE_URL = 'http://localhost:8080/book/';

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
				http_request('GET', BASE_URL + payload[model.idAttribute], null, callback);
			}
			else {
				// if not, fetch all documents
				http_request('GET', BASE_URL, null, callback);
			}
			break;

		// This case is called by the Model.save and Collection.create methods
		// to a initialize model if the IDs are not set.
		case 'create':
			if (payload.title && payload.author) {
				http_request('POST', BASE_URL, {title: payload.title, author: payload.author}, callback);
			}
			else {
				error = 'ERROR: Cannot create model without an author or title!';
			}
			break;

		// This case is called by the Model.destroy method to delete the model from storage.
		case 'delete':
			if (payload[model.idAttribute]) {
				http_request('DELETE', BASE_URL + payload[model.idAttribute], null, callback);
			}
			else {
				error = 'ERROR: Model does not have an ID!';
			}
			break;

		// This case is called by the Model.save and Collection.create methods
		// to update a model if they have IDs set.
		case 'update':
			if (payload[model.idAttribute]) {
				http_request('PUT', BASE_URL + payload[model.idAttribute], {title: payload.title, author: payload.author}, callback);
			}
			else {
				error = 'ERROR: Model does not have an ID!';
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

	// Simple default callback function for HTTP request operations.
	function callback(success, response, error) {
		res = JSON.parse(response);
		if (success) {
			// Calls the default Backbone success callback
			// and invokes a custom callback if options.success was defined.
			options.success(res, JSON.stringify(res), options);
		}
		else {
			// Calls the default Backbone error callback
			// and invokes a custom callback if options.error was defined.
			var err = res.error || error;
			Ti.API.error('ERROR: ' + err);
			options.error(model, error, options);
			model.trigger('error');
		}
	};
};

// Helper function for creating an HTTP request
function http_request(method, url, payload, callback) {

	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			if (callback) callback(true, this.responseText, null);
		},
		onerror: function(e) {
			if (callback) callback(false, this.responseText, e.error);
		},
		timeout : 5000
	});

	client.open(method, url);
	client.send(payload);
};

// Perform some actions before creating the Model class
module.exports.beforeModelCreate = function(config, name) {
	config = config || {};
	// If there is a base_url defined in the model file, use it
	if (config.adapter.base_url) {
		BASE_URL = config.adapter.base_url;
	}
	return config;
};

// Perform some actions after creating the Model class 
module.exports.afterModelCreate = function(Model, name) {
	// Nothing to do
};