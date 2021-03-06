var CATEGORY = [
    '',
    '買い物',
    '仕事',
    '勉強',
    'プライベート',
];

var STORAGE_KEY = 'todo_app';

function renderCategoryList() {
    CATEGORY.map(function(category) {
        var label = category ? category : '選択してください';
        $('#category').append(`<option value=${category}>${label}</option>`);
        $('#select_search').append(`<option value=${category}>${label}</option>`);
        if (category === '') {
            return null;
        }
        $('.dropdwn').append(
            `
                <li onclick="onClickCategoryDropdown(event)">
                    <a href="#">
                        ${category}
                    </a>
                </li>
            `
        );
    });
}

function renderListElement(textValue, selectedCategoryName) {
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
    var $checkedTodoElementList = $('.todoItem input:checked').parent();
    $checkedTodoElementList.each(function(_index, element) {
        $(element).children('.categoryName').text($value);
        rewriteCategoryFromLoclStorage($value);
    });
    $('.dropdwn').hide();
}

function sampleHandleLocalStorage() {
    var localStorage = window.localStorage;
    localStorage.setItem('label', 'hoge');
    var storagedLabel = localStorage.getItem('label');
    console.log(storagedLabel);
}

function saveToLocalStorage(todoLabel, categoryName) {
    var localStorage = window.localStorage;
    var todoItem = {
        todoLabel: todoLabel,
        categoryName: categoryName,
    };
    var savedItem = localStorage.getItem(STORAGE_KEY);
    var itemList = [];

    if (savedItem === null) {
        // localStorageにアイテムが無い(null) ＝ 初めて使う場合
        itemList = [todoItem];
    } else {
        // localStorageにアイテムがある ＝ 2回目以降に使う場合
        // localStorageに保存済みのデータは、文字列になっている
        // 文字列から配列に戻す
        itemList = JSON.parse(savedItem);
        itemList.push(todoItem);
    }
    // localStorageにデータを保存する際は、データを文字列に変換しないといけない
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itemList));
}

function renderItemFromLocalStorage() {
    var renderItem = localStorage.getItem(STORAGE_KEY);
    if (renderItem !== null) {
        var array = JSON.parse(renderItem);
        $.each(array, function(_index, element) {
            $('.todo').append(renderListElement(element.todoLabel, element.categoryName));
        })
    }
}

function deleteItemToLocalStorage(todoLabel, categoryName) {
    var deleteItemList = JSON.parse(localStorage.getItem(STORAGE_KEY));
    // todoLabelとcategoryName両方が一致したら、対象のTODOとみなす
    // 本当は、todoにId等を設定しておくのが望ましい
    var index = deleteItemList.findIndex(function(item) {
        return item.todoLabel === todoLabel.trim() 
            && item.categoryName === categoryName.trim();
    });

    if (index < 0) {
        return;
    }

    // 配列から、該当の要素を削除
    deleteItemList.splice(index, 1);
    // localStorageにデータを保存する際は、データを文字列に変換しないといけない
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deleteItemList));
}

function rewriteCategoryFromLoclStorage(categoryName) {
    var rewriteItemList = JSON.parse(localeStorage.getItem(STORAGE_KEY));
    var index = rewriteItemList.findIndex(function(item) {
        return item.categoryName !== categoryName.trim();
    });
    

    localStorage.setItem(STORAGE_KEY, JSON.stringify(rewriteItemList));
}

$(function () {
    renderCategoryList();
    
    renderItemFromLocalStorage();

    $('#add_btn').click(function () {
        var textValue = $('#text').val();
        var categoryName = $('#category').val();
        var element = renderListElement(textValue, categoryName);
        $('.todo').append(element);
        $('#text').val('');
        saveToLocalStorage(textValue, categoryName);
    });

    $('#edit_btn').click(function () {
        $('input.checkbox').removeClass('checkbox');
    });

    $('#delete_btn').click(function () {
        $.each($('li input:checked'), function (_index, element) {
            $(element).parent().remove();
            // 削除するTODOのtodoLabelとcategoryNameを抽出
            var $todoLabel = $(element).parent().children('.todoLabel').text();
            var $categoryName = $(element).parent().children('.categoryName').text();
            deleteItemToLocalStorage($todoLabel, $categoryName);
        });
    });

    $('#select_search').change(function() {
        changeCategorySearch();
    });
});
