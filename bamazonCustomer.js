const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});

connection.connect( err => {
    if (err) throw err;
    buy();
});

function buy() {
    connection.query('SELECT item_id, product_name, CONCAT("$", price) price FROM products', (err, results) => {
        if (err) throw err;
        console.table(results);
        inquirer.prompt([
            {
                name: 'item',
                type: 'input',
                message: 'Choose an item by ID:',
                validate: function validateNumber(number){
                    return number !== '' && /[0-9]/.test(number) && number <= results.map(i => i.item_id).length && number !== '0';
                }
            },
            {
                name: 'amount',
                type: 'input',
                message: 'How many would you like to purchase?',
                validate: function validateNumber(number){
                    return number !== '' && /[0-9]/.test(number) && number !== '0';
                }
            }
        ])
        .then( answer => {
            connection.query('SELECT * FROM products WHERE ?', [{ item_id : answer.item }], (err, results) => {
                if (err) throw err;
                let price = results[0].price;
                if (+answer.amount > results[0].stock_quantity) {
                    console.log('Insufficient Quantity!');
                    quit();
                }
                else {
                    let newQuantity = results[0].stock_quantity - +answer.amount;
                    connection.query(`UPDATE products SET stock_quantity = ${newQuantity}  WHERE ?`, [{ item_id : answer.item }], (err, results) => {
                        if (err) throw err;
                        console.log(`Thank You!! Your total is $${+answer.amount * price}`);
                        quit();
                    });
                };
            });
        });
    });
};

function quit() {
    inquirer.prompt(
        {
            name: 'quit',
            type: 'confirm',
            message: 'Purchase Another Item?',
            default: true
        }
    )
    .then( answer => {
        if (answer.quit) {
            buy();
        }
        else {
            process.exit();
        };
    });
};

        