# awesome-g0v-projects

有感與@ael在深夜聊天時發現，[好像社群一直沒有辦法維護 g0v project hub 這種東西](https://g0v-tw.slack.com/archives/C0386M58S/p1587666570002700)，決定做一個能夠整合並追蹤專案的使用者介面，讓新血能夠更容易地找到適合的專案或是讓管理者能了解專案進度。

- [Website 網站](https://chunyenhuang.github.io/awesome-g0v-projects)
- [data.json 開放資料](https://awesome-g0v-projects-dev-data.s3.amazonaws.com/data.json)

## 我能找到什麼 | Features

- 專案 Project (根據repo內含的 [`g0v.json`](https://github.com/g0v/g0v.json))
- 提案 (根據 [大松提案列表](https://docs.google.com/spreadsheets/d/1C9-g1pvkfqBJbfkjPB0gvfBbBxVlWYJj6tTVwaI5_x8/edit#gid=1563040282))
- 共筆 (根據 [g0v hackmd](https://g0v.hackmd.io/?nav=overview))
- GitHub Repo (根據 [追蹤團隊與個人 data.json](https://github.com/chunyenHuang/awesome-g0v-projects/blob/master/data/organizations.csv))
- 團隊 (根據 [追蹤團隊與個人 data.json](https://github.com/chunyenHuang/awesome-g0v-projects/blob/master/data/organizations.csv))
- 幫手 (根據 [追蹤團隊與個人 data.json](https://github.com/chunyenHuang/awesome-g0v-projects/blob/master/data/organizations.csv))

## 我能幫上什麼 | How can I help? 

### 加入零時政府 | Join g0v

- [點我加入 GitHub Member](https://g0v.hackmd.io/I4_oYRIvT9S0RKufKKKKvg#%E7%94%B3%E8%AB%8B%E6%88%90%E7%82%BA-member-%E6%A9%9F%E5%88%B6)
- [點我加入 Slack](https://join.g0v.tw/)

### 新增追蹤團隊或個人 | Add new organizations or users 

- [Example 範例](https://github.com/chunyenHuang/awesome-g0v-projects/pull/3)

### 幫忙補上缺失的 `g0v.json` | Create PR for adding or editing `g0v.json` for existing repos 

![Demo GIF](docs/add-edit-g0vJson.gif)

## 參考 | Reference

### 資料 | Data

- [g0v Database 資料庫說明](https://g0v.hackmd.io/eC2vgApVTu2AT7UmHeLDEg?view)
- [Slack 頻道整理](https://g0v-tw.slack.com/archives/C02G2SXKX/p1582454881007300)
- [大松提案列表](https://docs.google.com/spreadsheets/d/1C9-g1pvkfqBJbfkjPB0gvfBbBxVlWYJj6tTVwaI5_x8/edit#gid=1563040282)
- [g0v.json](https://github.com/g0v/g0v.json)

### 功能 | Feature

- [Project Hub 2019-10-20 基礎松討論筆記](https://g0v.hackmd.io/ag_WZEvPTYqzkvaukq_-Zw)
- [projecthub redux](https://g0v.hackpad.tw/projecthub-redux-9U6DLtdZc48)
- [g0v issue tracker](https://g0v.hackpad.tw/g0v-issue-tracker-iZZmyUdY57c)


## 巨人的肩膀 | Prior Art 

- [零時政府專案列表](https://tomliau33.github.io/G0vProjectList/)
- [機器大使](https://amb.g0v.tw/repos)
- [機器大使 repo](https://github.com/g0v/ambassador)
- [awesome-g0v](https://github.com/g0v/awesome-g0v)
- [g0v.json  editor](https://github.com/g0v/editor)

## 後話 | Something else

我本身也是新手，所以可能有些誤會或是不齊全(請幫補)，根據我的觀察，找專案的地方有：
專案文件
 - ex: hackmd
 - 資料最完整，裡面通常包含了進度和其他文件(ex:github)的連結
 - 但是必須要從他處先得到此文件的連結(`Issue:其它專案主的角度，是努力找各種地方讓大家知道自己的專案`)。
GitHub
 - 除非在 g0v 底下，不然一般來說是不可能知道
 - 內含的`g0v.json`基本上是不可及的
Slack
 - 有些頻道標題有基本的資料
 - 頻道很多
 - 基本上和其他管道是平行時空，如果沒有標題敘述，無法建立關聯
g0v database (google sheets)
 - 不易搜尋
 - 資料完整，但沒有進度或新資訊
我目前想解決的問題是資料分散且無法搜尋，眼下我應該會再嘗試搜集可能的資料來源，並思考建立其連結的方式。

以我自己的經歷，當初剛知道g0v的時候，我先到官網看，發現很多連結都失效(hub也不能登入，一開始還以為沒有人了)文章也停留在2016-2018，後來發現了slack，加入後在 #general 看到 #disfactory 的徵人廣告，加入了頻道後看了一下共筆和Github Repo，發現其實幫不上什麼忙(技術落差)，就變成廢人在裡面旁聽。又陸續加入了一些看似有趣的頻道，但很多都沒有人在使用了。偶爾我會看一下Hackmd的新文章，但大部分時間都在神遊和清理未讀訊息。想說如果有一個地方可以讓我找一下還有在進行的專案會很不錯，也想有一個像是賞金獵人版一樣的東西，可以看一下有什麼簡單的任務可解(目前就是 #general)。

## Workflow

- Create Github PR to update the source file  [organization.csv](data/organizations.csv)
- Every 12 hours
  - AWS Lambda fetches github info (last update date, issues, contributors, details...)
  - Update [data.json](https://awesome-g0v-projects-dev-data.s3.amazonaws.com/data.json) in S3 bucket
  
## Developement

### Frontend

```bash
cd web
npm i
npm start
```

### Backend

```bash
npm i
```

## Deployment

### Frontend

- gp-pages

### Backend

- serverless (AWS)
