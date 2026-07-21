const { validateContact, MESSAGE_LIMIT } = require('./validateContact');

describe('validateContact', () => {
  it('aceita um payload válido', () => {
    const result = validateContact({ email: ' foo@bar.com ', message: ' Olá! ' });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.email).toBe('foo@bar.com');
    expect(result.message).toBe('Olá!');
  });

  it('rejeita quando o e-mail está ausente', () => {
    const result = validateContact({ email: '', message: 'oi' });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('E-mail é obrigatório.');
  });

  it('rejeita e-mail em formato inválido', () => {
    const result = validateContact({ email: 'nao-e-email', message: 'oi' });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('E-mail inválido.');
  });

  it('rejeita quando a mensagem está ausente', () => {
    const result = validateContact({ email: 'foo@bar.com', message: '   ' });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Mensagem é obrigatória.');
  });

  it('rejeita mensagem acima do limite de caracteres', () => {
    const result = validateContact({
      email: 'foo@bar.com',
      message: 'a'.repeat(MESSAGE_LIMIT + 1),
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(`Mensagem excede o limite de ${MESSAGE_LIMIT} caracteres.`);
  });

  it('ignora payload undefined/malformado sem lançar exceção', () => {
    expect(() => validateContact(undefined)).not.toThrow();
    expect(validateContact(undefined).valid).toBe(false);
  });

  // --- Teste de regressão ---
  // Antes existia um bug em que `email.trim()` era chamado sem checar o tipo,
  // e um `email` não-string (ex: um array vindo de um payload malicioso)
  // derrubava a function com TypeError em vez de retornar 400.
  it('[regressão] não lança exceção se email/message vierem com tipo inesperado', () => {
    expect(() => validateContact({ email: ['x'], message: { a: 1 } })).not.toThrow();
    const result = validateContact({ email: ['x'], message: { a: 1 } });
    expect(result.valid).toBe(false);
  });
});