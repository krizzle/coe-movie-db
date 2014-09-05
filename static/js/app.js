$(function() {
    // your code here
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/',
        apiKey = 'cae620ff3f12488013dc1c9785960efe';
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
        loadNowShowing();
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
        var topRatedUrl = baseUrl + 'movie/top_rated';
        var head = "Top Rated"
        $('.movies-list').html('');
        $.get(topRatedUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response, head);
        });
    }


    function displayMovies(data, heads) {
            var count = 0;
            var head = {
                "heads": heads
            };
            var headTemplate = Handlebars.compile($('#header').html());
            var headObj = headTemplate(head);
            $('.movies-list').append(headObj);

        data.results.forEach(function(movie) {
            var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
            movie.poster = imageSrc;
            var template = Handlebars.compile($('#movie-list').html());
            var markup = template(movie);
            $('.movies-list').append(markup);
            console.log(movie);
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