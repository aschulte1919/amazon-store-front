var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pmakA0402",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    displayData();
});

function displayData() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " | " +
                "Product name: " + res[i].product_name + " | " +
                "Department: " + res[i].department_name + " | " +
                "Price: " + res[i].price + " | " +
                "Quantity in stock: " + res[i].stock_quantity);
            console.log("------------------------------------------------------------------");
        };
    })
    itemSelection();
};

function itemSelection() {
    inquirer
        .prompt({
            name: "userItemID",
            type: "rawlist",
            message: "What item ID would you like to select?"
        }, {
            name: "userQuantity",
            type: "input",
            message: "How many of the item would you like?"
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.userQuantity >= stock_quantity) {
                console.log("Insuficient quantity to meet your demand");
                console.log("------------------------------------------------------------------");
            } else {
                var updatedQuantity = stock_quantity - answer.userQuantity;

                connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                        stock_quantity: updatedQuantity
                    }])
            
                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) throw err;
                    console.log("Item ID: " + answer.item_id + " | " +
                        "Updated items in stock" + answer.stock_quantity);
                    displayPrice();
                })
            }
        });
};

function displayPrice() {
    // display new price-- need to get the price from the id and multiply it by the answer.stock_quantity




    console.log(" | " + "Your total price: "   ); 
};