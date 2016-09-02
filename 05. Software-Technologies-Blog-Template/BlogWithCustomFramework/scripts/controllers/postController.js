/**
 * Created by PC on 7/5/2016.
 */
class PostController {
    constructor(postView, requester, baseUrl, appKey) {
        this._postView = postView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts/";
    }
    showCreatePostPage(data, isLoggedIn) {
        this._postView.showCreatePostPage(data, isLoggedIn);
    }
    createPost(requestData) {
        if(requestData.title.length < 10){
            showPopup('error', 'Post title must consist of atleast 10 symbols.');
            return;
        }
        if(requestData.content.length < 50){
            showPopup('error', 'Post content must consist of atleast 50 symbols.');
            return;
        }
        let requestUrl = this._baseServiceUrl;

        this._requester.post(requestUrl, requestData,
        function successCallBack(data) {
            showPopup('success', 'You have successfully created a new post.');
            redirectUrl("#/");
        },
        function errorCallBack(data) {
            showPopup('error', "An error has occured while attempting" + "to create a new post.");
        });
    }
}