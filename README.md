# Hexlet Gendiff project

[![Actions Status](https://github.com/daevv/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/daevv/frontend-project-46/actions)
[![My workflow](https://github.com/daevv/frontend-project-46/workflows/CI-check/badge.svg)](https://github.com/daevv/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/8eeadafeb84abdb58eba/maintainability)](https://codeclimate.com/github/daevv/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8eeadafeb84abdb58eba/test_coverage)](https://codeclimate.com/github/daevv/frontend-project-46/test_coverage)

Simple CLI to get differences between two files (JSON and YAML are suppoted)

## 🍻 Short description
```bash
$ gendiff -h

Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

## 💿 Installation

Use [make] to install.

```bash
$ make install
$ make publish
$ make link
// now we are ready to start
```

## 📖 Usage

To use CLI:

```bash
$ gendiff pathToFile1.json pathToFile2.json
// you can also use .yaml or .yml files and even combine extensions
```

JSON example with plain files
[![asciicast](https://asciinema.org/a/c5btJyyrF5hEQH0SKOQSOpkSR.svg)](https://asciinema.org/a/c5btJyyrF5hEQH0SKOQSOpkSR)

YAML example with plain files
[![asciicast](https://asciinema.org/a/8VSPvNe4s3TTaCwkdj9thClOR.svg)](https://asciinema.org/a/8VSPvNe4s3TTaCwkdj9thClOR)

it also works with 'deep' files

deep compare example
[![asciicast](https://asciinema.org/a/kSNc9jCsXH1wmjDoxlf2VQq11.svg)](https://asciinema.org/a/kSNc9jCsXH1wmjDoxlf2VQq11)

## 📰 Format option

By default, 'stylish' format option is chosen

But you can also use -f plain to get diffs displayed in text format
```bash
$ gendiff --format plain pathToFile1.json pathToFile2.json
```

plain format example
[![asciicast](https://asciinema.org/a/oSxg8WEZ3R0fvfGasLjZmYf7R.svg)](https://asciinema.org/a/oSxg8WEZ3R0fvfGasLjZmYf7R)

And -f json to get diffs in json format
```bash
$ gendiff --format json pathToFile1.json pathToFile2.json
```
json format example
[![asciicast](https://asciinema.org/a/7VhhtWt4RBsg46U58GH96W8Ia.svg)](https://asciinema.org/a/7VhhtWt4RBsg46U58GH96W8Ia)
