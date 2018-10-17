install:
	npm i

dev:
	npm run start

lint:
	npm run eslint .

build:
	rm -rf build
	npm run build