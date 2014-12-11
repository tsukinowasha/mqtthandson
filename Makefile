build: go_get
	esc -prefix=public public  > embed.go
	go build

go_get:
	go get
	go get github.com/mjibson/esc
