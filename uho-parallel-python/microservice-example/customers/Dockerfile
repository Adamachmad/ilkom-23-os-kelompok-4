FROM ruby:3.1

WORKDIR /app

# Salin Gemfile dan Gemfile.lock terlebih dahulu agar dependency bisa di-cache
COPY Gemfile Gemfile.lock ./

# Instalasi gem menggunakan bundler
RUN gem install bundler && bundle install

# Salin sisa file aplikasi
COPY . .

# Ekspos port
EXPOSE 4567

# Jalankan aplikasi menggunakan rackup
CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "--port", "4567"]
