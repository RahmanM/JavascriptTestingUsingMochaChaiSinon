# Testing Javascript modules using Mocha and Chai

Steps:
1. NPM install mocha
2. NPM install chai
3. NPM init to generate the package.json
4. Within package.json set "test": "mocha"
5. To run tests in command line "npm run test"

NB: important to add this in package.json

```
"scripts": {
    "test": "mocha --timeout 10000"
  }
```

Result:

```
calculator
    add
      √ should add 2 numbers
      √ 2+3 should be greater than 4
    divide
      √ should divide 2 numbers
      √ 2/0 expect exception


  4 passing (30ms)
```

## Mocking


## Code coverage

Using npm 'nyc' package.

- To test, 'nyc npm test'
- To view report nyc report

```
----------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |      100 |      100 |      100 |      100 |                   |
 index.js |      100 |      100 |      100 |      100 |                   |
----------|----------|----------|----------|----------|-------------------|
```

## Tools
- Mocha sidebar: https://marketplace.visualstudio.com/items?itemName=maty.vscode-mocha-sidebar