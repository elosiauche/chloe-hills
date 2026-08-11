# Deploying Chloe Hills — No Coding Required

This guide gets the site live using only two websites — GitHub and
Netlify — plus the Firebase console. No installing software, no
typing commands.

Total time: about 20–30 minutes.

---

## Part A — Put the project on GitHub

GitHub is just where the code will live so Netlify can build it.

1. Go to [github.com](https://github.com) and create a free account if you don't have one.
2. Click the **+** icon (top right) → **New repository**.
3. Name it `chloe-hills`, leave it **Public** or **Private** (either works), and click **Create repository**.
4. On the new repository page, click **uploading an existing file**.
5. Unzip the `chloe-hills-phase0.zip` file on your computer first (double-click it).
6. Open the unzipped `chloe-hills` folder, select **everything inside it**, and drag it into the GitHub upload page in your browser.
7. Scroll down and click **Commit changes**.

That's it — your code is now on GitHub.

---

## Part B — Create the Firebase project (the database & login system)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and sign in with a Google account.
2. Click **Add project**, name it `chloe-hills` (or anything), and follow the prompts (you can turn off Google Analytics — not needed).
3. Once the project opens, click **Build** in the left sidebar:
   - **Authentication** → **Get started** → enable **Email/Password**, and optionally **Google**.
   - **Firestore Database** → **Create database** → choose a location close to you → start in **production mode**.
   - **Storage** → **Get started** → keep the default settings.
4. Click the **gear icon** (top left, next to "Project Overview") → **Project settings**.
5. Scroll to **Your apps** → click the **</> (Web)** icon → give it a nickname like "Chloe Hills Web" → **Register app**.
6. Firebase will show a code block with values like `apiKey`, `authDomain`, etc. **Keep this tab open** — you'll copy these into Netlify in the next part.

### Turn on the security rules
1. In Firebase, go to **Firestore Database** → **Rules** tab.
2. Open the `firestore.rules` file from your unzipped project folder in any text editor, select all, copy it.
3. Paste it into the Firebase rules editor, replacing what's there, and click **Publish**.
4. Repeat the same steps for **Storage** → **Rules** using the `storage.rules` file.

---

## Part C — Deploy on Netlify

1. Go to [netlify.com](https://www.netlify.com) and sign up (you can sign up directly with your GitHub account — easiest option).
2. Click **Add new site** → **Import an existing project**.
3. Choose **GitHub**, authorize Netlify if asked, then select the `chloe-hills` repository you created in Part A.
4. Netlify will auto-detect the build settings from the project (build command `npm run build`, publish folder `dist`) — you shouldn't need to change anything. Click **Deploy**.
5. The first deploy will likely **fail or show a blank page** — that's expected, because it doesn't have your Firebase values yet. That's the next step.

### Add your Firebase values to Netlify
1. In your new Netlify site, go to **Site configuration** → **Environment variables**.
2. Click **Add a variable** and add each of these one at a time, using the values from the Firebase code block you kept open in Part B:

   | Key | Value comes from Firebase's... |
   |---|---|
   | `VITE_FIREBASE_API_KEY` | `apiKey` |
   | `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` |
   | `VITE_FIREBASE_PROJECT_ID` | `projectId` |
   | `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
   | `VITE_FIREBASE_APP_ID` | `appId` |

3. Once all six are added, go to **Deploys** tab → **Trigger deploy** → **Deploy site**.
4. Wait about a minute — your live site link will appear at the top of the page (something like `https://chloe-hills-xxxx.netlify.app`).

---

## You're done

Your site is now live at the Netlify link. You can:
- Click **Domain settings** in Netlify to connect a custom domain like `chloehills.com` later.
- Come back to this same GitHub repository any time there's a new version of the code — just re-upload changed files the same way as Part A, and Netlify redeploys automatically.

## If something looks broken
- **Blank white page** → double-check the six environment variables in Netlify are spelled exactly as shown above, then trigger a new deploy.
- **"Permission denied" errors when signing up/logging in** → double check the Firestore and Storage rules were pasted and published (Part B).
- Anything else → open the **Deploys** tab in Netlify and click the failed deploy to see the error log, or ask whoever set this project up for you to take a look.
