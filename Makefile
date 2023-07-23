install:
	npm ci

gendiff:
	node gendiff.js

lint: 
	npx eslint .

test: 
	echo hello

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test