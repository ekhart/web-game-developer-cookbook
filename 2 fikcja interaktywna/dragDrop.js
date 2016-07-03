var itemBoxes = document.querySelectorAll('.inventory-box');

[].forEach.call(itemBoxes, function(itemBox) {
	itemBox.addEventListener('dragstart', hadleDragStart);
	itemBox.addEventListener('dragover', handleDragOver);
	itemBox.addEventListener('drop', handleDrop);
});

var draggingObject;
function handleDragStart (event) {
	draggingObject = this;
	event.dataTransfer.setData('text/html', this.innerHTML);
	var dragIcon = document.createElement('img'),
		imageName = this.firstChild.id;
	dragIcon.src = imageName + '.png';
	event.dataTransfer.setDragImage(dragIcon, -10, 10);
}

function handleDragOver (event) {
	event.preventDefault();
}

function handleDrop (event) {
	event.preventDefault();

	if (draggingObject == this) {
		return;
	}

	var draggingGrandpa = draggingObject.parentElement.parentElement,
		draggedToGrandpa = this.parentElement.parentElement,
		draggingObjectId = draggingObject.firstChild.id;

	inventoryObject.add(draggedToGrandpa.id, draggingObjectId);
	inventoryObject.remove(draggingGrandpa.id, draggingObjectId);

	draggingObject.innerHTML = this.innerHTML;

	this.innerHTML = e.dataTransfer.getData('text/html');
	this.classList.remove('empty');

	draggingObject.classList.add('empty');
}

