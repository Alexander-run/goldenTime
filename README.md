# https://www.fnovatech.com/horse/user
# https://www.fnovatech.com/horse/admin (密码不能说哦～)

# monorepo结构
共有3个workspace：前端用户端，前端管理端，后端服务端
运行pnpm run dev本地启动全部三个项目（mysql数据库需要单独启动）
# 生产构建
运行pnpm run build进行打包 (打包脚本需要环境中安装jq命令行工具)
服务器上需要安装pm2管理node服务进程，配置文件自动打包进build产物
在服务器上项目根目录(horse)文件夹下运行npm run start启动后端服务
# Nginx配置
配置后端服务转发，以及X-Real-IP字段用于限制一台设备每天的表单提交数
location /api {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://127.0.0.1:3000;
}
配置两个前端应用的资源转发地址
location /horse/user {
    alias __dir__/horse/user;
    index index.html;
}
location /horse/admin {
    alias __dir__/horse/admin;
    index index.html;
}
# APP使用指南
## 1.用户端
每个用户IP每天只允许提交三次表单，限制恶意DOS操作
在日期选择框，可以查看所有可用活动日期（均为出发日期）
选择日期之后会显示该次活动的详细信息（详见下方2.2活动管理中心）
确认日期之后，填入姓名鱼备注，提交，完成报名。
定金需要另外与领队联系交付之后，由领队在管理端修改改报名状态（见2.1手动修改定金状态）
## 2.管理端

1. 报名管理中心
管理报名信息
可以删除某个报名信息
手动修改定金状态
下载所有报名者信息（Excel表格）进行进一步数据处理

2. 活动管理中心
可以新建活动，包括出发日期，定金额，领队联系信息，集合地，活动大致日程安排
可以编辑修改已有活动的详细信息
可以单条删除不需要的活动
（暂不支持过期活动自动删除，需手动）