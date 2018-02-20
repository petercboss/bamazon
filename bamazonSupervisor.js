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
  const choices = ['View Product Sales by Department', 'Create New Department', 'Quit'];
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
        viewSales();
        break;
      case 1:
        createDepartment();
        break;
      case 2:
        connection.end();
        break
    }
  })
};

function viewSales() {
  connection.query('SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales) AS product_sales, SUM(product_sales) - over_head_costs AS total_profit FROM departments JOIN products ON departments.department_name = products.department_name GROUP BY department_id', (err, results) => {
    if (err) throw err;
    console.table(results);
    options();
  });
};

function createDepartment() {
  inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'Department Name:',
      validate: function validateNumber(name){
        return name !== '' && /[a-z]/i.test(name);
      }
    },
    {
      name: 'costs',
      type: 'input',
      message: 'Overhead Costs:',
      validate: function validateNumber(number){
        return number !== '' && /[0-9]/.test(number) && number !== '0';
      }
    }
  ])
  .then( answer => {
    connection.query(`INSERT INTO departments (department_name, over_head_costs) VALUES ('${answer.name}', ${answer.costs})`, (err, results) => {
      if (err) throw err;
      console.log('Added!');
      options();
    });
  });
}