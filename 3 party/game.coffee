class Game extends atom.Game
	constructor: ->
		super
		atom.input.bind atom.key.LEFT_ARROW, 'left'

	update: (dt) ->
		if atom.input.pressed 'left'
			console.log "player started moving left"
		else if atom.input.down 'left'
			console.log "player still moving left"

	draw: ->
		atom.context.fillStyle = 'black'
		atom.context.fillRect 0, 0, atom.width, atom.height

game = new Game
window.onblur = -> game.stop()
window.onfocus = -> game.run()
game.run()	