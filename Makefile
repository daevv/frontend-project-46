install:
	npm ci
gendiff:
	node gendiff.js
lint: 
	npx eslint .
test: 
	echo hello