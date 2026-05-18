-- =============================================
-- Execute no SQL Editor do Supabase APÓS migration.sql
-- =============================================

-- Função RPC para votar em uma dor de forma atômica
-- Evita duplo voto pelo mesmo voter_id (UUID gerado no browser e salvo no localStorage)
CREATE OR REPLACE FUNCTION vote_on_pain(p_pain_id UUID, p_voter_id TEXT)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  already_voted BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM public.pain_votes
    WHERE pain_id = p_pain_id AND ip_hash = p_voter_id
  ) INTO already_voted;

  IF already_voted THEN
    RETURN jsonb_build_object('success', false, 'reason', 'already_voted');
  END IF;

  INSERT INTO public.pain_votes (pain_id, ip_hash)
  VALUES (p_pain_id, p_voter_id);

  UPDATE public.pains
  SET votes = votes + 1
  WHERE id = p_pain_id;

  RETURN jsonb_build_object('success', true);
END;
$$;

-- Permite que usuários anônimos chamem a função
GRANT EXECUTE ON FUNCTION vote_on_pain(UUID, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION vote_on_pain(UUID, TEXT) TO authenticated;
