# nocker-restifier

Simplified restifier for nocker server. Built completely in typescript, right now only compatible with neDB.

## Getting started

Install the module with: ```npm install nocker-restifier```

Then in a typical nocker workflow:


```
var db = {
    tags: new NEDB({ filename: path.resolve('mock-db/tags.db'), autoload: true })
}

var nockerResources = nocker-restifier({collection: db.tags, resUrl: 'tags'})


Nocker.register(nockerResources);

// Start server on port 7003
Nocker.start({port: 9999, auth: false}, function() {
  console.log("Server is listening on port " + this.port + '\n');
})

/*
Initializing Nocker...

Route: GET /tags
Route: GET /tags/:_id
Route: POST /tags
Route: POST /tags/:_id/update
Route: POST /tags/:_id/delete

All routes registered correctly
*/

```


## Documentation

### mocker-restifier(input, options)

- ***input***: single model, or array of models, to generate the route. Every model have this structure:
	- ***collection***(Collection instance): A database instance (neDB right now).
	- ***resUrl***(String): Name of the resource (the module automatically compose the url).
	- ***...***: All of the general options, if you need to override any default option, you can do it only for this resource. This input are extending by the general options and the options here have the priority.

- ***options***(Object): Object with the options, all are optionals:
	- ***only***: (Array): Array with the methods you want to generate, it allowed all by default. By default ```['get', 'getOne', 'post', 'put', 'delete']```
    - ***refParam*** (string): This allows you to modify the reference params for getOne, Put and Delete. By default ```"_id"```. This output the routes, ```/tags/:_id``` for this mentioned routes.
    - ***mode*** (string): This options affects only to a PUT and DELETE methods. That transforms to a POST using (resource/:id/update or resource/:id/delete), for systems that only allow you to use GET and POST requests.By default: "strict", you can use "normal" for use the PUT and DELETE methods.
    - ***baseUrl***(String): baseUrl without first "/".
    - ***storageProvider***: Name of the storage provider. By default: ```"nedb"```

This funtion output an array of configuration that you can pass directly to the nocker generator function.

## Development
Run `npm install;npm run dev` to watch the project, webpack compile the code automatically. Run `npm build` to build the normal and minified version.

##Examples

- Strict mode:
    ```
    var db = {
        tags: new NEDB({ filename: path.resolve('mock-db/tags.db'), autoload: true })
    }

    var nockerResources = nocker-restifier({collection: db.tags, resUrl: 'tags'})


    Nocker.register(nockerResources);

    // Start server on port 7003
    Nocker.start({port: 9999, auth: false}, function() {
      console.log("Server is listening on port " + this.port + '\n');
    })

    /*
    Initializing Nocker...

    Route: GET /tags
    Route: GET /tags/:_id
    Route: POST /tags
    Route: POST /tags/:_id/update
    Route: POST /tags/:_id/delete

    All routes registered correctly
    */

    ```

- Normal mode:
    ```
    var db = {
        tags: new NEDB({ filename: path.resolve('mock-db/tags.db'), autoload: true })
    }

    var nockerResources = nocker-restifier({collection: db.tags, resUrl: 'tags'}, {mode: 'normal'})


    Nocker.register(nockerResources);

    // Start server on port 7003
    Nocker.start({port: 9999, auth: false}, function() {
      console.log("Server is listening on port " + this.port + '\n');
    })

    /*
    Initializing Nocker...

    Route: GET /tags
    Route: GET /tags/:_id
    Route: POST /tags
    Route: PUT /tags/:_id
    Route: DELETE /tags/:_id

    All routes registered correctly
    */

    ```

- Changing default refParam:
    ```
    var db = {
        tags: new NEDB({ filename: path.resolve('mock-db/tags.db'), autoload: true })
    }

    var nockerResources = nockerRestifier({collection: db.tags, resUrl: 'tags'}, {refParam: 'youAwesomeId'})


    Nocker.register(nockerResources);

    // Start server on port 7003
    Nocker.start({port: 9999, auth: false}, function() {
      console.log("Server is listening on port " + this.port + '\n');
    })

    /*
    Initializing Nocker...

    Route: GET /tags
    Route: GET /tags/:youAwesomeId
    Route: POST /tags
    Route: POST /tags/:youAwesomeId/update
    Route: POST /tags/:youAwesomeId/delete

    All routes registered correctly
    */

    ```



## Credits
I couldn't do this without this awesome [mocker] library.

## License
Licensed under the MIT license. 2015

[mocker]: https://github.com/aitoroses/mocker
