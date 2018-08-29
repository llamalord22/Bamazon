
var fs = require("fs");
var inquirer = require("inquirer");
var Table = require("cli-table");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    runApp();
});

function runApp() {
    inquirer.prompt([{
        name: "app",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Make a Purchase",
            "Quit"
        ]
    }])
    .then(function(answer){
        switch (answer.app) {
            case "Make a Purchase":
            start();
            break;

        case "Quit":
        process.exit();
        break;

        }
    })


}

function start() {
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, res) {
        if (err) throw err;
        var productsTable = new Table({
            head: ["Item_ID", "Product_Name", "Department_Name", "Price", "Stock"],
            colWidths: [5, 25, 15, 15, 10]
        });
        for (var i = 0; i < res.length; i++) {
            productsTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        };
        console.log(productsTable.toString());
    });
     makePurchase();
}
function makePurchase() {
    
connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    inquirer
    .prompt([{
        name: "choice",
        type: "input",
        message: "Please enter the ID of the product you would like to purchase.", 
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
                return false;
            }
    },
    {
        name: "quantity",
        type: "input",
        message: "Please input the quantity that you would like to purchase.",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
                }
                return false;
            }
        }
    ])
    .then(function (answer) {
        var selectItem;
        for (var i = 0; i < res.length; i++) {
            if(res[i].item_id == answer.choice) {
                selectItem = res[i];
            }
        }
        var updateStock = selectItem.stock_quantity - parseInt(answer.quantity);
        var totalCost = selectItem.price * parseInt(answer.quantity);

        if(parseInt(updateStock) < 0) {
            console.log("Not enough product to fill order.\n");
            start();
        } else {
            connection.query(
                "UPDATE products SET ? WHERE ?", 
                [
                    {
                        stock_quantity: updateStock
                    }, 
                    {
                        item_id: selectItem.id
                    } 
                ],
                function(err) {
                    if(err) throw err;
                    console.log("\nPurchase Completed, your total cost was " + totalCost + "\n");
                    start()
                }
            )
        }
    })
})
}