define(['game'], function(game) {
	describe("game", function() {
		beforeEach(function() {
			game.newGame();
		});
		it("should exist", function() {
			expect(game).to.exist;
		});
		it("should be an object", function() {
			expect(game).to.be.an('object');
		});
		it("should start score at 0", function() {
			expect(game.getScore()).to.equal(0);
		});
		it("should be able to add to score", function() {
			game.addToScore(1);
			expect(game.getScore()).to.equal(1);
		});
		it("should change the high score", function() {
			game.addToScore(100);
			expect(game.getHighScore()).to.equal(100);
		});
		it("should be reset game", function() {
			game.addToScore(1);
			game.newGame();
			expect(game.getScore()).to.equal(0);
		});
		it("should be able to get high score", function() {
			expect(game.getHighScore()).to.be.a("number");
		});
		it("should be able to get points for a word", function() {
			expect(game.getPointsForWord('hello')).to.equal(2);
		});
		it("should be able to get a random letter", function() {
			expect(game.getRandomLetter()).to.be.a("string");
			expect(game.getRandomLetter().length).to.be.below(3);
		});
		it("should be able to get random color", function() {
			expect(game.getRandomColor()).to.be.a("string");
			expect(game.getRandomColor().length).to.equal(7);
		});
		it("should be able to get random data", function() {
			expect(game.getData()).to.be.an("array");
			expect(game.getData()[0]).to.be.an("array");
			expect(game.getData().length).to.equal(4);
			expect(game.getData()[0].length).to.equal(6);
			expect(game.getData()[0][0].id).to.be.a("number");
			expect(game.getData()[0][0].value).to.be.a("string");
			expect(game.getData()[0][0].color).to.be.a("string");
		});
		it("should be able to remove data", function() {
			game.setData(
				[
					[
						{value: 'A'},
						{value: 'B'}
					]
				]
			);
			game.removeData([{row: 0, column: 0}]);
			expect(game.getData()[0][0]).to.deep.equal({value: 'B'});
		});
		it("should be able to add data", function() {
			game.setData([
				[
					{id: 4},
					{id: 5},
					{id: 15},
					{id: 10},
					{id: 1},
				]
			]);
			game.addData();
			expect(game.getData()[0][5].id).to.be.a("number");
			expect(game.getData()[0][0].id).to.be.a("number");
			expect(game.getData()[0][0].id).to.equal(4);
		});
		it("should be able to convert data", function() {
			var oldData = [
				[
					{
						id: 0,
						value: 'A',
						whatever: 'hi'
					}, {
						id: 1,
						value: 'B'
					}
				], [
					{
						id: 2,
						value: 'X'
					}, {
						id: 3,
						value: 'Y'
					}
				]
			];
			var newData = [
				{
					id: 0,
					value: 'A',
					whatever: 'hi',
					row: 0,
					column: 0
				}, {
					id: 1,
					value: 'B',
					row: 1,
					column: 0
				}, {
					id: 2,
					value: 'X',
					row: 0,
					column: 1
				}, {
					id: 3,
					value: 'Y',
					row: 1,
					column: 1
				}
			];
			var convertedData = game.convertData(oldData);
			expect(convertedData).to.be.deep.equal(newData);
		});
		it("should check if string is a word", function(done) {
			var i = 0;
			var numberOfTests = 4;
			var trueCallback = function(success) {
				expect(success).to.be.true;
				i += 1;
				if (i === numberOfTests) {
					done();
				}
			};
			var falseCallback = function(success) {
				expect(success).to.be.false;
				i += 1;
				if (i === numberOfTests) {
					done();
				}
			};
			game.isAWord('hello', trueCallback);
			game.isAWord('elephant', trueCallback);
			game.isAWord('asdf', falseCallback);
			game.isAWord('aa', falseCallback);
		});
		it("should check if string is a prefix", function(done) {
			var i = 0;
			var numberOfTests = 3;
			var trueCallback = function(success) {
				expect(success).to.be.true;
				i += 1;
				if (i === numberOfTests) {
					done();
				}
			};
			var falseCallback = function(success) {
				expect(success).to.be.false;
				i += 1;
				if (i === numberOfTests) {
					done();
				}
			};
			game.isAPrefix('hel', trueCallback);
			game.isAPrefix('elep', trueCallback);
			game.isAPrefix('asd', falseCallback);
		});
	});
});

