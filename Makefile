GULP=./node_modules/gulp/bin/gulp.js

all: clean_env install clean release

clean_env:
	npm cache clean --force && rm -rf ./node_modules

install:
	npm install

develop:
	$(GULP)

release: clean build_release

build_release:
	$(GULP) build && $(GULP) compress

clean:
	rm -rf build/ && rm -rf dist/

.PHONY: all clean_env install develop release clean build_release

