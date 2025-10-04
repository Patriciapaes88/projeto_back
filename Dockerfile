# 1️⃣ Usa a imagem oficial do Node.js versão 18
FROM node:18

# 2️⃣ Cria uma pasta chamada /app dentro do container
WORKDIR /app

# 3️⃣ Copia os arquivos de dependência (package.json e package-lock.json)
COPY package*.json ./

# 4️⃣ Instala as dependências do projeto
RUN npm install

# 5️⃣ Copia todos os arquivos do seu projeto para dentro do container
COPY . .

# 6️⃣ Expõe a porta 4000 (ou a porta que seu servidor usa)
EXPOSE 4000

# 7️⃣ Diz ao Docker como iniciar seu servidor
CMD ["node", "server.js"]
