# UID

## Run source with docker

### Create an image
```
docker build -t uid-app .
```

### Run image
```
docker run -dp 127.0.0.1:3000:3000 uid-app
```

### Make sure docker image work correctly
```
docker ps
```

Once run image, docker will create a new container according to the image. If everything works fine, docker will pull it up on table here.

### Open website

The website is now online, you can open the url [here](http://127.0.0.1:3000/products)

## Run source manually

```
yarn
yarn start
```

## Start dev

```
yarn dev
```


## Run production

```
yarn build
serve -s dist
```

## Features 
```
- list product
- delete product
- update product
- create product
- filter by status
- bulk delete products
```

## Repo

You can follow my commit on github rep [https://github.com/Ram4GB/product-list/commits/master/](https://github.com/Ram4GB/product-list/commits/master/)

