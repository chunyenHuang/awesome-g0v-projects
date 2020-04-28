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

## 資料參考來源 | Reference

- [g0v Database 資料庫說明](https://g0v.hackmd.io/eC2vgApVTu2AT7UmHeLDEg?view)
- [Project Hub 2019-10-20 基礎松討論筆記](https://g0v.hackmd.io/ag_WZEvPTYqzkvaukq_-Zw)
- [Slack 頻道整理](https://g0v-tw.slack.com/archives/C02G2SXKX/p1582454881007300)
- [大松提案列表](https://docs.google.com/spreadsheets/d/1C9-g1pvkfqBJbfkjPB0gvfBbBxVlWYJj6tTVwaI5_x8/edit#gid=1563040282)
- [g0v.json](https://github.com/g0v/g0v.json)

## 巨人的肩膀 | Prior Art 

- [零時政府專案列表](https://tomliau33.github.io/G0vProjectList/)
- [機器大使](https://amb.g0v.tw/repos)
- [機器大使 repo](https://github.com/g0v/ambassador)
- [awesome-g0v](https://github.com/g0v/awesome-g0v)
- [g0v.json  editor](https://github.com/g0v/editor)

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
