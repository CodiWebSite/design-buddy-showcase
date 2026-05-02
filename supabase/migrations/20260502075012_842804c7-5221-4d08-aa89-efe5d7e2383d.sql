-- Table to persist audit results so they can be shared via public link
CREATE TABLE public.audits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for filtering recent audits
CREATE INDEX idx_audits_created_at ON public.audits (created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon visitors) can read an audit if they have the id / link.
-- This is intentional: the link IS the access token (UUID v4 is unguessable).
CREATE POLICY "Audits are publicly readable"
ON public.audits
FOR SELECT
USING (true);

-- Anyone can save a new audit (the audit runs entirely client-side and we want
-- visitors without an account to be able to share their report).
CREATE POLICY "Anyone can create an audit"
ON public.audits
FOR INSERT
WITH CHECK (true);
