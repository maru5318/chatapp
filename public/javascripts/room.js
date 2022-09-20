'use strict';

//投稿のソート関数
function sort(){
    //投稿のソート
    const publish_html = document.getElementById('thread');
    let string = publish_html.innerHTML;
    let publish_list = string.split('</p>');
    document.querySelector('#thread').innerHTML = '';
    for(let i = 0 ; i < publish_list.length ; i++){
        $('#thread').prepend(publish_list[i] + '</p>');
    }
    //ボタンの表示切り替え
    const btn_value = $('#room-sort_button').val();
    if (btn_value === '古い順'){
        $('#room-sort_button').val('新しい順');
    }else if (btn_value === '新しい順'){
        $('#room-sort_button').val('古い順');
    }
}

//一時休止関数
function rest(){
    let text = document.getElementsByClassName('rest')[0];
    text.innerHTML = '<input type="button" value="再開" class="common-button room-rest_button btn btn-primary card-text form-control" onclick="resume();">';
    socket.disconnect();
}

//再開関数
function resume(){
    let text = document.getElementsByClassName('rest')[0];
    text.innerHTML = '<input type="button" value="一時休止" class="common-button room-rest_button btn btn-primary card-text form-control" onclick="rest();">';
    socket.connect();
}

function open_users() {
    document.getElementById('room-user_list').className = "col-md-2 room-user_list md-visible";
    document.getElementById('room-md-userList_bg').className = "room-md-userList_bg md-visible";
}

function close_users() {
    document.getElementById('room-user_list').className = "col-md-2 room-user_list md-hidden";
    document.getElementById('room-md-userList_bg').className = "room-md-userList_bg md-hidden";
}