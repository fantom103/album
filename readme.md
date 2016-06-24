Angular + Node.js photo album demo
---------

To start, clone the code, then execute the following:

```
# install dependencies
> npm install -g gulp webpack
> cd server
> npm install
> cd ../client
> npm install

# run server
> cd server
> npm start

# run client
> cd client
> npm install
> gulp
```

Server API
----------
Server is a regular express-based REST service which works with in-memory data store. It supports image uploads. 

Here's several API calls examples:

Get all photos:

```
curl localhost:9090/api/album
```

Upload the new file to the server:
```
curl -F "image=@image-2.jpg" localhost:9090/api/upload
```

Uploading a file will return a response similar to this one:

```
{"path":"upload/c585df4a9a0bc9618248443fd372a3dd.jpg"}
```

You can then use the `path` to upload the photo in the next call.

Add new photo:
```
curl -H "Content-Type: application/json" -X POST
    -d '{"path":"upload/c585df4a9a0bc9618248443fd372a3dd.jpg", "title": "Picture"}'localhost:9090/api/album
```

Get photo #1 details:
```
curl localhost:9090/api/album/1
```

Update photo #1 :
```
curl -H "Content-Type: application/json" -X PUT
    -d '{"path":"upload/sample-1.jpg", "title": "Picture Title"}' localhost:9090/api/album/1
```

Delete photo #1 :
```
curl -X DELETE localhost:9090/api/album/1
```

Client
------
Client side is an Angular.js app written with ES2015, transpiled by Babel and packed by Webpack. For the development it uses Browsersync to monitor the files and refresh the pages once the chage is detected.

UI framework is Materialise.
Stylus is used to add custom styles (custom stylesheets are imported per component).

The code structure is the following (in `client/app` folder):

```
-- app.js <-- the entry point
-- /components <-- reusable web-components style UI elements
-- /directives <-- angular directives
-- /filters    <-- angular filters
-- /pages      <-- 'routes' of the app
-- /services   <-- services, factories, etc
```

Each folder has a file named as a `<folder>.js` that assembles the whole folder content into the angular module.