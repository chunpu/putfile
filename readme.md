putfile@1.1.0
===

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

File Upload server with command-line

===

Installation
---

```sh
npm install putfile -g
```


Usage
---

#### Send one file

```sh
curl -T my.file URL
# short for `curl --upload-file`
```

#### Send multiple files

```sh
curl -F "foo.file=@foo.file" -F "bar.rename=@bar.file"
# short for `curl --form`
```

#### Send stdin

```sh
cat my.file | curl -F my.file=@-
```

License
---

ISC

[npm-image]: https://img.shields.io/npm/v/putfile.svg?style=flat-square
[npm-url]: https://npmjs.org/package/putfile
[downloads-image]: http://img.shields.io/npm/dm/putfile.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/putfile
