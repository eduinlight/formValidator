//THIS SCRIPT IT WAS CREATED BY ME
//IS A DATA VALIDATOR LIBRARY USING THE FUNCTIONS PROVIDED BY string-validator
//YOU CAN USE THIS CODE AND DO WHEREVER YOU WANTED WITH IT

//string validator rules
import * as sv from 'string-validator'
//schema format
//{field: [rule1, {rule: rule2}, {rule: rule3, params: [p1, p2], message: "custom_message"} ] }

export default class Validator{
  
  static defaults = {
    rules: {
      equals: {
        cant_params: 1,
        message: 'El texto no es igual a %p1.',
        fn: sv.equals
      },
      contains: {
        cant_params: 1,
        message: 'El texto tiene que contener %p1.',
        fn: sv.contains
      },
      matches: {
        cant_params: 1,
        message: 'El texto no coincide con el patrón $p1.',
        fn: sv.matches
      },
      email: {
        cant_params: 0,
        message: 'El formato del correo no es correcto.',
        fn: sv.isEmail
      },
      url: {
        cant_params: 0,
        message: 'El formato de la url no es correcta.',
        fn: sv.isURL
      },
      ip: {
        cant_params: 0,
        message: 'La ip no es correcta.',
        fn: sv.isIP
      },
      alpha: {
        cant_params: 0,
        message: 'El texto solo puede contener letras del alfabeto inglés.',
        fn: sv.isAlpha
      },
      numeric: {
        cant_params: 0,
        message: 'El dato solo puede contener números.',
        fn: sv.isNumeric
      },
      alpha_numeric: {
        cant_params: 0,
        message: 'El dato solo puede contener letras y/o números.',
        fn: sv.isAlphanumeric
      },
      base64: {
        cant_params: 0,
        message: 'El texto solo puede ser una encriptación base64.',
        fn: sv.isBase64
      },
      hexadecimal: {
        cant_params: 0,
        message: 'El dato solo puede ser un valor exadecimal.',
        fn: sv.isHexadecimal
      },
      hexcolor: {
        cant_params: 0,
        message: 'El dato solo puede ser un color en exadecimal.',
        fn: sv.isHexColor
      },
      lowercase: {
        cant_params: 0,
        message: 'El texto solo puede ser caractéres en minúscula.',
        fn: sv.isLowercase
      },
      uppercase: {
        cant_params: 0,
        message: 'El texto solo puede ser caractéres en mayúscula.',
        fn: sv.isUppercase
      },
      int: {
        cant_params: 0,
        message: 'El dato solo puede ser un entero.',
        fn: sv.isInt
      },
      float: {
        cant_params: 0,
        message: 'El dato solo puede ser un número decimal.',
        fn: sv.isFloat
      },
      divisible_by: {
        cant_params: 1,
        message: 'El dato tiene que ser divisible por %p1.',
        fn: sv.isDivisibleBy
      },
      required: {
        cant_params: 0,
        message: 'Requerido.',
        fn: () => (v) => v !== undefined && v !== null && v !== ''
      },
      boolean: {
        cant_params: 0,
        message: 'Valor booleano.',
        fn: () => (v) => (v != 'true' && v!='false') || (v!='1' && v!='0')
      },
      min_length: {
        cant_params: 1,
        message: 'El texto no puede ser menor que %p1 caracteres.',
        fn: sv.isLength
      },
      max_length: {
        cant_params: 1,
        message: 'El texto no puede exceder los %p1 caracteres.',
        fn: v => sv.isLength(0, v)
      },
      date: {
        cant_params: 0,
        message: 'Fecha incorrecta.',
        fn: sv.isDate
      },
      after_date: {
        cant_params: 1,
        message: '.',
        fn: sv.isAfter
      },
      before_date: {
        cant_params: 1,
        message: 'La fecha debe de ser antes de %p1.',
        fn: sv.isBefore
      },
      in: {
        cant_params: 1,
        message: 'La cadena no es correcta.',
        fn: sv.isIn
      },
      credit_card: {
        cant_params: 0,
        message: 'Tarjeta de crédito incorrecta.',
        fn: sv.isCreditCard
      },
      json: {
        cant_params: 0,
        message: 'El texto no esta en formato json.',
        fn: sv.isJSON
      },
      ascii: {
        cant_params: 0,
        message: 'Todos los caracteres del texto deben ser código ascii.',
        fn: sv.isAscii
      },
      gender: {
        cant_params: 0,
        message: 'El sexo especificado no es correcto [M, F, G].',
        fn: () => (v) => {
          return v=='F' || v=='M' || v=='G'
        }
      },
      max: {
        cant_params: 1,
        message: 'Valor máximo %p1.',
        fn: (p1) => (v) => {
          return v<=p1
        }
      },
      min: {
        cant_params: 1,
        message: 'Valor mínimo %p1.',
        fn: (p1) => (v) => {
          return v>=p1
        }
      },
    }
  }

  constructor(){
  }

  static validate(schema, data) {
    //iniciar objeto de respuesta
    let res = { valid: true, errors: {}, values: {} }
    //por cada campo en el schema
    Object.keys(schema).forEach(field => {
      //obtener las reglas del campo
      let rules = schema[field]

      //pasar el valor del campo para la respuesta
      res.values[field] = data[field]

      //para cada regla del campo
      rules.forEach(v => {
        //definición de la regla
        let rule = {}
        if (typeof(v) == "string") {
          rule = this.defaults.rules[v]
        } else if (typeof(v) == "object") {
          rule = this.defaults.rules[v.rule]

          if (rule.cant_params > 0 && v.params) {
            rule.params = v.params
          }

          if (v.message) {
            rule.message = v.message
          }
        }

        //hacer comprobación para esta regla
        //creación de parámetros
        let params_fn = []
        if (rule.cant_params > 0) {
          params_fn = rule.params
        }

        if (((v!='required' && data[field] !== undefined && data[field] !== null && data[field] !== '') || v=='required')
          && !rule.fn(...params_fn)(data[field])) {
          res.valid = false
          //reemplazar parámetros en el mensaje
          params_fn.forEach((v, i) => rule.message = rule.message.replace(new RegExp('\%p' + (i + 1), 'g'), v))
          res.errors[field] = rule.message
        }
      });
    })
    return res
  }
}
