class CommentsView {
    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showCreatePostComment(data, isLoggedIn) {
        let _that = this;

        let templateUrl;

        if(isLoggedIn){
            templateUrl = "templates/form-user.html";
        } else {
            templateUrl = "templates/form-guest.html";
        }
        $.get(templateUrl, function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/create-comments.html', function (template) {
                var renderedContent = Mustache.render(template, null);
                $(_that._mainContentSelector).html(renderedContent);

                $('#author').val(data.fullName);

                $('#create-new-comment-request-button').on('click', function (ev) {
                    let author = $('#author').val();
                    let comment = $('#comment').val();
                    let date = moment().format("MMMM Do YYYY");
                    let data = {
                        author: author,
                        comment: comment,
                        date: date
                    };
                    triggerEvent('createComment', data);
                });
            });
        });

    }
}
