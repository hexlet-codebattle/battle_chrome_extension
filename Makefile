GULP=./node_modules/gulp/bin/gulp.js

all: clean_env install clean release

clean_env:
	npm cache clean

install:
	npm install

develop:
	$(GULP)

release:
	$(GULP) build && $(GULP) compress

clean:
	rm -rf build/ && rm -f archive.zip

.PHONY: all clean_env install develop release clean

