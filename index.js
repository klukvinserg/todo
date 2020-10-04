const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/////

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/////

app.use('/assets', express.static('assets'));
app.use('/js', express.static('js'));

const sequelize = new Sequelize('klukvin', 'klukva', '2020ragroupZ', {
  dialect: 'mysql',
  host: 'klukvin.zzz.com.ua',
  define: {
    timestamps: false,
  },
});

const User = sequelize.define('todo_lists', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

app.set('view engine', 'ejs');

app.listen(3000, function () {
  console.log('Сервер ожидает подключения...');
});

app.get('/', function (req, res) {
  User.findAll({ raw: true })
    .then((data) => {
      res.render('index', {
        users: data,
      });
    })
    .catch((err) => console.log(err));
});

app.post('/delete/:id', function (req, res) {
  const userid = req.params.id;
  User.destroy({ where: { id: userid } })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
});

app.post('/edit/:id', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const userdescription = req.body.new_description;
  const userId = req.params.id;

  User.update({ description: userdescription }, { where: { id: userId } })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log('123'));
});
