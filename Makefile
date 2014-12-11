build: go_get
	esc -prefix=public public  > embed.go
	go get
	go build

go_get:
	go get github.com/mjibson/esc
