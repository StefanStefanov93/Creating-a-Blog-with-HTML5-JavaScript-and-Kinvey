(function () {

    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_r1oRCbYL"; // Place your appKey from Kinvey here...
    let appSecret = "6a61450a9b8a4c43b7757bc16e95e5ce"; // Place your appSecret from Kinvey here...
    let _guestCredentials = "b54635c4-93f2-4a91-a7fa-2aef27406caa.l9PFOyYTHNLvNTLXvfyEgEGYkIcVHVvzNuCyS38y0F4="; // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...
    //Create AuthorizationService and Requester
    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    let authService = new AuthorizationService(baseUrl, appKey, appSecret, _guestCredentials);

    authService.initAuthorizationType("Kinvey");

    let requester = new Requester(authService);

    // Create HomeView, HomeController, UserView, UserController, PostView and PostController
    let homeView = new HomeView(selector, mainContentSelector);
    let homeController = new HomeController(homeView, requester, baseUrl, appKey);

    let userView = new UserView(selector, mainContentSelector);
    let userController = new UserController(userView, requester, baseUrl, appKey);

    let postView = new PostView(mainContentSelector, selector);
    let postController = new PostController(postView, requester, baseUrl, appKey);

    let commentsView = new CommentsView(mainContentSelector, selector);
    let commentsController = new CommentsController(commentsView, requester, baseUrl, appKey);
    initEventServices();

    onRoute("#/", function () {
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
        if (authService.isLoggedIn()){
            homeController.showUserPage();
        } else {
            homeController.showGuestPage();
        }
    });

    onRoute("#/post-:id", function () {
        // Create a redirect to one of the recent posts...
        let top = $("#post-" + this.params['id']).position().top;
        $(window).scrollTop(top);
    });

    onRoute("#/login", function () {
        // Show the login page...
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        // Show the register page...
        userController.showRegisterPage(authService.isLoggedIn());
    });

    onRoute("#/logout", function () {
        // Logout the current user...
        userController.logout();
    });

    onRoute('#/posts/create', function () {
        // Show the new post page...
        let data = {
            fullName: sessionStorage['fullName']
        };
        postController.showCreatePostPage(data, authService.isLoggedIn());
    });
    onRoute('#/comments/create', function () {
        // Show the new post page...
        let data = {
            fullName: sessionStorage['fullName']
        };
        commentsController.showCreatePostComment(data, authService.isLoggedIn());
    });
    bindEventHandler('login', function (ev, data) {
        // Login the user...
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        // Register a new user...
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        // Create a new post...
        postController.createPost(data);
    });
    bindEventHandler('createComment', function (ev, data) {
        // Create a new Comment...
        commentsController.createComment(data);
    });

    run('#/');
})();
