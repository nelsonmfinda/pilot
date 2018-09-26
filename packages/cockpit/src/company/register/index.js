import fetch from 'isomorphic-fetch'
import moment from 'moment'
import {
  always,
  applySpec,
  ifElse,
  isNil,
  join,
  pipe,
  prop,
  propEq,
  reverse,
  split,
  T,
  unless,
} from 'ramda'
import { apiUrl } from '../../environment'

const buildMql = applySpec({
  answers: {
    sales_starts: prop('salesStarts'),
    tpv: prop('amount'),
    platform: prop('platform'),
    segment: prop('segment'),
  },
})

const formatDate = date => moment(date).format('x')

const getTimestampFromBirthDate = pipe(
  prop('birthDate'),
  unless(
    isNil,
    pipe(
      split('/'),
      reverse,
      join('-'),
      formatDate,
      Number
    )
  )
)

const getDocumentType = ifElse(
  propEq('hasCNPJ', true),
  always('cnpj'),
  always('cpf')
)

const buildCompanyParameters = applySpec({
  company_template_token: always('cjkifh2ja0000y0739q5odyyt'),
  email: prop('email'),
  name: prop('tradeName'),
  should_activate: T,
  password: prop('password'),
  company_name: prop('legalName'),
  document_type: getDocumentType,
  document_number: prop('cnpj'),
  site_url: prop('site'),
  partner_name: prop('partnerName'),
  partner_cpf: prop('cpf'),
  partner_birthday: getTimestampFromBirthDate,
  partner_mother_name: prop('montherName'),
  partner_phone: prop('phone'),
  partner_street: prop('street'),
  partner_complementary: prop('complement'),
  partner_street_number: prop('number'),
  partner_neighborhood: prop('neighborhood'),
  partner_city: prop('city'),

  // TODO: adicionar este campo quando a tela o possuir
  partner_state: always('SP'),
  partner_zipcode: prop('cep'),
  mql: buildMql,
})

const registerCompany = (registerData) => {
  const body = JSON.stringify(buildCompanyParameters(registerData))
  return fetch(`${apiUrl}companies`, {
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
}
export default registerCompany

