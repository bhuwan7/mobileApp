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
                let w_confirm = window.confirm("LocalStorageに\n[" + key + " " + value + "]\nを保存しますか？");
                if(w_confirm === true){
                    localStorage.setItem(key,value);
                    viewStorage()//display data from local storage to table
                    let w_msg = "LocalStorageに\n[" + key + " " + value + "]\nを保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }//version-up1 add
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
            w_sel = selectCheckBox(); //while choosing data from the table the selectBtn changes into selectCheckBox.
            if(w_sel === "1"){
                    const key = document.getElementById("textKey").value;
                    const value = document.getElementById("textMemo").value;
                    let w_confirm = window.confirm("LocalStorage から\n[" + key + " " + value + "]\nを削除(delete)しますか？");
                    if(w_confirm === true){
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg = "LocalStorageから\n[" + key + " " + value + "]\n削除 (delete) しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }//version-up1 add
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
        selectCheckBox();//select data from the table with checkBox.
    },false
    );
};
//select data from the table.
function selectCheckBox() { //version-up2 chg: selectRadioBtn ==> selectCheckBox
    let w_sel = "0";//if selscted make it 1.
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = ""; //work version-up2 add
    let w_textMemo = ""; //work version-up2 add
    for(let i=0; i<chkbox1.length; i++){ //version-up2 chg: radio1 ==> chkbox1
        if(chkbox1[i].checked) {
            if(w_cnt === 0){
                w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
               // return w_sel = "1";
            }
            w_cnt++; //counts the number of checkbox selected.
        } 
    }
     document.getElementById("textKey").value = w_textKey;
     document.getElementById("textMemo").value = w_textMemo;
    if(w_cnt === 1) {
        return w_sel="1";
    }else{
        window.alert("一つ選択(select)してください。");
    }
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

        td1.innerHTML = "<input name ='chkbox1' type='checkbox'>";
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

