# awesome-g0v-projects

- [Website](https://chunyenhuang.github.io/awesome-g0v-projects)
- [data.json](https://awesome-g0v-projects-dev-data.s3.amazonaws.com/data.json)

## How to add a new project?

- [Example 新增範例](https://github.com/chunyenHuang/awesome-g0v-projects/pull/3)

## How to help create PR for adding or editing `g0v.json` for existing repos?

![Demo GIF](docs/add-edit-g0vJson.gif)

## Workflow

- Create Github PR to update the source file  [organization.csv](data/organizations.csv)
- Every 12 hours
  - AWS Lambda fetches github info (last update date, issues, contributors, details...)
  - Update [data.json](https://awesome-g0v-projects-dev-data.s3.amazonaws.com/data.json) in S3 bucket

## Reference

- [g0v Database 資料庫說明](https://g0v.hackmd.io/eC2vgApVTu2AT7UmHeLDEg?view)
- [Project Hub 2019-10-20 基礎松討論筆記](https://g0v.hackmd.io/ag_WZEvPTYqzkvaukq_-Zw)
- https://g0v-tw.slack.com/archives/C02G2SXKX/p1582454881007300
- https://docs.google.com/spreadsheets/d/1C9-g1pvkfqBJbfkjPB0gvfBbBxVlWYJj6tTVwaI5_x8/edit#gid=1563040282


## Prior Art

- https://tomliau33.github.io/G0vProjectList/
- https://amb.g0v.tw/repos
- https://github.com/g0v/ambassador
- https://github.com/g0v/awesome-g0v
- https://github.com/g0v/g0v.json
- https://github.com/g0v/editor
