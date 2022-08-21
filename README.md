# muniFromEstat
e-Statから、市町村ポリゴンを作る（微妙）

https://mghs15.github.io/muniFromEstat/index2.html

## データ
e-Statの境界データのうち、2020年の国勢調査 小地域

https://www.e-stat.go.jp/gis/statmap-search?type=2

## プロセス
1. データ（GML）をダウンロード `download.js`
2. ZIPを解凍 `unzip.js`
3. GMLを無理やりGeoJSONへ変換 `gojson.js`
4. tippecanoeでmbtilesへ変換 `tiler.js`
5. tile-joinでタイルへ展開 `apart.js`

フォルダは、あらかじめ、`dl`, `dat`, `gml`, `mbtiles`を作っておく。

