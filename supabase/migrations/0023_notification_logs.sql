-- 0023_notification_logs.sql
-- Tabel riwayat pengiriman notifikasi deadline

CREATE TABLE IF NOT EXISTS notification_logs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    uuid REFERENCES orders(id) ON DELETE SET NULL,
  order_number text,
  phone       text NOT NULL,
  status      text NOT NULL DEFAULT 'sent',  -- sent | failed
  error       text,
  diff_days   int,                            -- H-3, H-2, H-1
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Admin (authenticated) full access
CREATE POLICY "Admin manage notification_logs" ON notification_logs
  FOR ALL USING (auth.role() = 'authenticated');

-- Service role bypass (for cron + settings API)
-- No extra policy needed — service role ignores RLS

CREATE INDEX idx_notification_logs_created ON notification_logs (created_at DESC);
CREATE INDEX idx_notification_logs_order ON notification_logs (order_id);
