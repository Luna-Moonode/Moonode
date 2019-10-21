function include(str) {
    var new_element = document.createElement('script');
    new_element.setAttribute('type', 'text/javascript');
    new_element.setAttribute('src', ('./JS/' + str + '.js'));
    document.body.appendChild(new_element);
}

include("videos");
include("zhibo");
include("tuiguang");
include("rightNav");
include("head");