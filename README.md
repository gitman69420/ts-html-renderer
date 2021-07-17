# HTML Renderer (Codepen clone) - with File Manager (made with React - Typescript)

This project is made as the solution for the frontend task for the Dyte VIT 2022 batch.

Hosted on: https://ts-html-renderer.netlify.app/

created by
Mugundan Sridhar - 18BCE2314

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the Typescript template.


## External Libraries

+ `react-codemirror2`
+ `codemirror`


## Features

+ File Explorer - list of files
+ File Tabs with closing functionality
+ Same code editor to handle codes from the html, javascript and css files. 
+ Area to render html code 


## Drawbacks

+ Currently file system is managed through built-in `useState` variables. Could be replaced with `react-redux` for managing larger number of files and more file functionalities. 
+ Unable to implement PasteBin API due to time restriction.
+ Unable to host on GitHub pages


