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

connection.connect(function(err) {
    if (err) throw err;
    options();
});

function options() {
  const choices = ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Quit'];
  inquirer.prompt([
    {
        name: 'options',
        type: 'list',
        message: 'What Would You Like To Do?',
        choices: choices
    }
  ]).then(answers => {
    let choice = choices.indexOf(answers.options);
    switch (choice) {
      case 0:
        viewProducts();
        break;
      case 1:
        viewLow();
        break;
      case 2:
        addInventory();
        break;
      case 3:
        addProduct();
        break;
      case 4:
        connection.end();
        break
    }
  })
};

function viewProducts() {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;
    console.table(results);
    options();
  });
};

function viewLow() {
  connection.query('SELECT * FROM products WHERE stock_quantity < 10', (err, results) => {
    if (err) throw err;
    console.table(results);
    options();
  });
}

function addInventory() {
  inquirer.prompt([
    {
        name: 'item',
        type: 'input',
        message: 'Choose an item by ID:',
        validate: function validateNumber(number){
            return number !== '' && /[0-9]/.test(number) && number !== '0';
        }
    },
    {
        name: 'amount',
        type: 'input',
        message: 'How many would you like to add?',
        validate: function validateNumber(number){
            return number !== '' && /[0-9]/.test(number);
        }
    }
  ])
  .then( answer => {
    connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${+answer.amount} WHERE ?`, [{ item_id : answer.item }], (err, results) => {
      if (err) throw err;
      console.log(`You added ${+answer.amount}`);
      options();
    });
  });
};

function addProduct() {
  inquirer.prompt([
    {
        name: 'name',
        type: 'input',
        message: 'Product Name:',
        validate: function validateNumber(name){
            return name !== '' && /[a-z]/i.test(name);
        }
    },
    {
        name: 'department',
        type: 'input',
        message: 'Department Name:',
        validate: function validateNumber(name){
            return name !== '' && /[a-z]/i.test(name);
        }
    },
    {
      name: 'price',
      type: 'input',
      message: 'Product Price:',
      validate: function validateNumber(number){
          return number !== '' && /[0-9]/.test(number) && number !== '0';
      }
    },
    {
      name: 'quantity',
      type: 'input',
      message: 'Product Quantity:',
      validate: function validateNumber(number){
          return number !== '' && /[0-9]/.test(number) && number !== '0';
      }
    }
  ])
  .then( answer => {
    connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('${answer.name}', '${answer.department}', ${answer.price}, ${answer.quantity})`, (err, results) => {
      if (err) throw err;
      console.log('Added!');
      options();
    });
  });
}