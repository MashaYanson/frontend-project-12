lint-frontend:
	cd frontend && npx eslint .

lint:
	npx eslint .

install:
	npm ci && npm ci --prefix frontend

start-frontend:
	cd frontend && npm start

start:
	npm start

build:
	npm run build --prefix frontend