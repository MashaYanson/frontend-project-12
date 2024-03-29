lint-frontend:
	cd frontend && npx eslint .

lint:
	npx eslint .

install:
	npm ci

start-frontend:
	cd frontend && npm start

start-backend:
	npm start

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend

build:
	rm frontend/build -rf
	npm run build