# Private OMDB API

## Description <a name="description"></a>

A simple API to request movies poster url from OMDB API

## Table of contents
1. [Description](#description)
2. [Tech Stack](#techstack)
3. [Getting Started](#gettingstarted)
    1. [Requirements](#requirements)
    2. [Installing](#installing)
    3. [Executing Program](#execute)
4. [API Documentation](#api)
    1. [Endpoints](#endpoints)
    2. [Sample usage](#sampleusage)

## Tech Stack <a name="techstack"></a>

Express.js, Node.js, MySQL Database, 

## Getting Started <a name="gettingstarted"></a>

### Requirements <a name="requirements"></a>

* Node.js
* MySQL Server

### Installing <a name="installing"></a>

* Clone this repository
```
git clone https://github.com/alitdarmaputra/Private-OMDB-API.git
```
* Install package with npm
```
npm install
```
* Change .env file value according to your own value. Variable description:

| Variable           	| Description                      	|
|--------------------	|----------------------------------	|
| PORT               	| PORT where the app is listening  	|
| OMDB_APIKEY        	| API KEY to request OMDB API data 	|
| DB_NAME            	| Database name                    	|
| DB_USERNAME        	| Database username                	|
| HOST               	| Database host                    	|
| PASSWORD           	| Database password                	|
| DB_PORT            	| Database port                    	|
| SECRET_ACCESS_KEY  	| JWT hash key for access token    	|
| SECRET_REFRESH_KEY 	| JWT hash key for refresh token   	|

### Executing program <a name="execute"></a>
* Start the app
```
npm start
```
* Run dev mode
```
npm run dev
```


## API Documentation <a name="api"></a>

### Endpoints <a name="endpoints"></a>

| Method | Endpoint         | Content-Type     | Body               | Action                                                |
|--------|------------------|------------------|--------------------|-------------------------------------------------------|
| POST   | /users/signup    | application/json | { name, password } | Create user account                                   |
| POST   | /users/login     | application/json | { name, password } | Authenticate user                                     |
| POST   | /users/token     | application/json | {}                 | Request new access token                              |
| DELETE | /users/logout    | application/json | {}                 | Logout user                                           |
| GET    | /movies/{title}  | application/json | {}                 | Return poster URL of that movie                       |
| GET    | /movies/favorite | application/json | {}                 | Return all poster URL of that user's  favorite movies |
| POST   | /movies/favorite | application/json | { title }          | Insert into user's favorite movies                    |

### Sample Usage <a name="sampleusage"></a>
1. Get Movie Poster

    ```
    GET http://localhost:3000/movies/avenger
    ```
    - Return `<object>`
    ```json
    {
        "Title": "Avenger",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTMzMjMwMjcyNl5BMl5BanBnXkFtZTcwNTA1NDgzMQ@@._V1_SX300.jpg"
    }
    ```
2. Post User's Favorite Title

    ```
    POST http://localhost:3000/movies/favorite
    headers: "Content-Type": "application/json"
    body: {
        "title": "Avenger"
    }
    ```
    - Return `<object>`
    ```json
    {
        "Title": "Avenger",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTMzMjMwMjcyNl5BMl5BanBnXkFtZTcwNTA1NDgzMQ@@._V1_SX300.jpg"
    }
    ```
3. Get user's favorite movies poster

    ```
    GET http://localhost:3000/movies/avenger
    ```
    - Return `<object>`
    ```json
    {
        "favorite_movies_poster": [
            {
                "Title": "Lauf um Dein Leben - Vom Junkie zum Ironman",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMDJhZjA5MWEtOTE5Yy00MWJiLTgwNjQtMDliOWI0NWJmZDZkXkEyXkFqcGdeQXVyMjY1ODY2Ng@@._V1_SX300.jpg"
            },
            {
                "Title": "Superman",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMzA0YWMwMTUtMTVhNC00NjRkLWE2ZTgtOWEzNjJhYzNiMTlkXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
            },
            {
                "Title": "SpongeBob SquarePants",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNTk2NzEyNTQtZTQ5MS00MjAyLTgzMDMtNDNkYTBkM2M2OTU3XkEyXkFqcGdeQXVyODUwNjEzMzg@._V1_SX300.jpg"
            }
        ]
    }
    ```


