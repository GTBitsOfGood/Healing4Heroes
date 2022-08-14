# Healing4Heroes

## Stack

- React Native: Front-end
- Next.js: Backend + API routing
- MongoDB: Permanently storing data
- eslint: Automatically identifying and fixing code errors
- Vercel: Deployment

## Development

1. Clone this project to your computer
```
git clone https://github.com/GTBitsOfGood/Healing4Heroes.git
```
2. Navigate to this project in your terminal
```
cd Healing4Heroes
```
3. Obtain your secrets -- Linux or MacOS (Skip if Windows); you will need to obtain a password from your Engineering Manager:
```
npm run secrets:linux
```
4. Obtain your secrets -- Windows Machines (Skip if MacOS or Linux); you will need to obtain a password from your Engineering Manager:
```
npm run secrets:windows
```
5. Install the dependencies:
```
npm ci
```
6. Run the project in your browser (Note not all React-Native features may work properly in the browser but it is good for quick development and iteration):
```
npm run dev
```
7. (Optional but Reccommended) Run the project on your phone. There are a couple of ways to do this but using [Expo Go](https://expo.dev/client) is the easiest. When using Expo Go, you will receive a QR code which you scan through your phone's Expo Go app. 
```
npm run start:mobile
npm run start:backend
```
8. If you face network issues of connecting with the app via your phone, you can run it via a tunnel like ngrok:
```
npm run start:mobile-tunnel
npm run start:backend
```
## Additional Information

- Use `[NAME]/[ISSUE_NUMBER]-[SHORT_DESCRIPTION]` when naming your feature branches
- Please run `npm run lint` and `npm run format` before committing
- Highly recommended to use VSCode with ESLint and Prettier extensions
  - To save even more time, set up "Format on Save"
