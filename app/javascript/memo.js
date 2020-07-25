function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
                          // XHRを初期化する記述をしている
    XHR.open("POST", "/posts", true);
                          // 返却されるデータ形式をJSONに指定している
    XHR.responseType = "json";
                          // メモ投稿のフォームに入力された情報を送信している
    XHR.send(formData);
                          // サーバーから返却されたデータを受け取り、HTMLのメモ部分を描画する処理
    XHR.onload = () => {
                          // レスポンスとして返却されたメモのレコードデータを取得している
      const item = XHR.response.post;
                          // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得している
      const list = document.getElementById("list");
                          // メモの入力フォームをリセットするためにformTextを取得している
      const formText = document.getElementById("content");
                          // メモとして描画する部分のHTMLを定義している
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時:${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
          </div>`;
                          // listという要素に対して、insertAdjacentHTMLでHTMLを追加する
                          // 第一引数、afterendでlistの要素直後に挿入できる
      list.insertAdjacentHTML("afterend", HTML);
                          // メモの入力フォームに入力されたままの文字をリセットしている・正確には空の文字列に上書きされるような仕組み
      formText.value = "";
                          // 200以外のHTTPステータスが返された場合の処理
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    };

    XHR.onerror = function() {
      alert("Request failed");
    };

    e.preventDefault();
  })
}
window.addEventListener("load", memo);