var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

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
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------------------------");
        //start();
        connection.end();
    });
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        };
        console.log("-----------------------------------------------------");
        //start();
        connection.end();
    });
};

function addInventory() {
    //This function should display a prompt that will let the manager "add more" of any item currently in the store
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        inquirer.prompt([{
                    name: "userItemID",
                    type: "input",
                    message: "What is the id of the item you would like to restock?"
                },
                {
                    name: "userQuantity",
                    type: "input",
                    message: "How many units of the item would you like to add?",
                }
            ])
            .then(function (answer) {
                connection.query("SELECT * FROM products", function (err, res) {
                    var newUnits = parseInt(answer.userQuantity);
                    var itemIndex = parseInt(answer.userItemID) - 1;

                    var newQuantity = res[itemIndex].stock_quantity + newUnits;
                    //console.log(newQuantity);
                    var query = "UPDATE products SET ? WHERE ?";
                    connection.query(query, [{
                        stock_quantity: newQuantity
                    }, {
                        item_id: answer.userItemID
                    }], function (err, res) {
                        console.log("Items successfully restocked!");
                        connection.end();
                        //start();
                    });
                });
            });
    });
};

function addProduct() {
    inquirer.prompt([{
            name: "newItemName",
            type: "input",
            message: "What is the name of the new product you'd like to add?"
        },
        {
            name: "newItemDepartment",
            type: "input",
            message: "Which department should this item be added to?",
        },
        {
            name: "newItemPrice",
            type: "input",
            message: "What is the price of an individual item?",
        }, {
            name: "newItemQuantity",
            type: "input",
            message: "How many items would you like to stock?",
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO products SET ?", {
                product_name: answer.newItemName,
                department_name: answer.newItemDepartment,
                price: answer.newItemPrice,
                stock_quantity: answer.newItemQuantity
            },
            function (err) {
                if (err) throw err;
                console.log("Your item was added successfully!");
                //start();
                connection.end();
            }
        );
    });
};
