var library = Alloy.Collections.book;
library.fetch();
$.index.open();

function showBook(e) {
	var book = library.at(e.index);
	var detail = Alloy.createController('detail', book).getView();
	detail.open();
}

function addBook(e) {
	var add = Alloy.createController('add').getView();
	add.open();
}

function refreshTable(e) {
	library.fetch();
}

// Initializes the Android Action Bar
// Bound to the window's open event
function loadExtras (e) {
	if (OS_ANDROID) {
		$.index.activity.onCreateOptionsMenu = function(e) { 
			var menu = e.menu; 
			var addItem = menu.add({ 
				title : "Add", 
				icon : 'ic_menu_add.png',
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
			}); 
			addItem.addEventListener("click", addBook);

			var refreshItem = menu.add({
				title : "Refresh",
				icon : 'ic_menu_refresh.png',
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
			}); 
			refreshItem.addEventListener("click", refreshTable);
		};
	}
}
