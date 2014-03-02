(function() {
  var app;
  window.log = function() {
    if (this.console && this.console.log) {
      return console.log.apply(console, Array.prototype.slice.call(arguments));
    }
  };
  app = {};
  app.sections = [
    {
      type: 'text',
      value: '<h1>Sparkline theory and practice Edward Tufte</h1>'
    }, {
      type: 'text',
      value: '<p>A sparkline is a small intense, simple, word-sized graphic with typographic resolution. Sparklines mean that graphics are no longer cartoonish special occasions with captions and boxes, but rather sparkline graphic can be everywhere a word or number can be: embedded in a sentence, table, headline, map, spreadsheet, graphic. From Edward Tufte\'s book <i>Beautiful Evidence</i>.</p>\n<p><i>New developments in sparklines: November 2013.</i></p>\n<p><font size="+1"><b><i>Diluting Perceptual Cluster/Streak Bias:\nInformal, Inline, Interocular Trauma Tests</i></b></font>\n</p>\n<p>\nWhen people look at random number tables, they sees all kinds of clusters\nand streaks (in a completely random set of data). Similarly, when people are\nasked generate a random series of bits, they generate too few long streaks\n(such as 6 identical bits a row), because their model of what is random\ngreatly underestimates the amount of streakiness in truly random data.\n</p><p>Sports and election reporters are notorious for their\nstreak/cluster/momentum/turning-point/trendspotting\nnarrative over-reach. xkcd did this wonderful critique:</p>'
    }, {
      type: 'image',
      value: 'http://imgs.xkcd.com/comics/sports.png'
    }, {
      type: 'text',
      value: '<p>\nTo dilute streak-guessing, randomize on time over the same data,\nand compare random streaks with the observed data.\nBelow, the top sparkline shows the season\'s win-loss sequence\n(the little horizontal line = home games, no line = road games).\nWeighting by overall record of wins/losses and home/road effects\nyields ten random sparklines. Hard to see the difference between\nreal and random.</p><p>\n\nThe 10 random sparkline sequences can be regenerated again and\nagain by, oddly enough, clicking on "Regenerate random seasons."\nThis is looking a bit like bootstrap calculation. For the real and amazing\nbootstrap, applied to data graphics and contour lines, see Persi Diaconis\nand Bradley Efron, <a target="_blank" href="http://statistics.stanford.edu/~ckirby/techreports/BIO/BIO%2083.pdf">"Computer Intensive Methods in Statistics."</a>\n</p><p>The test of the 10 randomized sparklines vs. the actual data is an\n"Interocular Trauma Test" because the comparison hits the analyst right\nbetween the eyes. This little randomization check-up, which can be repeated\nagain and again, is seen by the analyst at the very moment of making\ninferences based on a statistical graphic of observed data.\n</p>'
    }, {
      type: 'text',
      value: '<iframe style="border: 0; height: 800px; width: 800px" scrolling="no" src="http://adamschwartz.co/et-notebooks/sparklines-randomized/"></iframe>'
    }, {
      type: 'text',
      value: '<p>\nConsuming a horizontal length of only 14 letterspaces, each sparkline\nin the big table above provides a look at the price and the changes in\nprice for every day for years, and the overall time pattern. <i>This financial\ntable reports 24 numbers accurate to 5 significant digits; the accompanying\nsparklines show about 14,000 numbers readable from 1 to 2 significant digits.\nThe idea is to be approximately right rather than exactly wrong.</i>&nbsp;<font size="-1">1</font>\n</p>\n\n<p>By showing recent change in relation to many past changes, sparklines\nprovide a context for nuanced analysis—and, one hopes, better decisions.\nMoreover, the year-long daily history reduces <i>recency bias,</i> the persistent\nand widespread over-weighting of recent events in making decisions.\nTables sometimes reinforce recency bias by showing only current levels\nor recent changes; sparklines improve the attention span of tables.\n</p>\n\n<p>Tables of numbers attain maximum densities of only 300 characters per\nsquare inch or 50 characters per square centimeter. In contrast, graphical\ndisplays have far greater resolutions; a cartographer notes "the resolving\npower of the eye enables it to differentiate to 0.1 mm where provoked to\ndo so."&nbsp;<font size="-1">2</font> &nbsp;Distinctions at 0.1 mm mean 250 per linear inch, which implies\n60,000 per square inch or 10,000 per square centimeter, which is plenty.</p>'
    }
  ];
  app.init = function() {
    app.setupDragAndDropListener();
    return app.render();
  };
  app.setupImageListener = function() {
    return chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
      return log(request.urls);
    });
  };
  app.setupDragAndDropListener = function() {
    return document.body.ondrop = function(e) {
      var file, files, reader, _i, _len, _ref, _ref2;
      log('asd');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
        files = e.dataTransfer.files;
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          if (((_ref = file.type) != null ? (_ref2 = _ref.split('\/')) != null ? _ref2[0].toLowerCase() : void 0 : void 0) === 'image') {
            reader = new FileReader();
            reader.onload = function(e) {
              return log(e.target.result);
            };
            reader.readAsDataURL(file);
          }
        }
      }
      e.preventDefault();
      return false;
      document.body.mouseup = function(e) {
        log('asdasdas');
        return $('body').removeClass('dragenter dragover');
      };
      document.body.ondragleave = function(e) {
        log('asdasdasasdasd');
        return $('body').removeClass('dragenter dragover');
      };
      document.body.ondragenter = function(e) {
        log('asda');
        $('body').addClass('dragenter');
        e.dataTransfer.dropEffect = 'move';
        e.preventDefault();
        return false;
      };
      return document.body.ondragover = function(e) {
        log('asdaasdasdasdasdasdasdsd');
        $('body').addClass('dragover');
        e.dataTransfer.dropEffect = 'move';
        e.preventDefault();
        return false;
      };
    };
  };
  app.render = function() {
    var editor, html, section, _i, _len, _ref;
    $('body').removeClass('dragenter dragover');
    _ref = app.sections;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      section = _ref[_i];
      html = section.value;
      if (section.type === 'image') {
        html = "<img src=\"" + section.value + "\">";
      }
      $('.sections').append("<div class=\"section\" data-type=\"" + section.type + "\">\n    <div class=\"section-helpers\">\n        <div class=\"section-drag-handle\"></div>\n    </div>\n    <div class=\"section-content\">\n        " + html + "\n    </div>\n</div>");
    }
    editor = new MediumEditor('.section[data-type="text"]', {
      buttons: ['bold', 'italic', 'quote'],
      firstHeader: 'h1',
      secondHeader: 'h2',
      targetBlank: true
    });
    $('.sections').sortable({
      handle: '.section-drag-handle',
      axis: 'y',
      start: function(e, ui) {
        return ui.placeholder.height(ui.helper.height());
      }
    });
    return $('.page-scroll').scroll(function() {
      return $('body').scroll();
    });
  };
  app.saveExport = function() {
    document.body.classList.add('capturing');
    return setTimeout(function() {
      chrome.runtime.sendMessage({
        type: 'screenshot'
      });
      return setTimeout(function() {
        return document.body.classList.remove('capturing');
      }, 0);
    }, 300);
  };
  setTimeout(function() {
    return app.init();
  }, 0);
}).call(this);
