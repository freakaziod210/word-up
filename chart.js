d3.chart('boggle-down', {
  initialize: function () {
    'use strict';

    var _Chart = this;
    _Chart.height= 800;
    var padding = 10;
    var tileSize = (_Chart.height / 6) - padding;
    var fontSize = tileSize * 0.6;
    var yPos = function(d ,i) {
      if(i >= 16) {
        return _Chart.height - tileSize - (d.row * (tileSize + padding));
      }
      else {
        return _Chart.height - tileSize + (tileSize * 0.75) - (d.row * (tileSize + padding));
      }
    };
    var xPos = function(d) { return d.column * (tileSize + padding); };
    var isInitialAnimation = true;

    var isDragging = false;
    var selectedLetters;

    this._layer = this.base.append('g');

    _Chart.layer('bars', this._layer, {
      dataBind: function (data) {
        return this.selectAll('.letterGroup')
          .data(data, function(d) {
            return d.id;
          });
      },
      insert: function () {
        return this.append('g')
	  .classed('letterGroup', true);
      }
    })
    .on('enter', function () {
      this.attr('transform', function(d) {
        return 'translate(' + xPos(d) + ',' + -(tileSize) + ')';
      });


      this.on('mousedown', function() {
          selectedLetters = [];
          isDragging = true;
        })
        .on('mouseup', function() {
          isDragging = false;
          d3.selectAll('rect').classed('selected', false);
          _Chart.trigger('wordCreated', selectedLetters);
        })
        .on('mousemove', function(d) {
          if (isDragging) {
            selectedLetters.push(d.id);
            d3.select(this).select('rect').classed('selected', true);
          }
        });

      this.append('rect')
        .attr({
          'class': 'tiles',
          'height': tileSize,
          'width': tileSize,
          'rx': 15,
          'ry': 15
        });

      this.append('text')
        .attr({
          'class': function(d) { return d.value; },
          'font-size': fontSize,
          'text-anchor': 'middle'
        });

      return this;
    })
    .on('merge', function () {
      this.transition()
        .delay(function(d) {
          if (isInitialAnimation) {
            return 100 * d.id;
          }
          else {
            return 0;
          }
         })
        .duration(750)
        .ease('bounce')
        .attr({
          'transform': function(d, i) {
            return 'translate(' + xPos(d) + ',' + yPos(d, i) + ')';
          }
        });

        isInitialAnimation = false;

      this.select('rect.tiles')
        .style({'fill': function(d) {
            return d.color;
         },
         'opacity': function(d,i) {
           if (i >= 16) {
             return 0.4;
           }
           else {
             return 1;
           }
         }
        });

      this.select('text')
          .style({
            'fill': '#fff'
          })
          .attr({
            'dy': tileSize * 0.65,
            'dx': tileSize * 0.5
          })
          .text(function(d) { return d.value; });
      return this;
    })
    .on('exit', function () {

      this.transition()
      .duration(750)
      .attr({
        'transform': function(d, i) {
            return 'translate(' + (xPos(d) - tileSize * 0.5) + ',' + ( yPos(d, i) + (tileSize * 1.5) ) + '), rotate( 20 )';
          }
      })
      .style('opacity', 0)
      .remove();

      return this;
    });
  },

  height: function(value) {
    this.height = value;
    return this;
  }
});

