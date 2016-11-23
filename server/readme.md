Album API call examples
---------


Get all photos:

```
curl localhost:9090/api/album
```

Add new photo:
```
curl -H "Content-Type: application/json" -X POST
    -d '{"path":"upload/sample-1.jpg", "title": "Picture"}' http://localhost:9090/api/album
```

Get photo #1 details:
```
curl localhost:9090/api/album/1
```

Update photo #1 :
```
curl -H "Content-Type: application/json" -X PUT
    -d '{"path":"upload/sample-1.jpg", "title": "Picture Title"}' http://localhost:9090/api/album/1
```

Delete photo #1 :
```
curl -X DELETE http://localhost:9090/api/album/1
```


To send JSON on Passport failure, use "Custom Callback" as described here:
http://passportjs.org/docs/authenticate
