
**Deprecated**

This repo is not actively maintained anymore and will stopped functioning soon because V1 of Dialogflow's API will be shut down on October 23, 2019.

How I can find some time back to this at some stage.


[![WeChat AI Icon](https://raw.githubusercontent.com/jaypeng2015/wechat-ai/master/assets/icons/png/wechat-ai.96x96.png)](https://jaypeng2015.github.io/wechat-ai/)

# WeChat AI | 微信机器人

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome) [![Node version](https://img.shields.io/badge/node-_8.10.0-green.svg?style=flat)](http://nodejs.org/download/)
[![Dependency Status](https://david-dm.org/jaypeng2015/wechat-ai/status.svg)](https://david-dm.org/jaypeng2015/wechat-ai)
[![devDependency Status](https://david-dm.org/jaypeng2015/wechat-ai/dev-status.svg)](https://david-dm.org/jaypeng2015/wechat-ai?type=dev)

A WeChat client with built-in robot integrated with [Dialogflow](https://dialogflow.com/).
Unlike other chat bots, you don't have to make it work by coding, but simply by training your agent in api.ai.

个人微信客户端+机器人([api.ai](https://api.ai))。与其他聊天机器人不同，你无须编程即可使你的机器人变得更加聪明，只要通过 api.ai 进行适当的训练即可。

## Getting Started | 快速上手

- git clone https://github.com/jaypeng2015/wechat-ai
- cd wechat-ai
- nvm install
- npm install
- npm start
- login
- Go to `Menu -> Settings -> Auto Reply`, enable auto-reply for the contacts

## Advanced Settings | 高级设置

Go to `Menu -> Settings -> Api Key`, set your own API key if you have a better api.ai agent.

通过`Menu -> Settings -> Api Key`菜单设置你自己的 API Key.

## Build | 构建

### Mac OS

`npm run build:mac`.

The output can be found in `.output` folder, with both the original package and the dmg file.

输出位于`output`目录下，包含打包 app 文件以及 dmg 安装包。

### Windows

`npm run build:win`.

The output can be found in `.output` folder, with both the original folder and the zip file.

输出位于`output`目录下，包含原始文件目录以及 zip 包。

## Release | 发布

`npm run release`.
By default this will always generate a draft release on github.
For more information please check [release-it](https://github.com/webpro/release-it)

## Note | 请注意

The conversation will be sent to api.ai if auto-reply is enabled.
Check [Terms & Conditions](https://api.ai/terms/)

开启自动回复的对话会被发往 api.ai, 查看[条款及协议](https://api.ai/terms/)

## Resources | 资源

- [License (ISC)][license]
- [Releases][releases]ß

[license]: ./LICENSE.md
[releases]: https://github.com/jaypeng2015/wechat-ai/releases
