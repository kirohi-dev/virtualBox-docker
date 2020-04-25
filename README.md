# README

docker + virtualBoxの汎用的な実装環境を構築する。
virtualBoxはvagrantで作成する。
cloudの環境はterrarformで作成する。

## 参考資料

### docker + virtualBox

https://qiita.com/yuki_ycino/items/cb21cf91a39ddd61f484
を参考に作る。

### 仮想環境内のコードをホスト上のエディタから編集する
https://tech.recruit-mp.co.jp/dev-tools/vagrant-rsync-synced-folder/

https://www.to-r.net/media/docer-cra/
https://mutagen.io/documentation/synchronization/ignores

### 注意
`vagrant halt` で必ずvmを終了する
MacのクラッシュやVMの正常な終了が行えなかった際には `$ mutagen sync list` でセッションを確認し、不要なセッションについては `$ mutagen sync terminate {session_id}` で削除するようにしてください。

### github action
https://www.to-r.net/media/wp-vagrant-docker/

### vscodeの編集
https://qiita.com/anfangd/items/63ab95a2005cb2d1f196

## リモート環境開発を行う方法

1. vagrantでvirtualBoxを起動する
2. vm上でdockerを起動
3. ~~vscodeのremote develop extensionを使ってdocker内に入る。~~
4. これダメっぽい（もしかしたらできるかもだけど。。。）

### 多段SSHで接続してvs codeの Remote SSHを使った方が安定しそう
1. vagrantでvirtualBoxを起動する
2. vm上でdockerを起動
3. sshの設定をする

https://qiita.com/anfangd/items/63ab95a2005cb2d1f196

これで各環境で行われた変更が反映される。

### dockerの中では開発しない
1. vagrant up
2. vagrantの中でdockerをvolumeで共有して起動
3. node_modulesなどはvmの中だけに存在する

### 開発を終了するとき

1. vm上のdockerを停止 `docker-compose stop`
2. vagrant上のvirtualBoxを停止 `vagrant halt`

### 注意
gitへの反映はローカルで行う。

### DB
https://qiita.com/kikuchi_kentaro/items/4565292affaf2e521e0f

## 今後環境構築する時

### 1. vagrantを使って以下の条件のvmを起動
- private_network
- mutagenを使って双方向の同期
- docker,docker-composeのインストール
- synced_foldrを使ってフォルダの同期
- node_modulesも同期できるようにした方がいい(結局永続化しないといけない)

### 2. Dockerfile,docker-composeの作成
- ドメイン毎にベース環境をDockerfileで作る
- それぞれのドメインディレクトリ毎にアプリを共有する
- `RUN`プロパティを使うときは`--no-cache`を使うといい
- 初期はポート受付してないと思うので、`tty: true`をつけてコンテナを起動し続けるようにする

### 注意
docker-composeでvolumesをした場合、node_modulesもマウントされるので、ローカル側にnode_modulesが無いと `cannot command`となる。
そのため、ローカル側で `yarn`などをしないといけないがいけてない。
開発中は `tty: true`で動かしnode_modulesは同期するように開発する。
vagrantを更新する時は `vagrant halt && vagrant destroy -f && vagrant up` 作り直しになる。

## yarnをqiitaにインストールする方法

$ curl -o- -L https://yarnpkg.com/install.sh | bash

----------ここから-----------
実際にやった方法

## 1. vagrantのインストール
## 2. vagrantを使ってvirtualBoxの起動

- ubuntu
- docker,docker-compose
- できればnode,yarn
- mutagen（node-modulesの共有はignoreする）
- private_networkでnetworkを構築

## 2. docker
- 普通にdocker,docker-composeを作る
- volumesでそれぞれのコンテナとマウントする
- exportとportでportを指定する
- 先にpackage.jsonをインストールする
- プレビューできない時は `tty: true`が原因かも

## 開発方法

1. `vagrant up`
2. `vs code`の `remote ssh`でvagrant内に接続する
3. `yarn install`などでpackageをインストール
4. vm内に入って`docker-compose build && docker-compose up`
5. vagrantのparivate_networkとdocker-composeで指定したportに接続
6. 普通に開発
