/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'former-kit'
import { translate } from 'react-i18next'
import withRouter from 'react-router-dom/withRouter'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import moment from 'moment'
import mock from '../../../../src/containers/Balance/mock.json'

import DetailRecipient from '../../../../src/containers/RecipientDetails'

const mockRecipient = {
  name: 'Nome da Company LTDA',
  id: '12345678',
  status: 'Ativo',
  createDate: '31/12/1999',
  hash: 'rj_qwedaefsdfwerasfgwtwetwe',
}

const mockBalance = {
  anticipation: {
    available: 10000,
    error: false,
    loading: false,
  },
  dates: {
    end: moment().add(1, 'month'),
    start: moment(),
  },
  ...mock.result,
  query: {
    dates: {
      end: moment().add(1, 'month'),
      start: moment(),
    },
    page: 1,
  },
  total: {
    net: 1000000,
    outcoming: 1000000,
    outgoing: 1000000,
  },
  currentPage: 1,
  disabled: false,
  onAnticipationClick: () => {},
  onCancel: () => {},
  onCancelRequestClick: () => {},
  onFilterClick: () => {},
  onPageChange: () => {},
  onSave: () => {},
  onWithdrawClick: () => {},
}

const mockConfiguration = {
  anticipation: {
    anticipationDays: '25',
    anticipationModel: 'automatic_volume',
    anticipationVolumePercentage: '85',
  },
  transfer: {
    transferDay: '5',
    transferEnabled: true,
    transferInterval: 'weekly',
    transferWeekday: 'wednesday',
  },
  accounts: [
    {
      name: 'First account',
      number: '0001',
      type: 'conta_corrente',
      agency: '7',
      bank: '340',
      id: '1',
    },
    {
      name: 'Second account',
      number: '0002',
      type: 'conta_corrente',
      agency: '8',
      bank: '340',
      id: '2',
    },
  ],
  onSave: () => {},
  onCancel: () => {},
}

const mockInformation = {
  identification: {
    cnpj: '11.111.111/1111-11',
    cnpjEmail: 'star@wars.com',
    cnpjInformation: true,
    cnpjName: 'Star Wars Ltda',
    cnpjPhone: '21 2222-2222',
    cnpjUrl: 'http://www.starwars.com',
    cpf: '111-111-111-11',
    cpfEmail: 'barroso@barroso.com',
    cpfInformation: false,
    cpfName: 'Guilherme Melo Barroso',
    cpfPhone: '21 99999-9999',
    cpfUrl: 'www.cpfUrl.com.br',
    documentType: 'cnpj',
    partnerNumber: '4',
    partner0: {
      cpf: '222.222.222-22',
      name: 'Luke Skywalker',
      phone: '21 99999-9999',
    },
    partner1: {
      cpf: '111.111.111-11',
      name: 'Han Solo',
      phone: '21 99999-9999',
    },
    partner2: {
      cpf: '333.333.333-33',
      name: 'Princess Leia',
      phone: '11 88888-8888',
    },
    partner3: {
      cpf: '444.444.444-44',
      name: 'Chewie',
      phone: '11 77777-7777',
    },
    partner4: {
      cpf: '',
      name: '',
      phone: '',
    },
  },
  configuration: {
    anticipationModel: 'Automática por volume',
    anticipationVolumePercentage: '50',
    anticipationDays: '',
    transferEnabled: true,
    transferInterval: 'Mensal',
    transferDay: '15',
    transferWeekday: 'Terça-feira',
  },
  bankAccount: {
    agency_digit: '',
    agency: '1111',
    bank: '001',
    name: 'Conta Bancária',
    number_digit: '1',
    number: '11111',
    type: 'conta_corrente',
  },
}

const mapStateToProps = (state) => {
  console.log('state', state)
  const { account } = state
  const { client } = account
  const { balance, recipients } = client
  const { find } = balance



  console.log('balance', balance)
  console.log('recipients', recipients)

  return client

}

const enhanced = compose(
  connect(mapStateToProps),
  translate(),
  // withRouter
)

class DetailRecipientPage extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Card>
        <DetailRecipient
          informationProps={mockInformation}
          configurationProps={mockConfiguration}
          balanceProps={mockBalance}
          recipient={mockRecipient}
          t={this.props.t}
        />
      </Card>
    )
  }
}

DetailRecipientPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default enhanced(DetailRecipientPage)
