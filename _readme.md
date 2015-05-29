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
