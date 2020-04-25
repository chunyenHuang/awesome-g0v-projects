# awesome-g0v-projects

- [Website](http://awesome-g0v-projects-dev-website.s3-website-us-east-1.amazonaws.com/)
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

- https://g0v-tw.slack.com/archives/C02G2SXKX/p1582454881007300
- https://docs.google.com/spreadsheets/d/1C9-g1pvkfqBJbfkjPB0gvfBbBxVlWYJj6tTVwaI5_x8/edit#gid=1563040282


## Prior Art

- https://amb.g0v.tw/repos
- https://github.com/g0v/ambassador
- https://github.com/g0v/awesome-g0v
- https://github.com/g0v/g0v.json
- https://github.com/g0v/editor