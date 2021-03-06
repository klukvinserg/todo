const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

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
    .catch((err) => {
      res.status(500).send({
        success: false,
        error: err,
      });
    });
});

app.post('/delete/:id', function (req, res) {
  const userid = req.params.id;

  User.destroy({ where: { id: userid } })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) =>
      res.status(500).send({
        success: false,
        error: err,
      })
    );
});

app.post('/edit/:id', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const userdescription = req.body.new_description;
  const userId = req.params.id;

  if (userdescription.trim().length > 0) {
    User.update({ description: userdescription }, { where: { id: userId } })
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          error: err,
        });
      });
  }
});

app.post('/edit_status/:id', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const userId = req.params.id;

  let userStatus;

  User.findByPk(userId)
    .then((user) => {
      if (!user) return;

      user.status === 'on' ? (userStatus = 'off') : (userStatus = 'on');

      User.update({ status: userStatus }, { where: { id: userId } })
        .then(() => {
          res.redirect('/');
        })
        .catch((err) => console.log('123'));
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        error: err,
      });
    });
});

app.post('/create', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  let str = req.body.inputValue;

  if (str.trim().length > 0) {
    let user = {
      status: 'on',
      description: req.body.inputValue,
    };

    User.create(user)
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          error: err,
        });
      });
  }
});
