$(function() {
    $('body').append('<div class="todo"></div>');
    $('#add_btn').click(function() {
        var textValue = $('#text').val();
        $('div.todo').append(`<input type="checkbox" class="checkbox"><label>${textValue}</label>`);
        $('#text').val('');
    })
    $('#edit_btn').click(function() {
        $('input').removeClass('checkbox');
    });

})