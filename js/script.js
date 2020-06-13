var CATEGORY = [
    '',
    '買い物',
    '仕事',
    '勉強',
    'プライベート',
];

function renderCategoryList() {
    CATEGORY.map(function(category) {
        var label = category ? category : '選択してください';
        $('#category').append(`<option value=${category}>${label}</option>`);
        $('#select_search').append(`<option value=${category}>${label}</option>`);
    });
}

function renderListElement(textValue) {
    var selectedCategoryName = $('#category').val();
    return (
        `
            <li class="todoItem">
                <input
                    type="checkbox"
                    class="checkbox"
                    onclick="onClickCheckbox()"
                >
                <span class="todoLabel">${textValue}</span>
                <span class="categoryName">
                    ${selectedCategoryName}
                </span>
            </li>
        `
    );
}

function changeCategorySearch() {
    var searchWord = $('#select_search').val();
    var $words = $('.categoryName');
    $('.todoItem').show();
    for (var i = 0; i <= $words.length - 1; i++) {
      var $word = $words[i];
      var word = $($word).text();
      if (word.indexOf(searchWord) === -1) {
        $('.todoItem').eq(i).hide();
      }
    }
}

function onClickCheckbox() {
    var $checkBox = $('.todoItem > input');
    var isChecked = false;
    $checkBox.each(function(_index, value) {
        if ($(value).prop('checked')) {
            isChecked = true;
        }
    });

    if (isChecked) {
        $('ul:not(:animated).dropdwn').slideDown(300);  
    } else {
        $('.dropdwn').hide();
    }
}

function onClickCategoryDropdown(event) {
    event.preventDefault();
    var target = event.target;
    var $value = $(target).text();
    console.log($value);
    console.log($('.todoItem input:checked').parent());
}

$(function () {
    renderCategoryList();

    $('#add_btn').click(function () {
        var textValue = $('#text').val();
        var element = renderListElement(textValue);
        $('.todo').append(element);
        $('#text').val('');
    });

    $('#edit_btn').click(function () {
        $('input.checkbox').removeClass('checkbox');
    });

    $('#delete_btn').click(function () {
        $.each($('li input:checked'), function (_index, element) {
            $(element).parent().remove();
        });
    });

    $('#select_search').change(function() {
        changeCategorySearch();
    });
});
