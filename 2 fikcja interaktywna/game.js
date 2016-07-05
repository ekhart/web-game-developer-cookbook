game.things = (function() {
	var items = {
		bat: {
			name: 'bat',
			effects: {
				'player_inventory': {
					message: "<p>Wziąłeś kij!</p>",
					object: "addItem",
					subject: "deleteItem"
				},
				'dino': {
					message: "<p>Uderzyłeś dinozaura kijem.</p><p>Rozzłościł się.</p>",
					subject: "deleteItem"
				},
				'empty': {
					message: "<p>Odłożyłeś kij.</p>",
					object: "addItem",
					subject: "deleteItem"
				}
			}
		},

		dino: {
			name: 'dino',
			effects: {
				'player_inventory': {
					message: "<p>Nie możesz przesunąć dinozaura...</p>"
				}
			}
		}
	},

	get = function(name) {
		return this.items[name];
	},

	dropItemInfo = function(itemNode, target) {
		var sourceContext = itemNode.parentElement.parentElement.id;

		if (sourceContext !== target) {
			var item = itemNode.firstChild.id,
				itemObject = this.get(item),
				targetInventory = game.slide.getInventory(target);

				if (target === 'player_inventory') {
					var effects = itemObject.effects[target];
				} else if (targetInventory) {
					var effects = itemObject.effects[targetInventory];
				} else {
					var effects = itemObject.effects['empty'];
				}

				var targetObject;
				if (!!effects.object) {
					if (target === 'player_inventory') {
						targetObject = game.playerInventory;
					} else {
						targetObject = game.slide;
					}

					targetObject[effects.object](itemObject);
				}

				if (!!effects.subject) {
					if (sourceContext === 'player_inventory') {
						var sourceObject = game.playerInventory;
					} else {
						var sourceObject = game.slide;
					}

					sourceObject[effects.subject](itemObject);
				}

				if (!!effects.message) {
					game.slide.setText(effects.message);
				}

				game.screen.draw();
		}
	}

	return {
		items: items,
		get: get,
		dropItemInfo: dropItemInfo
	};
})();

game.slide = (function() {
	var invetory = {
		slide1: 'bat',
		slide2: 'dino',
		slide3: null
	},

	addItem = function(item) {
		invetory[game.slide.currentSlide()] = item.name;
	},

	deleteItem = function(item) {
		invetory[game.slide.currentSlide()] = null;
	},

	findTextNode = function(slideId) {
		return document.querySelector("#" + slideId + " .slide-text .event-text");
	},

	getInventory = function(slideId) {
		return invetory[slideId];
	},

	setText = function(message, slideId) {
		if (!!slideId === false) {
			slideId = this.currentSlide();
		}

		return findTextNode(slideId).innerHTML = message;
	},

	currentSlide = function() {
		return game.stepsTaken[game.stepsTaken.length - 1];
	},

	draw = function(slideId) {
		if (!slideId === true) {
			slideId = this.currentSlide();
		}

		var item = getInventory(slideId),
			invetoryBox = document.querySelector("#" + slideId + " .invetory-box");

			if (item === null) {
				invetoryBox.innerHTML = "";
				invetoryBox.classList.add("empty");
			} else {
				invetoryBox.innerHTML = "<img src'"+item+".png' alt='"+item+"' class='item' id='"+item+"'>";
				invetoryBox.classList.remove("empty");
			}
	};

	return {
		addItem: addItem,
		deleteItem: deleteItem,
		setText: setText,
		getInventory: getInventory,
		draw: draw,
		currentSlide: currentSlide
	};

})();