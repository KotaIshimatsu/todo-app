$(function() {
    $('body').append('<ul class="todo"></ul>');
    $('#add_btn').click(function() {
        var textValue = $('#text').val();
        $('ul').append(`<li><input type="checkbox" class="checkbox">${textValue}</li>`);
        $('#text').val('');
    })

    $('#edit_btn').click(function() {
        $('input.checkbox').removeClass('checkbox');
    });
})