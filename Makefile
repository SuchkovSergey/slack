publish:
	npm publish --dry-run

start:
	sudo heroku local -f Procfile.dev

start-backend:
	npx nodemon --exec npx babel-node server/bin/slack.js

start-frontend:
	npx webpack-dev-server

install-deps:
	npm install

push:
	sudo git push origin master

lint:
	npx eslint . --ext js,jsx

build:
	rm -rf dist
	npm run build

fix:
	npx eslint --fix . --ext js,jsx

test:
	npm test -s

install: install-deps

deploy:
	sudo git push heroku

install-actions:
	npm ci

.PHONY: test