const mockXLS = [
  ['amount', 'antifraud', 'brand_name', 'capture_method', 'documents', 'email', 'id', 'ip', 'name', 'paid_amount', 'payment_method', 'refund_amount', 'risk_level', 'status', 'status_reason', 'subscription', 'updated_at'],
  [2000, '-', 'visa', '-', '-', 'test@test.com', '1565115', '179.34.134.27', 'Test', 2000, 'credit_card', 2000, '-', 'refunded', 'acquirer', 201341, '2017-05-25T19:13:22.859Z'],
  [5490, '-', 'visa', '-', '-', 'test@test.com', '1301999', null, 'Test', 5490, 'credit_card', 5490, '-', 'refused', 'capture_timeout', null, '2017-02-15T21:45:05.198Z'],
  [5490, '-', 'visa', '-', '-', 'test@test.com', '1301925', null, 'Test', 5490, 'credit_card', 5490, '-', 'refused', 'capture_timeout', null, '2017-02-15T21:05:05.126Z'],
  [100000, '-', 'visa', '-', '-', '-', '1280667', null, '-', 100000, 'credit_card', 100000, '-', 'refused', 'capture_timeout', null, '2017-02-08T18:00:04.905Z'],
  [100000, '-', 'visa', '-', '-', '-', '1280910', null, '-', 0, 'credit_card', 0, '-', 'refused', 'acquirer', null, '2017-02-08T13:07:47.540Z'],
  [1000, '-', 'visa', '-', '-', 'aardvark.silva@gmail.com', '1732031', '10.2.13.21', 'Aardvark da Silva', 1000, 'credit_card', 0, '-', 'paid', 'acquirer', null, '2017-07-19T19:42:54.215Z'],
  [1000, '-', 'visa', '-', '-', 'test@test.com', '1761390', '10.2.14.249', 'Test', 1000, 'credit_card', 0, '-', 'paid', 'acquirer', null, '2017-07-26T15:16:26.650Z'],
  [48521, '-', 'visa', '-', '-', 'test@test.com', '1761674', '10.2.13.21', 'Test', 48521, 'credit_card', 0, '-', 'paid', 'acquirer', null, '2017-07-26T15:56:54.544Z'],
  [20000, '-', 'visa', '-', '-', 'test@test.com', '1815318', '10.2.14.195', 'Test', 20000, 'credit_card', 0, '-', 'paid', 'acquirer', 221378, '2017-08-10T19:12:23.999Z'],
  [56435, '-', 'visa', '-', '-', '-', '2956651', '201.48.106.225', '-', 56435, 'credit_card', 56435, '-', 'refunded', 'acquirer', null, '2018-02-22T20:54:52.109Z'],
  [5646, '-', 'visa', '-', '-', '-', '2956649', '201.48.106.225', '-', 5646, 'credit_card', 0, '-', 'paid', 'acquirer', null, '2018-02-22T20:53:37.228Z'],
  [34567, '-', 'visa', '-', '-', '-', '2956657', '201.48.106.225', '-', 0, 'credit_card', 0, '-', 'refused', 'acquirer', null, '2018-02-22T20:55:35.571Z'],
  [4567, '-', 'visa', '-', '-', '-', '2956655', '201.48.106.225', '-', 0, 'credit_card', 0, '-', 'refused', 'acquirer', null, '2018-02-22T20:55:07.771Z'],
  [45643, '-', 'visa', '-', '-', '-', '2956647', '201.48.106.225', '-', 45643, 'credit_card', 0, '-', 'paid', 'acquirer', null, '2018-02-22T20:53:11.403Z'],
  [34567, '-', 'visa', '-', '-', '-', '2956654', '201.48.106.225', '-', 34567, 'credit_card', 34567, '-', 'refunded', 'acquirer', null, '2018-02-22T20:54:49.589Z'],
]

export default mockXLS
