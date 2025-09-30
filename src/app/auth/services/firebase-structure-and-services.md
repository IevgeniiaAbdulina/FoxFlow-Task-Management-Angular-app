# Firebase Documentation:

# FoxFlow — Angular Task Management Application

## 📖 Overview

This document provides comprehensive Firebase integration guidelines for an Angular-based task management application using Firebase Authentication and Firestore.

## ⚙️ Project Configuration

### Firebase Setup

- **Angular Version**: 20.2.2
- **TypeScript**: Supported
- **Firebase SDK**: v11.10.0
- **Firebase Services**: Authentication, Firestore

### Authentication Methods

- Email/Password authentication
- Google Sign-In
- GitHub Sign-In

---

## 🗄️ Database Structure

### Collections Overview

| Collection | Description       | Parent                      |
|:-----------|:------------------|:----------------------------|
| `users`    | Application users | Root                        |
| `projects` | Projects          | Root                        |
| `tasks`    | Project tasks     | Subcollection of `projects` |

### User Collection

```ts
// Path: /users/{userId}
export interface User {
  displayName: string,
  email: string,
  id: string,           // authorization ID
  photoURL: string,
  userId: string        // firebase document ID
}
```

### Projects Collection

```typescript
// Path: /projects/{projectId}
export interface Project {
  createdAt: string,    // ISO timestamp
  id: string,           // Same as document ID
  owner: string,        // User UID who owns the project
  title: string
}
```

### Tasks Collection

```typescript
// Path: /projects/{projectId}/tasks/{taskId}
export interface Task {
  id: string,           // Same as document ID
  title: string,
  description: string,
  assignedTo: User[],   // Array of User objects
  dueTo: Date,
  createdAt: Date,
  status: 'todo' | 'in-progress' | 'done'
}
```

---

## 🔐 Authentication Setup

### Firebase Configuration

#### Create `.env` file

In the root directory, create the `.env` file and add the required keys.

```
NG_APP_API_KEY=apiKey
NG_APP_AUTH_DOMAIN=authDomain
NG_APP_DATABASE_URL=databaseURL
NG_APP_PROJECT_ID=projectId
NG_APP_STORAGE_BUCKET=storageBucket
NG_APP_MESSAGING_SENDER_ID=messagingSenderId
NG_APP_APP_ID=appId
NG_APP_MEASUREMENT_ID=measurementId
```

Configure Firebase in Angular environment files:

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  firebase: {
    apiKey: import.meta.env.NG_APP_API_KEY,
    authDomain: import.meta.env.NG_APP_AUTH_DOMAIN,
    databaseURL: import.meta.env.NG_APP_DATABASE_URL,
    projectId: import.meta.env.NG_APP_PROJECT_ID,
    storageBucket: import.meta.env.NG_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.NG_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.NG_APP_APP_ID,
    measurementId: import.meta.env.NG_APP_MEASUREMENT_ID,
  },
};
```

---

## 💡 Firestore Data Services

### User Service Methods

* `addDoc(this.usersCollection, user)` - add authorised user to Firebase collection.
* `updateDoc(docRef, { userId: result.id })` - update user with Firebase document ID.
* `query(this.usersCollection, where('email', '==', userEmail));` - verify the existing user in collection.
* `query(this.usersCollection, where('id', '==', userId));` - find project owner.

### Project Service Methods

* `addDoc(this.projectsCollection, projectToCreate)` - create new project.
* `updateDoc(docRef, dataToUpdate)` - update project.
* `deleteDoc(docRef)` - remove project.
* `getDoc(docRef)` - get project.

### Task Service Methods

* `doc(this.firestore, 'projects/${projectId}/tasks/${taskId}')` - get task.
* `addDoc(taskCollectionRef, todoToCreate)` - add task.
* `deleteDoc(docRef)` - delete task.
* `updateDoc(docRef, updateFields)` - update task.
* ` collectionData(this.usersCollection, { idField: 'id' })` - get assigned users.

---

## 🔒 Security Rules

### Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own projects
    match /projects/{projectId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.owner;
      
      // Tasks inherit project permissions
      match /tasks/{taskId} {
        allow read, write: if request.auth != null && request.auth.uid == get(/databases/$(database)/documents/projects/$(projectId)).data.owner;
      }
    }
  }
}
```

---

## 📱 Authentication Service

* `createUserWithEmailAndPassword(this.firebaseAuth, email, password)` - Email/password signup.
* `signInWithEmailAndPassword(this.firebaseAuth, email, password)` - Email/password sign-in.
* `signInWithPopup(this.firebaseAuth, provider)` - Google Sign-In.
  * Use a provider = new GithubAuthProvider()
* `signInWithPopup(this.firebaseAuth, provider)` - GitHub Sign-In.
  * Use a provider = new GithubAuthProvider()
* `signOut(this.firebaseAuth)` - Sign out.

---

## 🚀 Deployment

### Firebase Hosting Deployment

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize project: `firebase init`
4. Build and deploy:

```bash
ng build --prod
firebase deploy
```
