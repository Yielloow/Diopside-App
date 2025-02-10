# Diopside-App

## Git Command
1. git add .
   git commit -m "<modif-apportée>"
   git push -u origin main (pour importer dans la branche main)
   git push origin <nom-de-ta-branche>

Install React CLI
   npm install -g react-native@latest

Install Expo CLI
   npm install -g expo-cli

Installation de Android Studio
   https://developer.android.com/studio?hl=fr

## To fix vulnerabilities

   - High Vulnerabilities
      npm audit fix --force 

   - Medium Vulnerabilities
      npm audit fix --force 

   - Low Vulnerabilities
      npm audit fix


## Run Expo
   Run Android
      npx react-native run-android

   Run iOS
      npx react-native run-ios

   Run EXPO
      npx expo start

Attention
Une fois le développement terminé, il peut être préférable de remettre la politique d'execution de script à sa valeur initiale (powershell) avec :
Set-ExecutionPolicy Restricted


# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
