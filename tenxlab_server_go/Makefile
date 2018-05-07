GOCMD=go
GOBUILD=$(GOCMD) build
BINARY_NAME=tenxlab_server.out
OUTPUT_FILE=nohup.out

all: clean run
clean: 
	rm -rf server
update:
	git pull
build:
	$(GOBUILD) -o $(BINARY_NAME)
run:
	./$(BINARY_NAME) -server="$(SERVER)"	
run-bg:
	nohup ./$(BINARY_NAME) -server="$(SERVER)" > $(OUTPUT_FILE) &
kill:
	killall $(BINARY_NAME)
release: update build kill run-bg



sudo-run: build
	sudo ./$(BINARY_NAME) -server="$(SERVER)"	
sudo-run-bg:
	nohup sudo -b ./$(BINARY_NAME) -server="$(SERVER)" > $(OUTPUT_FILE)
sudo-kill:
	sudo sudo killall $(BINARY_NAME)
