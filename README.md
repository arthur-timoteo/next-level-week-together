<h1 align="center">GamePlay</h1>

<p align="center">
  <img alt="GamePlay" src=".github/capa.png" width="100%">
</p>

## Project

Application to help you connect and organize fun time and play with friends. Create groups to play your favorite games with your friends with this App that has Discord authentication.

## Features

- OAuth2 Social Authentication with Discord server;
- Get user profile registered in Discord (username and avatar);
- Lists the Discord servers that the user is part of;
- Allows you to schedule matches;
- Allows you to filter matches by category;
- Share the invitation to join the user's server;
- Allows you to redirect the user to your own server;

## Technologies and Libraries

This project was developed with the following technologies/libraries:

- [Node.js v14.16.0](https://nodejs.org/en/)
- [React Native](https://reactnative.dev/)
- [Expo v4.3.4](https://expo.io/)
- [AsyncStorage](https://docs.expo.io/versions/latest/sdk/async-storage/)
- Typescript
- Context API
- Axios
- OAuth2 Discord
- Expo Authentication
- Deep Link

## Mobile devices used in development

- Android: API 29
- IOS: 14.6

## Layout

You can view the project layout through this [link](https://www.figma.com/file/MkVfL7gxlZgYGcX0X72eOv/GamePlay-NLW-Together-Copy-Copy?node-id=58913%3A83). Figma account is required to access it.

## How to run

- Clone the repository;
- Access project directory;
- Install dependencies with `yarn` or `npm install`;
- Access [Discord server](https://discord.com/developers/docs/intro) to create an application;
- Insert application name;
- On the OAuth2 page add a redirect url and select it in OAuth2 URL Generator;
- In SCOPES check the following options: identity, email, connections and guilds, then copy the generated url;
- Change the file name from `.env.example` to `.env`;
- In the `.env` file, fill in the credentials information with the generated url;
- In the app.json file, insert the `schema` item with the name of the application created on the Discord server;
- Start the expo with `expo start`, `yarn start` or `npm start`;
- To execute mobile aplication in the a physical cellphone install Expo Go or use a emulator;

## License

This project is under the MIT license. See the [LICENSE](LICENSE.md) file for more details.