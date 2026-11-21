# いちすが研究所

トップページと「今日の御神籤」を静的ファイルで配信します。両ページの先頭にある CSP は GitHub Pages でも有効です。トップでは手動設置した Cloudflare Web Analytics に必要なスクリプトと通信先を許可しています。

## 配信時のセキュリティヘッダー

GitHub Pages 単体では、このリポジトリの `_headers` は応答ヘッダーに反映されません。埋め込みを禁止する `frame-ancestors` と MIME 型の推測を防ぐ `nosniff` は HTTP 応答での設定が必要です。

- 現在のサイトをリバースプロキシ経由で配信する場合は、ichisuga.com の応答に `_headers` の3項目を設定してください。すでに CSP ヘッダーを運用している場合は既存ポリシーに `frame-ancestors 'none'` を追加します。HTML 側の CSP と応答ヘッダーの CSP は両方が適用されます。
- Cloudflare Pages で静的配信する場合は、公開ディレクトリのルートにある `_headers` が適用されます。Cloudflare Web Analytics の利用だけでは応答ヘッダーは変わりません。

反映後は `curl -sSI https://ichisuga.com/index.html` と `curl -sSI https://ichisuga.com/omikuji/omikuji-index.html` で3項目を確認できます。
