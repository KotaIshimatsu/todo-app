function renderListElement(textValue) {
    return (
        `
            <li>
                <input
                    type="checkbox"
                    class="checkbox"
                >
                ${textValue}
                
            </li>
        `
    );
}

$(function () {
    $('#add_btn').click(function () {
        var textValue = $('#text').val();
        var element = renderListElement(textValue);
        $('ul').append(element);
        $('#text').val('');

        var selectedCategoryName = $('#category').val();
        $('ul').append(`<span class="categoryName">${selectedCategoryName}</span>`);

    });

    $('#edit_btn').click(function () {
        $('input.checkbox').removeClass('checkbox');
    });

    $('#delete_btn').click(function () {
        $.each($('li input:checked'), function (_index, element) {
            $(element).parent().remove();
        });
    });
});