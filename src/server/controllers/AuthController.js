const UserModel = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const consts = require('../consts')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async function (req, res) {
    try {
      let u = await UserModel.findOne({ email: req.body.email })
      if (!u) {
        const user = new UserModel(req.body);
        user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts)
        user.icon = ['editar', 'excluir', 'changePassword']
        await user.save()
        delete user.password
        res.status(200).json(user)
      }
      else
        res.status(403).json({ message: 'Email already registered', error: {} })
    }
    catch (e) {
      res.status(500).json({ message: 'Error While saving the user', error: e })
    }
  },
  login: function (req, res) {
    var password = req.body.password
    const email = req.body.email
    UserModel.findOne({ email: email }).lean().exec(function (err, user) {
      if (err) {
        return res.start(500).json({
          message: 'Server error', error: err
        })
      }
      const auth_err = (password == '' || password == null || !user)


      if (!auth_err) {
        console.log(user)
        console.log(password)

        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({ _id: user._id }, consts.keyJWT, { expiresIn: consts.expiresJWT })
          delete user.password
          return res.json({ ...user, token: token })
        }
      } else {
        return res.status(404).json({
          message: ' Erro de Email ou Password'
        })
      }
    })

  },
  check_token: function (req, res, next) {
    const token = req.get('Authorization')
    if (!token) {
      return res.status(401).json({ message: 'token not found!' })
    }
    jwt.verify(token, consts.keyJWT,
      (err, decoded) => {
        if (err || !decoded) {
          return res.status(401).json({ message: 'Token incorreto. Autenticação Falhou!!!' })
        }
        next();
      })
  },
  user_data: function (req, res) {
    const token = req.get('Authorization');
    jwt.verify(token, consts.keyJWT,
      (err, decoded) => {
        const id = decoded._id
        UserModel.findById(id).lean().exec(function (err, user) {
          if (err || !user) {
            return res.status(500).json({
              message: "Erro ao tentar localizar as informações do usuario", error: err
            })
          }
          let token = jwt.sign({ _id: user._id }, consts.keyJWT, { expiresIn: consts.expiresJWT })
          delete user.password
          return res.json({ ...user, token: token })
        })
      })
  },

  list_users: function (req, res) {
    const token = req.get('Authorization');
    jwt.verify(token, consts.keyJWT,
      (err, decoded) => {
        UserModel.find({}).lean().exec(function (err, user) {
          if (err || !user) {
            return res.status(500).json({
              message: "Erro ao tentar localizar as informações do usuario", error: err
            })
          }
          user.forEach(user => delete user.password)
          return res.json(user)
        })
      })
  },
  edit_user: function (req, res) {
    const token = req.get('Authorization');
    jwt.verify(token, consts.keyJWT,
      async (err, decoded) => {
        const user = new UserModel(req.body);
        filter = { _id: user._id }
        let doc = await UserModel.findOneAndUpdate(filter, user);
        return res.json(user)
      })
  },
  del_user: async function (req, res) {
    // const token = req.get('Authorization');
    // jwt.verify(token, consts.keyJWT,
    //   async (err, decoded) => {
    const user = new UserModel(req.body);
    filter = { _id: user._id }
    let doc = await UserModel.deleteOne(filter, function (err) {
      if (err) {
        return res.json({ erro: "Erro ao excluir" })
      }
      return res.json(user)
    }
    )
  }
  //  })
}
