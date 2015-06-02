var library = Alloy.Collections.book;
library.fetch();
$.index.open();

function showBook(e) {
	var detailWin = Alloy.createController('detail', library.at(e.index)).getView()
	if (OS_ANDROID) {
		detailWin.open();
	} else if (OS_IOS) {
		$.index.openWindow(detailWin);
	}
}

function addBook(e) {
	var addWin = Alloy.createController('add').getView()
	if (OS_ANDROID) {
		addWin.open();
	} else if (OS_IOS) {
		$.index.openWindow(addWin);
	}
}

function refreshTable(e) {
	library.fetch();
}

