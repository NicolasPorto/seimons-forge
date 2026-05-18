-- Adiciona coluna de aprovação (default false — nenhuma pain aparece publicamente sem aprovação)
ALTER TABLE public.pains
  ADD COLUMN IF NOT EXISTS approved BOOLEAN NOT NULL DEFAULT false;

-- Remove a política antiga que permitia leitura irrestrita
DROP POLICY IF EXISTS "allow_select_pains" ON public.pains;

-- Usuários anônimos só veem pains aprovadas
-- Usuários autenticados (equipe) veem todas
CREATE POLICY "allow_select_pains"
  ON public.pains
  FOR SELECT
  USING (
    approved = true
    OR auth.role() = 'authenticated'
  );
