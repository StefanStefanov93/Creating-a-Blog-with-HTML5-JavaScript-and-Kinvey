class CommentsController {
    constructor(commentsView, requester, baseUrl, appKey) {
        this._commentsView = commentsView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/comments/";
    }
    showCreatePostComment(data, isLoggedIn) {
        this._commentsView.showCreatePostComment(data, isLoggedIn);
    }
    createComment(requestData) {
        let requestUrl = this._baseServiceUrl;

        this._requester.post(requestUrl, requestData,
            function successCallBack(data) {
                showPopup('success', 'You have successfully created a new comment.');
                redirectUrl("#/");
            },
            function errorCallBack(data) {
                showPopup('error', "An error has occured while attempting" + "to create a new comment.");
            });
    }
}
