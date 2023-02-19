# Arti
An article-editing application with the separation of front-end and back-end, developed in `typescript` and `go`.

This is the frontend project, and for back-end, it's **[here](https://github.com/NeterAlex/arti_backend)**.

## 🧬 Introduction
It's a testing project with the purpose of learning web and fullstack development, and is being constantly improved.

In the **front-end**, `react` & `next.js` are used as base framework, `chakra-ui` and `iconpark` built a practical user interface，
`tanstack-query` & `axios` are tasked with handling the data interaction between the front-end and back-end.

In the **back-end**, `gin` is used as a web framework with `go-jwt` for user authentication, 
`gorm` is used to interact with the `SQLite` database.

## ⭐️ Features
+ Basic article display and edit.
+ Markdown support.
+ Dark mode support.
+ Responsive UI for mobile and desktop.
+ User authentication using token.

## 🔭 Preview
| Light Mode | Dark Mode | Mobile |
| --- | --- | --- |
| ![light](https://cdn.staticaly.com/gh/NeterAlex/image_host@main/20230219/light.344jqodn01c0.webp) | ![night](https://cdn.staticaly.com/gh/NeterAlex/image_host@main/20230219/night.23txilyngvcw.webp) | ![mobile](https://cdn.staticaly.com/gh/NeterAlex/image_host@main/20230219/mobile.6ouusbh626o0.webp) |

## 🗂 Run
> `Arti` uses `pnpm` as the default package manager, click [here](https://pnpm.io/) to have a look.
1. Clone the project.
2. Run `pnpm install` to install all dependencies.
3. Execute `next run` to run the project.

## 🏷️ TODO
- [ ] OAuth support
- [ ] article export
- [ ] article preview image display and management
- [ ] more detailed user information display
- [ ] optimize mobile UI
