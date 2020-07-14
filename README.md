# calculator

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Tests
The tests use the TestCafe Framework. TestCafe needs to be installed
globally on your computer for them to run. 

```
npm install -g testcafe
```

If you have any issues installing see https://devexpress.github.io/testcafe/documentation/getting-started/

Currently the tests run when the site is live on http://localhost:8080/ as this is
the default port vue assigns the project when npm run serve is run.

Ideally this url needs to be set in a .env file variable but for simplicity for this test the url is hardcoded.

Running the command below should run all tests.
```
npm run test
```

### Design
The order of the keys match what I have seen on many online calculators
with memory at the top, operations on the right and the numbers ordered like a standard numpad.
There have been a lot of psychology studies that show this works best and since users
are used to this layout it is easier to pick up and use.

The colours used are purely ones that I liked, but are set using sass variables so can be changed and themed easily according to different brands.

The memory view button with modal was chosen over M+ and M- buttons so that users can quickly
scroll through saved results and add them to an equation quickly compared to blindly tapping M+/M- repeatedly.

A blue highlight was added to the result to highlight the = button has been pressed,
otherwise with the auto-result on screen it looks the same and is hard to see the difference.
