# NCHRP-14-41

This is an interactive tool for NCHRP 14-41 under the supervision of Dr. Subasish Das. The tool provides a list of vegetation control methods taking into account location, cost, and expected results. The website makes use of jQuery, Papaparse, and the Reactjs framework with JSX. 

## Hosting

The website can be hosted through the file system or a local server. An internet connection is required for the libraries to be loaded from CDNs. 

## Development

This project uses the Babel preprocessor to translate JSX into JS for Reactjs. Nodejs is required on your system. To install all dependencies run `npm install` in the project directory. While working on files in /src, start the translator for JSX with `npm run watch` or `npx babel --watch src --out-dir . --presets react-app/prod` 

> Anthony Teo and Subasish Das 2019