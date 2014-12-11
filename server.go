package main

import (
	"net/http"

	"github.com/zenazn/goji"
)

func main() {
	goji.Handle("/*", http.FileServer(FS(false)))
	goji.Serve()
}
