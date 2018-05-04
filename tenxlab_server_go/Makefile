GOCMD=go
GOBUILD=$(GOCMD) build
BINARY_NAME=tenxlab_server.out
OUTPUT_FILE=nohup.out

all: clean run
clean: 
	rm -rf server
build:
	$(GOBUILD) -o $(BINARY_NAME)
run: build
	./$(BINARY_NAME) -server="$(SERVER)"	
run-bg:
	nohup ./$(BINARY_NAME) -server="$(SERVER)" > $(OUTPUT_FILE) &
sudo-kill:
	pkill $(BINARY_NAME)

sudo-run: build
	sudo ./$(BINARY_NAME) -server="$(SERVER)"	
sudo-run-bg:
	nohup sudo -b ./$(BINARY_NAME) -server="$(SERVER)" > $(OUTPUT_FILE)
sudo-kill:
	sudo pkill pkill $(BINARY_NAME)
