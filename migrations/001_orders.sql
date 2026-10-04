BEGIN;
CREATE TABLE twa_orders (
  id uuid PRIMARY KEY,
  request_id uuid NOT NULL UNIQUE,
  product_id text NOT NULL,
  product_name text NOT NULL,
  amount integer NOT NULL CHECK (amount > 0),
  currency text NOT NULL CHECK (currency = 'INR'),
  payee_id text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL DEFAULT '',
  utr text CHECK (utr ~ '^[0-9]{12}$'),
  status text NOT NULL DEFAULT 'AWAITING_PAYMENT'
    CHECK (status IN ('AWAITING_PAYMENT', 'PENDING_VERIFICATION')),
  policy_version text,
  acknowledged_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  submitted_at timestamptz,
  UNIQUE (payee_id, utr)
);
CREATE TABLE twa_outbox (
  order_id uuid PRIMARY KEY REFERENCES twa_orders(id),
  attempts integer NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  locked_until timestamptz,
  lock_id uuid,
  delivered_at timestamptz,
  failed_at timestamptz
);
CREATE INDEX twa_outbox_due ON twa_outbox(next_attempt_at)
  WHERE delivered_at IS NULL AND failed_at IS NULL;
CREATE TABLE twa_rate_limits (
  key text NOT NULL,
  bucket bigint NOT NULL,
  count integer NOT NULL,
  PRIMARY KEY (key, bucket)
);
COMMIT;
