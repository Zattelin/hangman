document.addEventListener('DOMContentLoaded', function () {
    // Array with objects with answers and clues
    var hangManData = [
        {
            answer: 'array',
            clue: 'Clue: Used to store multiple values in a single variable.'
        },
        {
            answer: 'function',
            clue: 'Clue: Executed when "something" invokes it.'
        },

        {
            answer: 'boolean',
            clue: 'Clue: Represents one of two values: true or false.'
        },

        {
            answer: 'null',
            clue: 'Clue: Nothing.'
        },

        {
            answer: 'undefined',
            clue: 'Clue: Variable has not been assigned a value.'
        },
        {
            answer: 'number',
            clue: 'Clue: Numerical value.'
        },
        {
            answer: 'string',
            clue: 'Clue: Stores a series of characters.'
        },
    ];
    // grab random index from array
    function selectRandomDataFrom(array) {
        return array[Math.floor(Math.random() * array.length)]
    }
    // inline ccs added for ease of testing code
    function styleCharacter(char) {
        return '<h1 style="float: left; padding: 10px;">' + char + '</h1>'
    }

    function numberOfDuplicates(array) {
        return array.filter(function (item, pos, array) {
            return array.indexOf(item) !== pos
        }).length
    }

    var losses = 0;
    var wins = 0;

    document.getElementById('wins').innerHTML = styleCharacter('Wins: ' + wins);
    document.getElementById('losses').innerHTML = styleCharacter('Losses: ' + losses);


    // click play to start hangman game
    document.getElementById("play").addEventListener("click", function (letter) {

        document.getElementById('wins').innerHTML = styleCharacter('Wins: ' + wins);
        document.getElementById('losses').innerHTML = styleCharacter('Losses: ' + losses);

        var selection = selectRandomDataFrom(hangManData);
        var clue = selection.clue;
        var answer = selection.answer.split('');
        var guessedCorrectly = [];
        var guessedWrong = [];

        // send clue to html tag
        document.getElementById("clue").innerHTML = clue;


        // take answer and split in to array and return _ for letters
        document.getElementById("blanks").innerHTML = answer.map(function (letter) {
            return styleCharacter('_');
        }).toString().replace(/\,/g, '');

        // type letter for guess
        document.onkeyup = function (event) {
            var guess = event.key;
            ßguess = guess.toLowerCase()
            makeGuess(guess);
            console.log(guess.toLowerCase())
        };
        // correct guess is any index greater than -1
        function makeGuess(guess) {
            if ((answer.indexOf(guess) > -1) && (guessedCorrectly.indexOf(guess) < 0)) {
                guessedCorrectly.push(guess);

                if ((guessedCorrectly.length + numberOfDuplicates(answer)) === answer.length) {
                    return youWin();
                }

                document.getElementById('blanks').innerHTML = answer.map(function (letter) {

                    if (guessedCorrectly.indexOf(letter) > -1) {
                        return styleCharacter(letter)
                    }

                    return styleCharacter("_")
                }).toString().replace(/\,/g, '');
            }
            // incorrect guess if indext value is less than 0
            if ((answer.indexOf(guess) < 0) && (guessedWrong.indexOf(guess) < 0)) {
                guessedWrong.push(guess);

                if ((guessedWrong.length > 4 )){
                    return youLose()
                }

                document.getElementById('graveyard').innerHTML = guessedWrong.map(function (letter) {
                    return styleCharacter(letter)
                }).toString().replace(/\,/g, '');
            }
        }
        function youWin() {
            document.getElementById('blanks').innerHTML = 'You Survived. <br> <br> Fight for the Users. <br><br> Press spacebar to continue.';
            document.getElementById('graveyard').innerHTML = '';
            wins++;
            function empty() {
                //empty your array
                guessedWrong = [];
            }
            empty();
        }

        function youLose() {
            document.getElementById('blanks').innerHTML = 'You Lose. <br><br> End of Line. <br><br> Press spacebar to continue.';
            document.getElementById('graveyard').innerHTML = '';
            losses++;
            function empty() {
                //empty your array
                guessedWrong = [];
            }
            empty();
        }

    });
});

// add save states to track score.


// bonus if a word has multiple same letters track those seperatly.