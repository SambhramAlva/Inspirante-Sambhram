# DECISIONS.md

## Why I Chose This Stack

I chose React for the frontend because I was already familiar with it and it makes it easier to split the application into reusable components like dashboards, sidebars, event pages, etc.

For the backend, I used Express.js because it is lightweight and straightforward for creating REST APIs. Since the project requirements involved multiple API endpoints and role-based access, Express felt like a good fit.

I chose MongoDB Atlas because it was easy to set up and I did not have to configure a local database on every machine. It also made testing easier since the data was available online.

---

## One Decision I Made That Wasn't Specified

I added separate dashboards for admin and students with a fixed sidebar for easier navigation, even though the exact dashboard layout was not specified.

---

## One Thing I'd Improve With More Time

If I had more time, I would improve the authentication flow.

Currently, users log in using seeded credentials and JWT tokens are used for authentication. For a more complete application, I would add password hashing, proper user management, and a way for administrators to create or manage student accounts.

I would also improve the UI further, and add features such as event search, filtering, and editing existing events.
