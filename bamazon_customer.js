const mysql = require('mysql');
const inquirer = require('inquirer');
let connection = mysql.createConnection({
    host: 'localhost',
    port: '8080',
    user: 'root',
    password: 'root',
    database: 'bamazon',
});

connection.connect(function(error) {
    connection.query('select * from products', function (error, response) {
        if (error) throw error;
        console.log('Welcome customer! Here are the available products:');
        response.forEach(element => {
            let id = element.item_id;
            let name = element.product_name;
            console.log('id:', id, '-', 'Product:', name);
        });

        let getCustomerOrder = function() {
            let num_products = response.length;
            let questions = [
                {
                    type: 'input',
                    name: 'item',
                    message: 'Please enter the id number of the item you would like to purchase: ',
                    validate: function(value) {
                        var valid = !isNaN(parseFloat(value));
                        if (!valid) {
                            return 'Please enter an id number';
                        } else {
                            var selected_id = parseFloat(value);
                            if (selected_id > num_products) {
                                valid = false;
                            }
                            return valid || 'That product id does not exist';
                        } 
                    },
                },
                {
                    type: 'input',
                    name: 'quantity',
                    message: 'How many would you like to purchase?',
                    validate: function(value) {
                        var valid = !isNaN(parseFloat(value));
                        return valid || 'Please enter a number';
                    }
                },
            ];
            inquirer.prompt(questions).then(answers => {
                let id = answers.item;
                let quantity = parseFloat(answers.quantity);
                connection.query(`select product_name, price, stock_quantity from products where item_id = ${id}`, function(error, response) {
                    if (error) throw error;
                    let data = response[0];
                    let stock = data.stock_quantity;
                    let name = data.product_name;
                    if (quantity > 1) {
                        name = name + 's';
                    };
                    if (stock < quantity) {
                        console.log(`We do not have enough of that item in stock to fulfill your order.`)
                        console.log(`Our current stock of ${name}s is: ${stock}`);
                        console.log(`Please re-enter your order.`);
                        getCustomerOrder();
                    } else {
                        let price = data.price;
                        let total = price * quantity;
                        let new_quantity = stock - quantity;
                        console.log(`Your order summary is: `);
                        console.log(`   ${quantity} ${name}`);
                        console.log(`   Price: $${price}`);
                        console.log(`   Order total: $${total}`);
                        confirmOrder(id, new_quantity);  
                    }
                    
                });
                
            });
        }

        let confirmOrder = function(id, new_quantity) {
            let question = {
                type: 'confirm',
                name: 'confirm_order',
                message: `Please confirm this order`
            }
            inquirer.prompt(question).then(answer => {
                if (answer.confirm_order) {
                    console.log('thank you');
                    connection.query(`update products set stock_quantity = ${new_quantity} where item_id = ${id}`, function(error, response) {
                        if (error) throw error;
                        connection.end();
                    })
                }
                else {
                    let q = {
                        type: 'confirm',
                        name: 'reenter',
                        message: `Would you like to enter a new order?`
                    };
                    inquirer.prompt(q).then(answer => {
                        if (answer.reenter) {
                            getCustomerOrder();
                        } else {
                            console.log('Thank you');
                            connection.end();
                        }
                    })

                }
            })
        }
        getCustomerOrder();
    });
});