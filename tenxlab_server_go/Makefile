GOCMD=go
GOBUILD=$(GOCMD) build
BINARY_NAME=server

all: clean run
clean: 
	rm -rf server
build:
	$(GOBUILD) -o $(BINARY_NAME)
run: build
	./$(BINARY_NAME) -server="$(SERVER)"
