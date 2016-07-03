// alert('Witaj, świecie');
// console.log('Witaj, świecie');

function showQuestionIfLib(questionId, lib) {
	if (lib) {
		$('#question' + questionId).show();
	}
}

var libs = [jQuery, impress, atom, createjs, me, require, $().playground, jaws, enchant, Crafty];
libs.forEach((lib, i) => showQuestionIfLib(i + 1, lib));

function checkAnswers() {
	var answerString = "";

	$(':checked').each((_, answer) => answerString += answer.value);

	checkIfCorrect(answerString);
}

function checkIfCorrect(answer) {
	if (parseInt(answer, 16) === 811124566973) {
		$('body').addClass('correct');
		$('h1').text('Wygrałeś!');
		$('canvas').show();
	}
}