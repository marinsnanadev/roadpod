const mockSendMail = jest.fn();

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({ sendMail: mockSendMail })),
}));

const handler = require('./send-mail');

function createMockRes() {
  const res = {};
  res.statusCode = null;
  res.body = null;
  res.headers = {};
  res.setHeader = jest.fn((key, value) => {
    res.headers[key] = value;
  });
  res.status = jest.fn((code) => {
    res.statusCode = code;
    return res;
  });
  res.json = jest.fn((payload) => {
    res.body = payload;
    return res;
  });
  res.end = jest.fn(() => res);
  return res;
}

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  jest.clearAllMocks();
  process.env = {
    ...ORIGINAL_ENV,
    SMTP_HOST: 'smtp.example.com',
    SMTP_PORT: '587',
    SMTP_USER: 'bot@example.com',
    SMTP_PASS: 'secret',
    CONTACT_TO_EMAIL: 'contato@roadpodglifos.com',
  };
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

describe('POST /api/send-mail', () => {
  it('envia o e-mail e retorna 200 para um payload válido', async () => {
    mockSendMail.mockResolvedValueOnce({ messageId: '123' });
    const req = { method: 'POST', body: { email: 'fan@example.com', message: 'Adorei o episódio!' } };
    const res = createMockRes();

    await handler(req, res);

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    expect(mockSendMail.mock.calls[0][0]).toMatchObject({
      to: 'contato@roadpodglifos.com',
      replyTo: 'fan@example.com',
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('retorna 400 e não tenta enviar e-mail com payload inválido', async () => {
    const req = { method: 'POST', body: { email: 'invalido', message: '' } };
    const res = createMockRes();

    await handler(req, res);

    expect(mockSendMail).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('retorna 405 para métodos diferentes de POST', async () => {
    const req = { method: 'GET', body: {} };
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
  });

  it('retorna 502 quando o SMTP falha', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('conexão recusada'));
    const req = { method: 'POST', body: { email: 'fan@example.com', message: 'oi' } };
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(502);
  });

  it('retorna 500 se as variáveis de ambiente SMTP não estiverem configuradas', async () => {
    delete process.env.SMTP_HOST;
    const req = { method: 'POST', body: { email: 'fan@example.com', message: 'oi' } };
    const res = createMockRes();

    await handler(req, res);

    expect(mockSendMail).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
  });

  // --- Teste de regressão ---
  // Já existiu uma versão em que o header CORS era setado só na resposta de
  // sucesso, então erros de validação quebravam requisições cross-origin no
  // browser (sem header, o fetch falha antes mesmo de ler o status 400).
  it('[regressão] sempre define o header CORS, mesmo em respostas de erro', async () => {
    const req = { method: 'POST', body: { email: 'invalido', message: '' } };
    const res = createMockRes();

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', expect.any(String));
  });
});