$(function() {
    // your code here
    var header = "Now Showing";
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/',
        apiKey = 'e50a6caece56dc3ee80e5bf63491fdfd';
    var cl = 'btn-sel';
    var num = 0;
    var clFull = cl+num;
    var idArr = [];
    var con = 0;



    function initialize(callback) {
        $.get(baseUrl + 'configuration', {
            api_key: 'e50a6caece56dc3ee80e5bf63491fdfd'
        },function(res) {
            config = res;
            console.log(config);
            callback(config);
        });
    }
    function setEventHandlers(config) {
        $('#form-search').submit(function() {
            var query = $('.input-query').val();
            header = "Search Results";
            searchMovie(query);
            return  false;
        });

        $('.btn-now-showing').click(function() {
            header = "Now Showing";
            loadNowShowing();
            return  false;
        });

        $('.btn-up-coming').click(function() {
            header = "Upcoming";
            loadUpComing();
            return  false;
        });

        $('.btn-popular').click(function() {
            header = "Popular";
            loadPopular();
            return  false;
        });
        $('.btn-top-rated').click(function() {
            header = "Top Rated";
            loadTopRated();
            return false;
        });
    loadNowShowing();
    }

    function searchMovie(query) {
        var searchUrl = baseUrl + 'search/movie';
        idArr = [];
        $('.movies-list').html('');
        $('#cont').html('');
        $.get(searchUrl, {
            query: query,
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function displayMovies(data) {
            num = 0;
            clFull = cl + num;
            var htmlHead = [
            '<div class="page-header">',
                '<h1>'+header+'</h1>',
            '</div>'   
            ];
            $('.movies-list').append($(htmlHead.join('')));


        data.results.forEach(function(movie) {
            var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
            var htmlStr = [
                            '<div class="col-md-4 portfolio-item">',
                                '<a href="javascript:void(0)" class="'+clFull+'">',
                                    '<img class="img-responsive" src="' + imageSrc + '" alt="">',
                                '</a>',
                                '<h3>',
                                    '<center><a href="javascript:void(0)" class="'+clFull+'">' + movie.title +'</a></center>',
                                '</h3>',
                            '</div>'
                            ];
            idArr.push(movie.id);
            num++;
            clFull = cl+num;
            $('.movies-list').append($(htmlStr.join('')));
        });
            $('.btn-sel0').click(function() {
            displaySingle(0);
            return false;
        });
            $('.btn-sel1').click(function() {
            displaySingle(1);
            return false;
        });
            $('.btn-sel2').click(function() {
            displaySingle(2);
            return false;
        });
            $('.btn-sel3').click(function() {
            displaySingle(3);
            return false;
        });
            $('.btn-sel4').click(function() {
            displaySingle(4);
            return false;
        });
            $('.btn-sel5').click(function() {
            displaySingle(5);
            return false;
        });
            $('.btn-sel6').click(function() {
            displaySingle(6);
            return false;
        });
            $('.btn-sel7').click(function() {
            displaySingle(7);
            return false;
        });
            $('.btn-sel8').click(function() {
            displaySingle(8);
            return false;
        });
            $('.btn-sel9').click(function() {
            displaySingle(9);
            return false;
        });
            $('.btn-sel10').click(function() {
            displaySingle(10);
            return false;
        });
            $('.btn-sel11').click(function() {
            displaySingle(11);
            return false;
        });
            $('.btn-sel12').click(function() {
            displaySingle(12);
            return false;
        });
            $('.btn-sel13').click(function() {
            displaySingle(13);
            return false;
        });
            $('.btn-sel14').click(function() {
            displaySingle(14);
            return false;
        });
            $('.btn-sel15').click(function() {
            displaySingle(15);
            return false;
        });
            $('.btn-sel16').click(function() {
            displaySingle(16);
            return false;
        });
            $('.btn-sel17').click(function() {
            displaySingle(17);
            return false;
        });
            $('.btn-sel18').click(function() {
            displaySingle(18);
            return false;
        });
            $('.btn-sel19').click(function() {
            displaySingle(19);
            return false;
        });
    }

    function displaySingle(benok){
        con = idArr[benok];
        var displaySoloUrl = baseUrl + 'movie/'+idArr[benok];
        idArr = [];
        var displayVideoUrl = baseUrl + 'movie/'+con+'/videos';
        $.get(displayVideoUrl, {
            api_key: apiKey
        }, function(response) {
            getVid(response);
        });
        var displayCastUrl = baseUrl + 'movie/'+con+'/credits';
        $.get(displayCastUrl, {
            api_key: apiKey
        }, function(response) {
            getCast(response);
        });
        var displaySimilarUrl = baseUrl + 'movie/'+con+'/similar';
        $.get(displaySimilarUrl, {
            api_key: apiKey
        }, function(response) {
            getSimilar(response);
        });
        $('.movies-list').html('');
        $('#cont').html('');
        $.get(displaySoloUrl, {
            api_key: apiKey
        }, function(response) {
            displaySolo(response);
        });
    }
    var a=[];
    var b=[];
    var c=[];
    var d=[];
    var e=[];
    var f=[];
    function getVid(help){
        help.results.forEach(function(movie) {
            a.push(movie.key);

        });
    }
    function getCast(help){
        help.cast.forEach(function(movie) {
            b.push(movie.name);
            c.push(movie.character);
        });
    }

    function getSimilar(help){
        var imageSrc='';
        help.results.forEach(function(movie) {
            imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
            f.push(imageSrc);
            idArr.push(movie.id);
        });
        console.log(idArr);
    }

    function displaySolo(data){
        var htmkStr = [
        '<div class="row">',
            '<div class="col-lg-12">',
                '<h1 class="page-header">'+data.original_title,
                '</h1>',
            '</div>',
        '</div>',
        '<div class="row">',
            '<div class="col-md-8">',
                '<embed width="100%" height="450" src="http://www.youtube.com/v/'+a[0]+'" type="application/x-shockwave-flash">',
            '</div>',
            '<div class="col-md-4">',
                '<h3>Synopsis</h3>',
                '<p>'+data.overview+'</p>',
                '<h3>Casts</h3>',
                '<ul>',
                    '<li>'+b[0]+' as '+c[0]+'</li>',
                    '<li>'+b[1]+' as '+c[1]+'</li>',
                    '<li>'+b[2]+' as '+c[2]+'</li>',
                    '<li>'+b[3]+' as '+c[3]+'</li>',
                '</ul>',
            '</div>',
        '</div>',
        '<div class="row">',
            '<div class="col-lg-12">',
                '<h3 class="page-header">Similar Movies</h3>',
            '</div>',
            '<div class="col-sm-3 col-xs-6">',
                '<a href="javascript:void(0)" class="sim1">',
                    '<img class="img-responsive portfolio-item" src="'+f[3]+' alt="">',
                '</a>',
            '</div>',
            '<div class="col-sm-3 col-xs-6">',
                '<a href="javascript:void(0)" class="sim2">',
                    '<img class="img-responsive portfolio-item" src="'+f[4]+' alt="">',
                '</a>',
            '</div>',
            '<div class="col-sm-3 col-xs-6">',
                '<a href="javascript:void(0)" class="sim3">',
                    '<img class="img-responsive portfolio-item" src="'+f[5]+' alt="">',
                '</a>',
            '</div>',
            '<div class="col-sm-3 col-xs-6">',
                '<a href="javascript:void(0)" class="sim4">',
                    '<img class="img-responsive portfolio-item" src="'+f[6]+' alt="">',
                '</a>',
            '</div>',   
        '</div>'
        ];
        $('#cont').append($(htmkStr.join('')));
            a = [];
            b = [];
            c = [];
            d = [];
            e = [];
            f = [];
        $('.sim1').click(function() {
            displaySingle(3);
            return false;
        });
            $('.sim2').click(function() {
            displaySingle(4);
            return false;
        });
            $('.sim3').click(function() {
            displaySingle(5);
            return false;
        });
            $('.sim4').click(function() {
            displaySingle(6);
            return false;
        });
    }



    function loadNowShowing() {
        var nowShowingUrl = baseUrl + 'movie/now_playing';
        idArr = [];
        $('.movies-list').html('');
        $('#cont').html('');
        $.get(nowShowingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function loadUpComing() {
        var upComingUrl = baseUrl + 'movie/upcoming';
        idArr = [];
        $('.movies-list').html('');
        $('#cont').html('');
        $.get(upComingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function loadPopular() {
        var popularUrl = baseUrl + 'movie/popular';
        idArr = [];
        $('.movies-list').html('');
        $('#cont').html('');
        $.get(popularUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function loadTopRated() {
        var topRatedUrl = baseUrl + 'movie/top_rated';
        idArr = [];
        $('.movies-list').html('');
        $('#cont').html('');
        $.get(topRatedUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
    initialize(setEventHandlers);
});
