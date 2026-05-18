# Seimons Forge

> Uma fábrica de software orientada por dores reais.

Em vez de criar produtos no achismo, a Seimons Forge coleta problemas do dia a dia de pessoas e empreendedores — tarefas manuais, repetitivas, lentas ou desorganizadas — e transforma essas dores em soluções digitais, automações e plataformas SaaS.

---

## O que é essa landing page

A landing page funciona como:

- **Funil de descoberta** — atrai pessoas que se identificam com o problema de fazer tudo "no braço"
- **Validador de mercado** — cada dor enviada é um dado real de demanda
- **Coletor de oportunidades** — o formulário alimenta um banco de problemas que vira backlog de produtos
- **Máquina de geração de produtos** — as dores mais votadas viram automações, micro SaaS ou plataformas

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 18 + Vite 5 |
| Estilo | Tailwind CSS 3 |
| Backend | Supabase (PostgreSQL + RLS + RPC) |
| Notificações | react-hot-toast |
| Ícones | lucide-react |

---

## Funcionalidades

### Formulário de dores
Coleta os seguintes dados de quem envia um problema:

| Campo | Obrigatório | Descrição |
|---|---|---|
| Nome | Não | Identificação opcional |
| E-mail | Não | Usado para acesso antecipado ao produto |
| Categoria | Sim | Área do problema (Financeiro, Vendas, RH...) |
| Descrição | Sim | Detalhamento da dor (mín. 20 caracteres) |
| Frequência | Não | Com que frequência o problema ocorre |
| Impacto | Não | Tipo de impacto (tempo, dinheiro, clientes...) |
| Solução atual | Não | Como a pessoa resolve hoje (ex: planilha, WhatsApp) |

### Feed de dores com votação
- Exibe todas as dores enviadas, ordenadas por votos
- Filtro por categoria
- Paginação (6 por vez)
- Botão "Eu também tenho isso!" em cada card
- Anti-duplo voto: UUID anônimo gerado no browser e salvo em `localStorage`
- Proteção dupla no banco: índice único `(pain_id, ip_hash)` + função RPC atômica

---

## Estrutura do projeto

```
seimons-forge/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Barra de navegação fixa com CTA
│   │   ├── Hero.jsx            # Seção principal com headline e stats
│   │   ├── HowItWorks.jsx      # 3 etapas: dor → análise → produto
│   │   ├── Categories.jsx      # Grade das 10 categorias de atuação
│   │   ├── PainFeed.jsx        # Feed público de dores com votação
│   │   ├── WhyShare.jsx        # Benefícios de compartilhar a dor
│   │   ├── PainForm.jsx        # Formulário principal de envio
│   │   └── Footer.jsx
│   ├── lib/
│   │   ├── supabase.js         # Cliente Supabase
│   │   └── voterId.js          # Geração de voter ID e controle de votos no localStorage
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── supabase/
│   ├── migration.sql           # Criação das tabelas pains e pain_votes
│   └── vote_function.sql       # Função RPC vote_on_pain
├── .env                        # Credenciais Supabase (não versionar)
├── .env.example
└── ...
```

---

## Configuração e execução

### Pré-requisitos

- Node.js 18 ou superior
- Conta no [Supabase](https://supabase.com)

### 1. Clone e instale as dependências

```bash
git clone https://github.com/seu-usuario/seimons-forge.git
cd seimons-forge
npm install
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

As credenciais ficam em **Supabase → Project Settings → API**.

### 3. Crie as tabelas no Supabase

No painel do Supabase, acesse **SQL Editor** e execute os arquivos na ordem:

```sql
-- 1. Tabelas principais
-- conteúdo de supabase/migration.sql

-- 2. Função de votação
-- conteúdo de supabase/vote_function.sql
```

### 4. Rode o projeto

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

---

## Banco de dados

### Tabela `pains`

Armazena cada dor enviada pelo formulário.

```sql
id              UUID PRIMARY KEY
created_at      TIMESTAMP WITH TIME ZONE
name            TEXT
email           TEXT
category        TEXT NOT NULL
description     TEXT NOT NULL
frequency       TEXT  -- daily | weekly | monthly | occasionally
current_solution TEXT
impact          TEXT  -- time | money | customers | team | all
status          TEXT  -- pending | analyzing | building | launched
votes           INTEGER DEFAULT 0
notes           TEXT  -- anotações internas da equipe
```

### Tabela `pain_votes`

Registra cada voto, garantindo unicidade por `(pain_id, ip_hash)`.

```sql
id         UUID PRIMARY KEY
created_at TIMESTAMP WITH TIME ZONE
pain_id    UUID → pains.id
email      TEXT
ip_hash    TEXT  -- UUID anônimo do browser
```

### View `pains_summary`

Agrega dores por categoria para análise interna.

```sql
SELECT * FROM pains_summary;
-- category | total | pending | analyzing | building | launched | total_votes | last_received_at
```

### Função RPC `vote_on_pain`

Chamada pelo frontend para votar de forma atômica, evitando race conditions e duplos votos.

```sql
SELECT vote_on_pain('uuid-da-dor', 'uuid-do-voter');
-- Retorna: { "success": true } ou { "success": false, "reason": "already_voted" }
```

---

## Políticas de segurança (RLS)

| Operação | Quem pode |
|---|---|
| INSERT em `pains` | Qualquer pessoa (anônimo) |
| SELECT em `pains` | Qualquer pessoa |
| UPDATE/DELETE em `pains` | Somente usuários autenticados (equipe) |
| INSERT em `pain_votes` | Qualquer pessoa |
| SELECT em `pain_votes` | Qualquer pessoa |
| Executar `vote_on_pain` | Anônimo e autenticado |

---

## Roadmap

- [ ] Dashboard interno para gestão das dores (status, notas, agrupamentos)
- [ ] Notificação por e-mail quando a dor do usuário virar produto
- [ ] Sistema de votação com autenticação opcional
- [ ] Página pública de produtos lançados
- [ ] Integração com Slack/Discord para alertas em tempo real

---

## Licença

MIT
