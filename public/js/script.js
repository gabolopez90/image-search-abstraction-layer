/* global $ */
/* global location*/

$(".btn-shorten").click(function() {
    var text = $('#url-field').val();
    window.location.replace("api/imagesearch/" + text);
});

$("#history").click(function() {
    window.location.replace("history/");
});