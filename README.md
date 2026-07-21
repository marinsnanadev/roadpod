# Road Podglifos

Site do **Road Podglifos**, podcast de análise de mangá e anime. Feito em React, com identidade visual própria (glow, glassmorphism, tipografia customizada) e animações leves via GSAP.

🔗 [github.com/marinsnanadev/roadpod](https://github.com/marinsnanadev/roadpod)

## Stack

- React 19 + React Router 7 (Create React App)
- GSAP + `@gsap/react` — animações de texto e scroll reveal
- CSS puro, com variáveis de tema centralizadas em `src/index.css`
- Fontes: Space Grotesk (títulos) e Inter (corpo)

## Rodando localmente

```bash
npm install
npm start
npm run build
```

### Formulário de contato (envio de e-mail)

O envio de e-mail é feito por uma Vercel Function em `api/send-mail.js` (Nodemailer).
`npm start` sozinho não expõe `/api`, então para testar o formulário localmente:

```bash
npm install -g vercel   # uma vez só
cp .env.example .env    # preencha com suas credenciais SMTP
vercel dev
```

Variáveis necessárias (ver `.env.example`): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASS`, `CONTACT_TO_EMAIL`, `CORS_ALLOWED_ORIGIN`. Em produção, configure as
mesmas variáveis no dashboard da Vercel (Project Settings → Environment Variables).

## Proximos passos 

- Preencher o FAQ com texto real (hoje é lorem ipsum)
- Inserir manualmente títulos e capas dos episódios
- Construir testes (em andamento)