# README

docker + virtualBoxの汎用的な実装環境を構築する。
virtualBoxはvagrantで作成する。
cloudの環境はterrarformで作成する。

## docker + virtualBox

https://qiita.com/yuki_ycino/items/cb21cf91a39ddd61f484
を参考に作る。

## 仮想環境内のコードをホスト上のエディタから編集する
https://tech.recruit-mp.co.jp/dev-tools/vagrant-rsync-synced-folder/

https://www.to-r.net/media/docer-cra/
https://mutagen.io/documentation/synchronization/ignores

## 注意
`vagrant halt` で必ずvmを終了する
MacのクラッシュやVMの正常な終了が行えなかった際には `$ mutagen sync list` でセッションを確認し、不要なセッションについては `$ mutagen sync terminate {session_id}` で削除するようにしてください。

## github action
https://www.to-r.net/media/wp-vagrant-docker/
