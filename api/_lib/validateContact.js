const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_LIMIT = 500;

/**
 * Valida o payload do formulário de contato.
 * Mantido separado da function para poder ser testado isoladamente,
 * sem precisar mockar rede, SMTP ou o objeto request/response.
 *
 * @param {{ email?: string, message?: string }} payload
 * @returns {{ valid: boolean, errors: string[], email: string, message: string }}
 */
function validateContact(payload = {}) {
  const errors = [];
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!email) {
    errors.push('E-mail é obrigatório.');
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.push('E-mail inválido.');
  }

  if (!message) {
    errors.push('Mensagem é obrigatória.');
  } else if (message.length > MESSAGE_LIMIT) {
    errors.push(`Mensagem excede o limite de ${MESSAGE_LIMIT} caracteres.`);
  }

  return { valid: errors.length === 0, errors, email, message };
}

module.exports = { validateContact, EMAIL_PATTERN, MESSAGE_LIMIT };