define('game',
  ['d3'],
  function(d3) {
    var score = 0;
    var highScore = 19;
    var moves = 0;
    var data = [];
    var rows = 4;
    var nextRows = 2;
    var totalRows = rows + nextRows;
    var columns = 4;
    var highestId = 0;

    var getScore = function() {
      return score;
    };

    var addToScore = function(value) {
      score += value;
      if (score > highScore) {
        highScore = score;
      }
    };

    var getHighScore = function() {
      return highScore;
    };

    var setHighScore = function() {
      return highScore;
    };

    var getMoves = function() {
      return moves;
    };

    var addToMoves = function() {
      moves += 1;
    };

    var newGame = function() {
      score = 0;
      addData();
    };

    var getRandomLetter = function() {
      var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Qu', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      var weights = [817, 149, 278, 425, 1270, 223, 202, 609, 697, 15, 77, 402, 241, 675, 751, 193, 10, 599, 633, 906, 266, 98, 236, 15, 197, 7];
      var weightedLetters = [];
      var randomIndex;

      for(var i = 0; i < letters.length; i += 1) {
        for(var j = 0; j < weights[i]; j += 1) {
          weightedLetters.push(letters[i]);
        }
      }
      randomIndex = Math.floor(Math.random() * weightedLetters.length);

      return weightedLetters[randomIndex];
    };

    var getPointsForWord = function(word) {
      var length = word.length;
      var points;

      switch(length) {
        case 3:
          points = 1;
          break;
        case 4:
          points = 1;
          break;
        case 5:
          points = 2;
          break;
        case 6:
          points = 3;
          break;
        case 7:
          points = 5;
          break;
      }

      if (length < 3) {
        points = 0;
      } else if (length > 7) {
        points = 11;
      }

      return points;
    }

    var addData = function() {
      var numberOfTiles = columns * (totalRows);
      if (data.length !== numberOfTiles) {
        for(var column = 0; column < columns; column += 1) {
          if (!data[column]) {
            data[column] = [];
          }
          while (data[column].length < totalRows) {
            data[column].push({
              id: highestId,
              value: getRandomLetter(),
              color: getRandomColor()
            });
            highestId += 1;
          }
        }
      }
    };

    var removeData = function(d) {
      var row;
      var column;
      for(var i = 0; i < d.length; i += 1) {
        row = d[i].row;
        column = d[i].column;
        if (data && data[d[i].column] && data[d[i].column][d[i].row]) {
          data[d[i].column].splice(d[i].row, 1);
        }
      }
    };

    var convertData = function(oldData) {
      var newData = [];
      var column;
      var row;
      var newObject;

      for(column in oldData) {
        for(row in oldData[column]) {
          newObject = oldData[column][row];
          if (!newObject) {
            newObject = {};
          }
          newObject.row = parseInt(row);
          newObject.column = parseInt(column);
          newObject = oldData[column][row];
          newData.push(newObject);
        }
      }
      // newData.sort(function(a, b) { return a.column > b.column && a.row > b.row; });

      return newData;
    };

    var getData = function() {
      return data;
    };

    var setData = function(value) {
      data = value;
    };

    var getRandomColor = function(id) {
      var colors = ['#F75168', '#678FC1', '#b5577e', '#1DAD7C', '#F98D3F'];
      var randomIndex = Math.floor(Math.random() * colors.length);

      return colors[randomIndex];
    };

    var isAWord = function(word, callback) {
      var success = false;
      var letter = word[0].toLowerCase();

      if (word.length < 3) {
        callback(success);
        return;
      }

      d3.csv(baseUrl + 'assets/eowl/' + letter + '.csv', function(d) {
        for(var i = 0; i < d.length; i += 1) {
          if (word.toLowerCase() === d[i][letter]) {
            success = true;
            break;
          }
        }
        callback(success);
      });
    };

    var isAPrefix = function(word, callback) {
      var success = false;
      var letter = word[0].toLowerCase();

      d3.csv(baseUrl + 'assets/eowl/' + letter + '.csv', function(d) {
        for(var i = 0; i < d.length; i += 1) {
          if (word.toLowerCase() === d[i][letter].substr(0, word.length)) {
            success = true;
            break;
          }
        }
        callback(success);
      });
    };

    var getLetterAtLocation = function(location) {
      return data[location.column][location.row].value;
    };

    return {
      getScore: getScore,
      addToScore: addToScore,
      getHighScore: getHighScore,
      setHighScore: setHighScore,
      getMoves: getMoves,
      addToMoves: addToMoves,
      newGame: newGame,
      getRandomLetter: getRandomLetter,
      getPointsForWord: getPointsForWord,
      addData: addData,
      removeData: removeData,
      convertData: convertData,
      getData: getData,
      setData: setData,
      getRandomColor: getRandomColor,
      isAWord: isAWord,
      isAPrefix: isAPrefix,
      getLetterAtLocation: getLetterAtLocation
    };
  }
);

