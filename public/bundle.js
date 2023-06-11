/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/index.ts":
/*!**********************!*\
  !*** ./app/index.ts ***!
  \**********************/
/***/ (() => {

eval("\nif (\"WebSocket\" in window) {\n    const protocol = window.location.protocol === \"http:\" ? \"ws://\" : \"wss://\";\n    const address = protocol + window.location.host;\n    function connectWebSocket() {\n        const socket = new WebSocket(address);\n        socket.addEventListener(\"message\", message => {\n            try {\n                const content = JSON.parse(message.data);\n                switch (content.type) {\n                    case 'reload':\n                        const update = sessionStorage.getItem('hot-update');\n                        sessionStorage.setItem('hot-update', \"0\");\n                        if (update !== \"0\")\n                            window.location.reload();\n                        break;\n                    default: return;\n                }\n            }\n            catch (error) {\n                console.error(error);\n            }\n        });\n        socket.addEventListener(\"error\", e => console.error(\"error\", e));\n        socket.addEventListener('close', () => {\n            sessionStorage.setItem('hot-update', \"1\");\n            console.error(new Error(\"Error trying access : \" + address));\n            setTimeout(connectWebSocket, 4e3);\n            setInterval(connectWebSocket, 10e3);\n        });\n    }\n    connectWebSocket();\n}\nelse\n    alert(\"You should upgrade your browser.\");\n\n\n//# sourceURL=webpack://pacman/./app/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./app/index.ts"]();
/******/ 	
/******/ })()
;