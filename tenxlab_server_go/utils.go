package main

import (
	"math/rand"
	"time"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

const letterBytes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

func randomCodeGenerator(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

func getUniqueScreenCode() string {
	return randomCodeGenerator(5)
}

func getUniqueAppToken() string {
	return randomCodeGenerator(10)
}
