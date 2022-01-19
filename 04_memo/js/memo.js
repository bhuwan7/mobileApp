"use strict";
window.addEventListener("DOMContentLoaded",
    function() {
        if(typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();//Takes data from table and shows in the table.
            saveLocalStorage(); //localStorageへの保存
            delLocalStoreage();//deletes the data from the localn storage.
            allClearLocalStorage();//deletes everything from the local storage.
            selectTable();//select data
        }
    }, false
);

//2.localStorageへの保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function(e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            //value input check
            if (key=="" || value=="") {
                window.alert("Key,Memoはいずれも必須です。");
                return;
            }else{
                localStorage.setItem(key,value);
                viewStorage()//display data from local storage to table
                let w_msg = "LocalStorageに" + key + value + "を保存しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        },false
    );
};

//3.local storage　から1件削除
function delLocalStoreage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function(e) {
            e.preventDefault();
            let w_sel = "0";
            w_sel = selectRadioBtn();
            if(w_sel === "1"){
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                localStorage.removeItem(key);
                viewStorage();
                let w_msg = "LocalStorageから" + key + value + "削除 (delete) しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        },false
    )
};

//4.local storage からすべて削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e) {
            e.preventDefault();
            let w_confirm = confirm("Local Storageのデータをすべて削除(all clear) します。\nよろしいですか？");
            //when pressed OK on the confirmation messege, all the data will be deleted.
            if(w_confirm === true) {
                localStorage.clear();
                viewStorage();//takes data from local storage and shows the table.
                let w_msg = "LocalStorageのデータをすべて削除(all clear) しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        },false
    );
};
//select data
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
    function(e) {
        e.preventDefault;
        selectRadioBtn();//select data from the table.
    },false
    );
};
//select data from the table.
function selectRadioBtn() {
    let w_sel = "0";//if selscted make it 1.
    const radio1 = document.getElementsByName("radio1");
    const table1 = document.getElementById("table1");
    for(let i=0; i<radio1.length; i++){
        if(radio1[i].checked) {
            document.getElementById("textKey").value = table1.rows[i+1].cells[1].firstChild.data;
            document.getElementById("textMemo").value = table1.rows[i+1].cells[2].firstChild.data;
            return w_sel = "1";
        } 
    }
    window.alert("一つ選択(select)1してください。");
};

//display data from local storage to table
function viewStorage(){
    const list = document.getElementById("list");
    while(list.rows[0])list.deleteRow(0);

    //local storage information
    for(let i=0; i<localStorage.length; i++){
        let w_key = localStorage.key(i);
        //display local storage key
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");        
        let td3 = document.createElement("td");        
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name ='radio1' type='radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    
//sort table using jQuery plugin
//sortList: 1 = start sorting from, 2 = start sorting from 0,1 and so on.
$("#table1").tablesorter({  //tablesort add
    sortList: [[1,0]]       //tablesort add
});                         //tablesort add

$("#table1").trigger("update");//tablesort add
}

