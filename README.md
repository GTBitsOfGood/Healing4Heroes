# Healing4Heroes

## Stack

- React Native: Front-end
- Next.js: Backend + API routing
- MongoDB: Permanently storing data
- eslint: Automatically identifying and fixing code errors
- Firebase: User Authentication
- Github Actions: Continuous Deployment Pipeline
- Email Templates + Nodemailer + Pug: Mailing Functionality
- Netlify + Expo: Deployment

## Development

1. Clone this project to your computer

```
git clone https://github.com/GTBitsOfGood/Healing4Heroes.git
```

2. Navigate to this project in your terminal

```
cd Healing4Heroes
```

3. Install the dependencies:

```
npm ci
```

4. Obtain your secrets -- Linux or MacOS (Skip if Windows); you will need to obtain a password from your Engineering Manager:

```
npm run secrets:linux
```

5. Install Homebrew and Watchman -- Linux or MacOS (Skip if Windows); first install [Homebrew](https://brew.sh), then use it to install [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall).

```
brew install watchman
```

6. Obtain your secrets -- Windows Machines (Skip if MacOS or Linux); you will need to obtain a password from your Engineering Manager:

```
npm run secrets:windows
```

7. Run the project in your browser (Note: Not all React-Native features may work properly in the browser but it is good for quick development and iteration):

```
npm run dev
```

8. (Required for Frontend Devs) To run the project on your phone, there are a couple of ways to do this but using [Expo Go](https://expo.dev/client) is the easiest. When using running the application, you will receive a QR code which you scan through your phone's Expo Go app.

```
npm run start:mobile
npm run start:backend
```

---
**NOTE**

Your computer running the Expo server and your phone must be on the same network. The backend server must run on port 3000 (default port).

---

9. If you face network issues of connecting with the app via your phone, you can run it via a tunnel like ngrok; you may need to install a package when doing this for the first time:

```
npm run start:mobile-tunnel
npm run start:backend
```

## Repository Backend Guide

This repository has a small a learning curve when it comes to understanding the backend functionality because we have a bit of abstraction to help developers seamlessly integrate with necessary middleware and authentication services. I'm writing this guide to help lessen the learning curve for developing the backend.

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
  GET: {
    // Note we specify the type of request here
    config: {
      requireToken: true, // If this request requires a logged in user then we set this to true
      roles: [Role.NONPROFIT_USER], // We can limit the roles that can access this endpoint
    },
    handler: async (req) => {
      // Here is the actual user fetching logic
      const accessToken: string = req.headers.accesstoken as string; // access token is available as req.headers.accesstoken
      const user = await getUser(accessToken);

      if (!user) {
        throw new Error("User not found in database!");
      }

      return user;
    },
  },
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

## Obtaining an Access Token

Many of the backend endpoints require access tokens in the header of the request in order to authenticate the user. In order to obtain an access token to test the endpoint, you will want to visit one of the Mobile environments in Github environments. This should take you to the development screen of the app where you can press a button and obtain an access token which you can copy.

## Frontend Error Handling Guide

Error handling is essential to a better user experience. For that reason, we provide an Error Handler wrapper that makes it easy for you integrate error handling for API requests with the frontend. More information can be found in `mobile/utils/error.ts` Sample usage with some Firebase methods can be found below:

```typescript
const login = async () => {
  try {
    const userCredential = await ErrorWrapper({
      functionToExecute: createUserWithEmailAndPassword,
      errorHandler: setErrorMessage,
      parameters: [auth, email, password],
      customErrors: {
        "Firebase: Error (auth/email-already-in-use).":
          "This email is already in use",
        "Firebase: Password should be at least 6 characters (auth/weak-password).":
          "Your password must be at least 6 characters",
      },
    });
    return userCredential;
  } catch (error) {
    // You want to handle EndExecutionErrors via try catch
    endOfExecutionHandler(error as Error);
  }
};
```

We also provide a generalized Error Box component which you can insert your error message into to display to the user.

## Additional Information

- Use `[NAME]/[ISSUE_NUMBER]-[SHORT_DESCRIPTION]` when naming your feature branches
- Please run `npm run lint` and `npm run format` before committing
- It is highly recommended to use VSCode with ESLint and Prettier extensions
  - To save even more time, set up "Format on Save"
