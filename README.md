# Offline First Course Browsing App

A React Native (Expo) application that demonstrates an offline-first architecture for browsing, searching, filtering, and enrolling in courses. The app prioritizes local data access through SQLite while synchronizing course data from Supabase.

## Features

### Core Features

* Browse available courses
* Search courses by title, instructor, or tags
* Filter courses:

  * All
  * Free
  * Premium
  * Enrolled
* View course details
* Enroll / Unenroll in courses
* Pull-to-refresh synchronization
* Offline-first experience

### Offline-First Capabilities

* SQLite used as the primary local data source
* Cached courses available without internet access
* Synchronization with Supabase when online
* Enrollment state preserved locally
* Offline status indicator

---

## Tech Stack

### Frontend

* React Native
* Expo
* Expo Router
* TypeScript

### State Management

* Zustand

### Local Storage

* Expo SQLite

### Backend / Remote Data Source

* Supabase

### Styling

* NativeWind (Tailwind CSS)

---

## Architecture

The application follows a layered architecture:

```text
src/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── course/
│       └── [id].tsx
│
├── features/
│   └── courses/
│       ├── data/
│       │   ├── remote/
│       │   ├── repositories/
│       │   └── sync/
│       │
│       ├── presentation/
│       │   ├── screens/
│       │   └── components/
│       │
│       └── store/
│
├── database/
│   ├── database.ts
│   ├── init.ts
│   └── courseDao.ts
│
└── lib/
```

Data Flow:

```text
UI
 ↓
Zustand Store
 ↓
Repository
 ↓
SQLite (Primary Source)
 ↓
Supabase Sync
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-url>
cd offline_first_course_browsing_app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_SUPABASE_URL=https://dqbczltxrqbpwtgaplfl.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=sb_publishable_wlt3wdf011WryjquAVN5qA_L3sR_g70
```

You may also create an `.env.example` file:

```env
EXPO_PUBLIC_SUPABASE_URL=https://dqbczltxrqbpwtgaplfl.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=sb_publishable_wlt3wdf011WryjquAVN5qA_L3sR_g70
```

### 4. Start Development Server

```bash
npx expo start
```

### 5. Run Android

```bash
npx expo run:android
```

---

## Synchronization Strategy

1. App loads data from SQLite immediately.
2. User can browse courses offline.
3. Manual refresh triggers synchronization.
4. Latest courses are fetched from Supabase.
5. SQLite cache is updated.
6. Enrollment status is preserved locally.

---

## Design Decisions

### Why SQLite?

SQLite provides:

* Fast local access
* Offline support
* Persistent storage
* Better scalability than AsyncStorage for structured data

### Why Zustand?

* Lightweight
* Minimal boilerplate
* Excellent performance
* Easy integration with React Native

### Why Repository Pattern?

* Separation of concerns
* Testability
* Clear data flow
* Easier future backend changes

---

## Assumptions

* Course catalog data is managed through Supabase.
* Enrollment state is stored locally.
* Sync conflicts are resolved by preserving local enrollment state.

---

## APK

APK build can be downloaded from:

https://drive.google.com/drive/folders/1LDza6dgYIR6JLq5r2Lw5_6eR9Zyg7ZVI?usp=sharing

---

## Future Improvements

* Background synchronization
* Sync queue for offline mutations
* Unit tests
* Integration tests
* Pagination
* Skeleton loading states
* Advanced filtering
* Automatic sync on reconnect

---

## Author

Fuad Hossain

React Native Developer
