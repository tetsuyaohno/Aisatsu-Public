//質問と回答をクリアする
function clearText(){
    document.getElementById('tachiba').value = '';
    document.getElementById('bamen').value = '';
    document.getElementById('chumon').value = '';
    document.getElementById('hosoku').value = '';
    document.getElementById('kaitou').textContent = '';
  }
  //クリップボードに回答をコピー
  function copyText(){
    var div = document.getElementById('kaitou');
    var preText = div.textContent;
    navigator.clipboard.writeText(preText);
  }
  /*******************************************************************
   * postメソッドで外部関数を実行
   * 引数： tachiba = 立場,　bamen = 場面,　chumon = 注文事項,　hosoku = 補足内容　
   * (JSON形式)
   */
  function executeGpt(){
    const tachiba = document.getElementById('tachiba').value;//テキストボックスの値を定数に取得
    const bamen = document.getElementById('bamen').value;//テキストボックスの値を定数に取得
    const chumon = document.getElementById('chumon').value;//テキストボックスの値を定数に取得
    const hosoku = document.getElementById('hosoku').value;//テキストボックスの値を定数に取得
    //console.log('立場：' + '' + tachiba +  '　場面:' + bamen + '　注文:' + chumon + ' 補足情報:' + hosoku);
    const url= 'https://us-central1-urinri2023.cloudfunctions.net/aisatsu';//本番
    
    const body = {tachiba: tachiba, bamen: bamen, chumon: chumon, hosoku: hosoku};
    //+++++++++　フェッチコマンドで外部関数実行　++++++++++
    fetch(url,{
      method: "POST", // or 'PUT'
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    } ).then((response) => {return response.text()})
    .then((data) => {//data　=　回答文
      //以下、コールバック処理
      var div = document.getElementById('kaitou');//回答欄id="kaitou"をオブジェクトとして取得
      data = data.replace(/。/g, '。<br>');//回答文中の「。」にHTMLタグ<br>を付加
      div.innerHTML = data;//回答欄に文字列をタグごと代入
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
