var mysql = require("mysql");
var inquirer = require("inquirer");

function start() {
    inquirer
        .prompt({
            name: "userSelection",
            type: "list",
            message: "Please select the prompt you would like to see",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function (answer) {
            if (answer.choices === choices[0]) {
                viewProducts();
            }

            if (answer.choices === choices[1]) {
                viewLowInventory();
            }

            if (answer.choices === choices[2]) {
                addInventory();
            }

            if (answer.choices === choices[3]) {
                addProduct();
            }

        })
};

function viewProducts() {

};

function viewLowInventory() {

};

function addInventory() {

};

function addProduct() {

};

start();