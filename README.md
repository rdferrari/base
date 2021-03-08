# React Native & Typescript & AWS Amplify

$ expo init -t expo-template-blank-typescript

$ amplify init

$ yarn add aws-amplify aws-amplify-react-native @react-native-community/netinfo

## Add to App.tsx

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

$ amplify add api #accept defaults

$ amplify push

$ amplify status

## Github deploy via AWS web app.

## Redux

Create a slice. For example ./src/features/todos/todosSlice.tsx
