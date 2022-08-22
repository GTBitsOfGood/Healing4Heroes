# Healing4Heroes
 
## Stack
 
- React Native: Front-end
- Next.js: Backend + API routing
- MongoDB: Permanently storing data
- eslint: Automatically identifying and fixing code errors
- Firebase: User Authentication
- Github Actions: Continuous Deployment Pipeline
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
7. (Required for Frontend Devs) Run the project on your phone. There are a couple of ways to do this but using [Expo Go](https://expo.dev/client) is the easiest. When using Expo Go, you will receive a QR code which you scan through your phone's Expo Go app.
```
npm run start:mobile
npm run start:backend
```
8. If you face network issues of connecting with the app via your phone, you can run it via a tunnel like ngrok:
```
npm run start:mobile-tunnel
npm run start:backend
```
- Note: Expo Go uses a production environment so it will use the live API url instead of your localhost one. To change it to the localhost one, simply `return localhost:3000` at the top of `getBaseURL()` in `utils/urls.ts`
 
## Repository Backend Guide
This repository has a bit of a learning curve when it comes to understanding the backend functionality because we have a bit of abstraction to help developers seamlessly integrate with necessary middleware and authentication services. I'm writing this small guide to help lessen the learning curve for using the backend.
 
- **Backend Actions**:
The data flow from the database to the rest of the application starts with backend actions. The backend actions are the actual MongoDB queries that are made to get data. All backend actions can be found in the `backend/server/mongodb/actions` folder. Here is a sample backend action that finds a user using their Firebase UID:
```typescript
export async function findUserByFirebaseUid(firebaseUid: string) {
  await dbConnect(); // Always make sure to use dbConnect before making a Mongo query!
  const user = await UserModel.findOne({ firebaseUid: firebaseUid });
  return user;
}
```
- **API Wrapper**:
The API wrapper is a wrapper around the traditional Next.js API handlers and the API wrapper abstracts things like CORS, user authentication, and role checking. It acts as a middleware between the API request and the handler. If you would like to learn more, you can read through the API wrapper in `backend/server/utils/APIWrapper.ts`. The API wrapper is used in the API endpoints in `backend/src/pages/api`. Here we are able to set a configuration dictionary and which has the different types of requests that we can make to that certain endpoint (note: the file paths correspond to API paths --> so `backend/src/pages/api/user.ts` corresponds to `/api/user`). This is where all error handling should occur. Here is a sample API wrapper to get user information:
 
```typescript
export default APIWrapper({
  GET: { // Note we specify the type of request here
    config: {
      requireToken: true, // If this request requires a logged in user then we set this to true
      roles: [Role.NONPROFIT_USER], // We can limit the roles that can access this endpoint
    },
    handler: async (req) => { // Here is the actual user fetching logic
      const accessToken: string = req.headers.accesstoken as string; // access token is available as req.headers.accesstoken
      const user = await getUser(accessToken);
 
      if (!user) {
        throw new Error("User not found in database!");
      }
 
      return user;
    },
  }
});
```
- **Frontend Action**:
Finally, we want all that functionality to be available to the frontend. We have a custom internal web request (which handles authentication + error handling for you) that we use to send the API request and receive information. Frontend actions can be found in `mobile/actions/`. Here is a sample frontend action to get user info:
```typescript
export const getUserInfo = async () => {
  return internalRequest<User>({
    url: userUrl, // request url
    method: HttpMethod.GET, // specify type of request
    authRequired: true, // specify if you want to send over the user access token
    queryParams: {...},
    body: {...}  // You can also specify query or body params if your endpoint needs it
  });
};
 
```
## Additional Information
 
- Use `[NAME]/[ISSUE_NUMBER]-[SHORT_DESCRIPTION]` when naming your feature branches
- Please run `npm run lint` and `npm run format` before committing
- It is highly recommended to use VSCode with ESLint and Prettier extensions
  - To save even more time, set up "Format on Save"