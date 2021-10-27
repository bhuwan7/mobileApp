"use strict";
window.addEventListener("DOMContentLoaded", 
    function() {
     // ヘッダーのテキストエフェクト
         $("header").textillate({
            loop: false, // ループのオンオフ 
            minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
            initialDelay: 2000, // 遅延時間
            autoStart: true, // アニメーションを自動的にスタート
             in: { // フェードインのエフェクトの詳細設定
             effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
             delayScale: 1.5, // 遅延時間の指数
             delay: 50, // 文字ごとの遅延時間
             sync: false, // trueはアニメーションをすべての文字に同時に適用
             shuffle: true // trueは文字を順番にではなく、ランダムに
            }
        });

     // おみくじボタン(id="btn1") ボヤァと表示させる
         $(function(){
         ScrollReveal().reveal("#btn1", { duration: 9000 });
        });
        setTimeout(
            function (){
                let popmsg = "いらっしゃい！おみくじ引いてって！";
                window.alert(popmsg);
            },
            "5000"
        );   
    }, false
);
//omikuji button.
const btn1 = document.getElementById("btn1");
btn1.addEventListener("click", 
    function() {
       //let n = Math.floor(Math.random()*3);
       //switch (n) {
       // case 0:
           // btn1.textContent = "Very Happy!!";
           // btn1.style.color = "#FF0000";
            //break;
        //case 1:
            //btn1.textContent = "Happy!!";
            //btn1.style.color = "#fff001";
            //break;
        //case 2:
            //btn1.textContent = "UnHappy!!";
           //btn1.style.color = "#261e1c";
            //break;
        //}
        const omikujiText = document.getElementById("omikujiText");
       /* let resultText = ["大吉!!!!!","吉!!!!","中吉!!!","小吉!!","末吉！","凶。。"];
        let resultColor = ["#ff0000","#c71585","#ff1493","#ff69b4","#ff8c00","#1e90ff"];
        let resultFontSize = ["60px","55px","50px","45px","40px","35px"];
        let resultMaxSpeed = [28,24,20,16,12,8];
        let resultMaxSize =[40,36,32,28,24,20];
        let resultImage = ["img/hearts.png","img/rose.png","img/rose.png","img/diamond.png","img/snowflakes.png","img/caterpillar.png"];
        let resultSound = ["sound/omikuji_sound1.mp3", "sound/omikuji_sound2.mp3", "sound/omikuji_sound2.mp3", "sound/omikuji_sound3.mp3", "sound/omikuji_sound4.mp3", "sound/omikuji_sound5.mp3"];*/
        let resultText = ["img/daikichi.png", "img/chukichi.png", "img/syokichi.png", "img/suekichi.png", "img/daikyo.png"];
        let resultMaxSpeed = [10,10,8,5,5];
        let resultMaxSize = [30,30,30,40,30];
        let resultImage = ["img/hearts.png","img/rose.png","img/diamond.png","img/snowflakes.png","img/caterpillar.png"];
        let resultSound = ["sound/omikuji_sound1.mp3", "sound/omikuji_sound2.mp3","sound/omikuji_sound3.mp3", "sound/omikuji_sound4.mp3", "sound/omikuji_sound5.mp3"];
        let n = Math.floor(Math.random()*resultText.length);
        omikujiTextImage.src = resultText[n];
        omikujiTextImage.classList.add("omikujiPaper");
        omikujiTextImage.addEventListener("animationend",
            function() {
                omikujiTextImage.classList.remove("omikujiPaper");
            },false
        );
        // snowfall stop
        $(document).snowfall("clear");
        // jQueryのsnowfall
        $(document).ready(function(){
            $(document).snowfall({
                maxSpeed : resultMaxSpeed[n], // 最大速度
                minSpeed : 1, // 最小速度
                maxSize : resultMaxSize[n], // 最大サイズ
                minSize : 1, // 最小サイズ
                image : resultImage[n]
            });
       });
       let music = new Audio(resultSound[n]);
        music.currentTime = 0;
        music.play();
    },false
);
