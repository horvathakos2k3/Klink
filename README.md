# Klink

A simple mobile app for splitting shared expenses. After a weekend trip or a group shopping run, everyone enters what they bought and how it should be split, and Klink calculates exactly who owes whom — with the fewest possible transfers.

## Features

- Add participants and record expenses (name, quantity, price, who paid)
- Split each item between everyone or a selected subset
- Automatic balance calculation and minimal settlement transfers
- Mark transfers as paid — the app tracks what's left and shows when everyone is settled
- Available in English, Hungarian and Romanian

## Tech stack

- **Frontend:** Expo (React Native) with TypeScript and expo-router
- **State:** React Context
- **Architecture:** layered, MVVM-inspired — screens (View), hooks (ViewModel), a pure calculation module (domain logic)

## Try it

Download the latest Android APK from the [Releases](../../releases) page, open it on your phone, and allow installation from unknown sources when prompted.

## Run locally

```bash
npm install
npx expo start
```

Then open the project in Expo Go, or run a development build.