import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

// As animações de entrada usam `autoAlpha`, que alterna `visibility` de
// forma assíncrona via rAF. Isso deixa os campos "ocultos" para as queries
// de acessibilidade do RTL de forma intermitente entre testes, então
// mockamos o GSAP aqui e testamos só o comportamento funcional do form.
jest.mock('gsap', () => ({ gsap: { fromTo: jest.fn() } }));
jest.mock('@gsap/react', () => ({ useGSAP: jest.fn() }));

function setup() {
  render(<Contact />);
  const emailInput = screen.getByLabelText(/seu e-mail/i);
  const messageInput = screen.getByLabelText(/sua mensagem/i);
  const submitButton = screen.getByRole('button', { name: /enviar mensagem/i });
  return { emailInput, messageInput, submitButton };
}

beforeEach(() => {
  global.fetch = jest.fn();
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('<Contact />', () => {
  it('mostra erro de validação ao submeter vazio', async () => {
    const { submitButton } = setup();

    await userEvent.click(submitButton);

    expect(await screen.findByText(/preencha o e-mail e a mensagem/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('mostra erro de validação para e-mail malformado', async () => {
    const { emailInput, messageInput, submitButton } = setup();

    await userEvent.type(emailInput, 'nao-e-email');
    await userEvent.type(messageInput, 'Oi, tudo bem?');
    await userEvent.click(submitButton);

    expect(await screen.findByText(/informe um e-mail válido/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('envia o formulário e mostra mensagem de sucesso', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    });
    const { emailInput, messageInput, submitButton } = setup();

    await userEvent.type(emailInput, 'fan@example.com');
    await userEvent.type(messageInput, 'Adorei o último episódio!');
    await userEvent.click(submitButton);

    expect(await screen.findByText(/mensagem enviada com sucesso/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/send-mail',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'fan@example.com', message: 'Adorei o último episódio!' }),
      })
    );
    // campos são limpos após sucesso
    expect(emailInput).toHaveValue('');
    expect(messageInput).toHaveValue('');
  });

  it('mostra a mensagem de erro vinda do backend quando o envio falha', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Serviço de e-mail não configurado.' }),
    });
    const { emailInput, messageInput, submitButton } = setup();

    await userEvent.type(emailInput, 'fan@example.com');
    await userEvent.type(messageInput, 'oi');
    await userEvent.click(submitButton);

    expect(await screen.findByText(/serviço de e-mail não configurado/i)).toBeInTheDocument();
  });

  it('limita a mensagem a 500 caracteres', async () => {
    const { messageInput } = setup();

    await userEvent.type(messageInput, 'a'.repeat(510));

    expect(messageInput).toHaveValue('a'.repeat(500));
    expect(screen.getByText('500/500')).toBeInTheDocument();
  });

  it('copia o link da rede social ao clicar em "Copiar link"', async () => {
    setup();

    const copyButton = screen.getByRole('button', { name: /copiar link do instagram/i });
    await userEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'https://www.instagram.com/roadpodglifos/'
      );
    });
    expect(await screen.findByText('Copiado!')).toBeInTheDocument();
  });

  // --- Teste de regressão ---
  // Antes de ligar o backend real, uma versão do handleSubmit engolia
  // qualquer erro em silêncio (catch vazio) e o botão ficava travado em
  // "Enviando..." para sempre quando o fetch falhava.
  it('[regressão] botão volta a ficar habilitado depois de um erro de rede', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    const { emailInput, messageInput, submitButton } = setup();

    await userEvent.type(emailInput, 'fan@example.com');
    await userEvent.type(messageInput, 'oi');
    await userEvent.click(submitButton);

    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });
});