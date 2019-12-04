# Flickrly Documentation

# Installing

1. Extract the Zip file and run the following command

    npm run start

# Libraries Used

[Libraries](Flickrly%20Documentation/Libraries.csv)

## Storybook

To test components in isolation i've used Storybook. To run Storybook, use the following command

    npm run storybook

# Caching Mechanism

For the purpose of caching data. I've use IndexedDB . I've used a library called Dexie.js to read and write to IndexedDB. The following are the tables in indexedDB along with their indexes.

[Tables](Flickrly%20Documentation/Tables.csv)

Implemented a middleware to check if data is present in the cache. If the data is not present, a network call is made to fetch the data and is immediately stored in IndexedDB for subsequent calls. 

### Middleware

Location: ('src/middleware/middleware.js')

[Middleware](Flickrly%20Documentation/Middleware.csv)

# Redux

### Actions

[Actions ](Flickrly%20Documentation/Actions.csv)

### Sagas

[Sagas](Flickrly%20Documentation/Sagas.csv)


# Site Hosted
The site is hosted on the following link
https://flickrly.netlify.com/
 

# Feature Additions from previous version

- Make groups favorite
- Make Photos favorite
- Favorites section on top right corner
- Lazy Loading
- Zoom Images
- Staggered View
