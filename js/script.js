$(function() {
    $('body').append('<div></div>');
    $('#button-add').click(function() {
        var textValue = $('#text').val();
        $('ul').append(`<input type="checkbox"><label>${textValue}</label>`);
        $('#text').val('');
    })
})