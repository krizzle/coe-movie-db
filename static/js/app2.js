$(function() {
    // your code here
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/',
        apiKey = 'cae620ff3f12488013dc1c9785960efe';
    var movieid = document.getElementById("id").innerHTML;

    function initialize(callback) {
        $.get(baseUrl + 'configuration', {
            api_key: 'cae620ff3f12488013dc1c9785960efe'
        },function(res) {
            config = res;
            console.log(config);
            callback(config);
        });
    }

    function setEventHandlers(config) {
        $('#form-search').submit(function() {
            var query = $('.input-query').val();
            searchMovie(query);
            return  false;
        });

        $('.btn-now-showing').click(function() {
            loadNowShowing();
            return  false;
        });

        $('.btn-popular').click(function() {
            loadPopular();
            return  false;
        });

        $('.btn-upcoming').click(function() {
            loadUpcoming();
            return false;
        });

        $('.btn-top-rated').click(function() {
            loadTopRated();
            return  false;
        });

        displaySingle(movieid);
    }


    function searchMovie(query) {
        var searchUrl = baseUrl + 'search/movie';
        var head = "Search Results for " + query;
        $('.movies-list').html('');
        $.get(searchUrl, {
            query: query,
            api_key: apiKey
        }, function(response) {
            displayMovies(response, head);
        });
    }

    function loadNowShowing() {
        var nowShowingUrl = baseUrl + 'movie/now_playing';
        var head = "Now Showing";
        $('.movies-list').html('');
        $.get(nowShowingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response, head);
        });
    }

    function loadUpcoming() {
        var upcomingUrl = baseUrl + 'movie/upcoming';
        var head = "Upcoming";
        $('.movies-list').html('');
        $.get(upcomingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response, head);
        });
    }

    function loadPopular() {
        var popularUrl = baseUrl + 'movie/popular';
        var head = "Popular";
        $('.movies-list').html('');
        $.get(popularUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response, head);
        });
    }

    function loadTopRated() {
        var popularUrl = baseUrl + 'movie/top_rated';
        var head = "Top Rated";
        $('.movies-list').html('');
        $.get(popularUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response, head);
        });
    }

    function displaySingle(id){
        var html;
        var data = new Object();
        $('.movies-list').html('');
        var singleUrl = baseUrl + 'movie/'+id;
        $('.movies-list').html('');
        $.get(singleUrl, {
            api_key: apiKey
        }, function(response) {
            response.imageSrc = config.images.base_url + config.images.poster_sizes[3] + response.poster_path;
            var template = Handlebars.compile($('#main').html());
            var markup = template(response);
            $('.movies-list').append(markup);
        });

        var creditUrl = baseUrl + 'movie/'+id+'/credits';
        $('.movies-list').html('');
        $.get(creditUrl, {
            api_key: apiKey
        }, function(response) {
             Handlebars.registerHelper('each_upto', function(ary, max, options) {
                if(!ary || ary.length == 0){
                return options.inverse(this);
                 }
                var result = [ ];
                for(var i = 0; i < max && i < ary.length; ++i){
                 result.push(options.fn(ary[i]));
                }
                return result.join('');
            });
            var template = Handlebars.compile($('#credits-single').html());
            var markup = template(response);
            $('#poster-credits').append(markup);

            Handlebars.registerHelper('each_upto', function(ary, max, options) {
                if(!ary || ary.length == 0){
                return options.inverse(this);
                 }
                var result = [ ];
                for(var i = 0; i < max && i < ary.length; ++i){
                 result.push(options.fn(ary[i]));
                }
                return result.join('');
            });
            response.imageSrc = 'http://image.tmdb.org/t/p/w342/w8zJQuN7tzlm6FY9mfGKihxp3Cb.jpg';
            var template1 = Handlebars.compile($('#credits-hero').html());
            var markup1 = template1(response);
            $('#main-col').append(markup1);
        });


        var trailerUrl = baseUrl + 'movie/'+id+'/videos';
        $('.movies-list').html('');
        $.get(trailerUrl, {
            api_key: apiKey
        }, function(response) {
            response.vid = response.results[0].key;
            var template = Handlebars.compile($('#trailer').html());
            var markup = template(response);
            $('#main-col').append(markup);

        });

        var backdropUrl = baseUrl + 'movie/'+id+'/images';
        $('.movies-list').html('');
        $.get(backdropUrl, {
            api_key: apiKey
        }, function(response) {
            var template = Handlebars.compile($('#backdrop').html());
            var markup = template(response);
            $('#supermain').append(markup);
        });

        var similarUrl = baseUrl + 'movie/'+id+'/similar';
        $('.movies-list').html('');
        $.get(similarUrl, {
            api_key: apiKey
        }, function(response) {
            Handlebars.registerHelper('each_upto', function(ary, max, options) {
                if(!ary || ary.length == 0){
                return options.inverse(this);
                 }
                var result = [ ];
                for(var i = 0; i < max && i < ary.length; ++i){
                 result.push(options.fn(ary[i]));
                }
                return result.join('');
            });

            var template = Handlebars.compile($('#similar').html());
            var markup = template(response);
            $('#supermain').append(markup);
        });
    }


    function displayMovies(data, heads) {
            var head = {
                "heads": heads
            };
            var count=0;
            var headTemplate = Handlebars.compile($('#header').html());
            var headObj = headTemplate(head);
            $('.movies-list').append(headObj);
        data.results.forEach(function(movie) {
            var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
            movie.poster = imageSrc;
            var template = Handlebars.compile($('#movie-list').html());
            var markup = template(movie);
            $('.movies-list').append(markup);
            count++;
        });
        if(count == 0){
            var template = Handlebars.compile($('#movie-no-result').html());
            var markup = template();
            $('.movies-list').append(markup);
        }
    }

    
    initialize(setEventHandlers);

});