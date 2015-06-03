// This sync adapter makes HTTP requests to the BookService to manage data

// Global URL variables
var BASE_URL,
	API_KEY,
	AUTH_TYPE;

// Override the Backbone.sync method with the following
module.exports.sync = function(method, model, options) {

	var payload = model.toJSON();
	var error;
	
	if(typeof(model.config.adapter.base_url) != 'undefined'){
		BASE_URL = model.config.adapter.base_url; 
		// this enables other models using the same adapter to work, otherwise the BASE_URL variable persists
	}
	switch(method) {

		// This case is called by the Model.fetch and Collection.fetch methods to retrieve data.
		case 'read':
			// Use the idAttribute property in case the model ID is set to something else besides 'id'
			if (payload[model.idAttribute]) {
				// If we have an ID, fetch only one document
				http_request('GET', BASE_URL + payload[model.idAttribute], null, callback);
			} else {
				// if not, fetch all documents
				http_request('GET', BASE_URL, null, callback);
			}
			break;

		// This case is called by the Model.save and Collection.create methods
		// to initialize a model if the IDs are not set.
		case 'create':
			if (payload.title && payload.author) {
				http_request('POST', BASE_URL, {title: payload.title, author: payload.author}, callback);
			} else {
				error = 'ERROR: Cannot create model without an author or title!';
			}
			break;

		// This case is called by the Model.destroy method to delete the model from storage.
		case 'delete':
			if (payload[model.idAttribute]) {
				http_request('DELETE', BASE_URL + payload[model.idAttribute], null, callback);
			} else {
				error = 'ERROR: Model does not have an ID!';
			}
			break;

		// This case is called by the Model.save and Collection.create methods
		// to update a model if they have IDs set.
		case 'update':
			if (payload[model.idAttribute]) {
				http_request('PUT', BASE_URL + payload[model.idAttribute], {title: payload.title, author: payload.author}, callback);
			} else {
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
	function callback(error, response) {
		var res = response ? JSON.parse(response) : null;
		if (error) {
			// Calls the default Backbone error callback
			// and invokes a custom callback if options.error was defined.
			var err = res.error || error;
			Ti.API.error('ERROR: ' + err);
			options.error(model, error, options);
			model.trigger('error');
		} else {
			// Calls the default Backbone success callback
			// and invokes a custom callback if options.success was defined.
			if (res && res.key) {
				// Get only the model(s)
				res = res[res.key];
			}
			options.success(res, response, options);
		}
	};
};

// Helper function for creating an HTTP request
function http_request(method, url, payload, callback) {
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			if (callback) {
				var resource = this.getResponseHeader('Location') || null;
				if (resource) {
					// Arrow applications do not return a payload response for non-GET methods.
					// Need to retrieve the model to pass to Backbone APIs
					resource = resource.slice(resource.lastIndexOf('/') + 1);
					http_request('GET', BASE_URL + resource, null, callback);
				} else {
					callback(null, this.responseText);
				}
			}
		},
		onerror: function(e) {
			if (callback) {
				callback(e.error, this.responseText);
			}
		},
		timeout : 5000
	});

	client.open(method, url);
	if (AUTH_TYPE === 'basic') {
		client.setRequestHeader('Authorization', 'Basic ' + Ti.Utils.base64encode(API_KEY + ':'));
	}
	if (AUTH_TYPE === 'apikey') {
		client.setRequestHeader('APIKey', API_KEY);
	}
	client.send(payload);
};

// Perform some actions before creating the Model class
module.exports.beforeModelCreate = function(config, name) {
	config = config || {};
	// Set configuration settings
	BASE_URL = config.adapter.base_url || 'http://localhost:8080/api/book';
	API_KEY = config.adapter.api_key || '';
	AUTH_TYPE = config.adapter.auth_type || 'basic';
	return config;
};

// Perform some actions after creating the Model class
module.exports.afterModelCreate = function(Model, name) {
	// Nothing to do
};
