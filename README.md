# Healing4Heroes

## Stack

- React.js: Front-end
- Next.js: Page/API routing and pre-rendering
- MongoDB: Permanently storing data
- eslint: Automatically identifying and fixing code errors

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
6. Run the project in development mode:
```
npm run dev
```

## Additional Information

- Use `[NAME]/[ISSUE_NUMBER]-[SHORT_DESCRIPTION]` when naming your feature branches
- Highly recommended to use VSCode with ESLint and Prettier extensions
  - To save even more time, set up "Format on Save"
