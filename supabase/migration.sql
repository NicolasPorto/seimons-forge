-- =============================================
-- Seimons Forge — Tabelas Supabase
-- Execute no SQL Editor do seu projeto Supabase
-- =============================================

-- Tabela principal de dores enviadas pelos usuários
CREATE TABLE IF NOT EXISTS public.pains (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Quem enviou (opcionais)
  name            TEXT,
  email           TEXT,

  -- Dados da dor
  category        TEXT NOT NULL,
  description     TEXT NOT NULL,
  frequency       TEXT CHECK (frequency IN ('daily', 'weekly', 'monthly', 'occasionally')),
  current_solution TEXT,
  impact          TEXT CHECK (impact IN ('time', 'money', 'customers', 'team', 'all')),

  -- Gestão interna
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'analyzing', 'building', 'launched')),
  votes           INTEGER DEFAULT 0,
  notes           TEXT  -- anotações internas da equipe
);

-- Índices para buscas comuns
CREATE INDEX IF NOT EXISTS idx_pains_category  ON public.pains(category);
CREATE INDEX IF NOT EXISTS idx_pains_status    ON public.pains(status);
CREATE INDEX IF NOT EXISTS idx_pains_created_at ON public.pains(created_at DESC);

-- Habilitar Row Level Security
ALTER TABLE public.pains ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode enviar uma dor (INSERT)
CREATE POLICY "allow_insert_pains"
  ON public.pains
  FOR INSERT
  WITH CHECK (true);

-- Leitura pública (necessário se quiser exibir contagem/dores no futuro)
CREATE POLICY "allow_select_pains"
  ON public.pains
  FOR SELECT
  USING (true);

-- Somente usuários autenticados (equipe) podem atualizar/deletar
CREATE POLICY "allow_update_pains_authenticated"
  ON public.pains
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "allow_delete_pains_authenticated"
  ON public.pains
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- =============================================
-- Tabela de votos (para feature futura)
-- =============================================
CREATE TABLE IF NOT EXISTS public.pain_votes (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  pain_id    UUID REFERENCES public.pains(id) ON DELETE CASCADE NOT NULL,
  email      TEXT,
  ip_hash    TEXT -- hash do IP para evitar voto duplo
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_pain_votes_unique
  ON public.pain_votes(pain_id, ip_hash);

ALTER TABLE public.pain_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_insert_votes"
  ON public.pain_votes
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "allow_select_votes"
  ON public.pain_votes
  FOR SELECT
  USING (true);

-- =============================================
-- View útil para análise no dashboard
-- =============================================
CREATE OR REPLACE VIEW public.pains_summary AS
SELECT
  category,
  COUNT(*)                                         AS total,
  COUNT(*) FILTER (WHERE status = 'pending')       AS pending,
  COUNT(*) FILTER (WHERE status = 'analyzing')     AS analyzing,
  COUNT(*) FILTER (WHERE status = 'building')      AS building,
  COUNT(*) FILTER (WHERE status = 'launched')      AS launched,
  SUM(votes)                                        AS total_votes,
  MAX(created_at)                                   AS last_received_at
FROM public.pains
GROUP BY category
ORDER BY total DESC;
