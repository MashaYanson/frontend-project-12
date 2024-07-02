lint-frontend:
	cd frontend && npx eslint .

lint:
	npx eslint .

install:
	npm i && npm i --prefix frontend

start-frontend:
	cd frontend && npm start

start:
	npm start

build:
	npm run build --prefix frontend