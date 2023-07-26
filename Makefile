install:
	npm ci

publish:
	npm publish --dry-run

link:
	npm link

gendiff:
	node gendiff.js

lint: 
	npx eslint .

test: 
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test