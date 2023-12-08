$(document).ready(function(){
    var currentStep = 1;
    var totalSteps = 10;
    var correctCount = 0;
    var incorrectCount = 0;
    var words = ["always", "sometimes", "never", "often", "rarely", "usually", "seldom", "frequently", "occasionally", "constantly"];
    var translations = ["завжди", "іноді", "ніколи", "часто", "рідко", "зазвичай", "зрідка", "часто", "іноді", "постійно"];
    var usedIndexes = []; // Масив для зберігання індексів використаних слів

    function updateStats() {
        $('#current-step').text(currentStep);
        $('#correct-count').text(correctCount);
        $('#incorrect-count').text(incorrectCount);
    }

    function getRandomWordIndex() {
        var randomIndex = Math.floor(Math.random() * words.length);
        while(usedIndexes.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * words.length);
        }
        usedIndexes.push(randomIndex);
        return randomIndex;
    }
	function resetGame() {
        currentStep = 1;
        correctCount = 0;
        incorrectCount = 0;
        usedIndexes = [];
        showNextWord();
        updateStats();
    }
	 $('#results-modal').click(function(event){
        if (event.target.id === 'results-modal') {
            $('#results-modal').hide();
            resetGame();
        }
    });
    function showNextWord() {
        if (currentStep > totalSteps) {
            $('#results-modal').show();
            $('#language-level').text(correctCount > 7 ? 'Advanced' : correctCount > 4 ? 'Intermediate' : 'Beginner');
        } else {
            var randomIndex = getRandomWordIndex();
            $('#flashcard .card-word').text(words[randomIndex]);
            $('#translation-input').val('');
            updateStats();
        }
    }

    $('#check-button').click(function(){
        var inputTranslation = $('#translation-input').val().trim();
        var currentWord = $('#flashcard .card-word').text();
        var wordIndex = words.indexOf(currentWord);
        if (inputTranslation.toLowerCase() === translations[wordIndex].toLowerCase()) {
            correctCount++;
        } else {
            incorrectCount++;
        }
        currentStep++;
        showNextWord();
    });

    

    $('.close-button').click(function(){
        $('#results-modal').hide();
    });

    showNextWord();
});
