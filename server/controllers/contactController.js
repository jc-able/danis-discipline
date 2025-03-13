CREATE TABLE coaching_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(100) NOT NULL CHECK (char_length(title) >= 3),
  description TEXT NOT NULL CHECK (char_length(description) >= 10),
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  duration VARCHAR(50) NOT NULL,
  features TEXT[] NOT NULL,
  stripe_product_id VARCHAR(255),
  image_url VARCHAR(255),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
