GULP=./node_modules/gulp/bin/gulp.js

all:
	npm cache clean && rm -rf ./node_modules

install:
	npm install

develop:
	$(GULP)


release:
	$(GULP) build && $(GULP) compress

clean:
	rm -rf build/ && rm -rf dev/ && rm -f archive.zip

.PHONY: all install develop release clean

