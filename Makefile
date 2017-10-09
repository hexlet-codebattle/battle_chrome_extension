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

lint:
	gulp eslint

remote-upstream:
	git remote add upstream https://github.com/hexlet-codebattle/battle_chrome_extension.git
	git remote -v

get-last-changes:
	 git fetch upstream
	 git checkout master
	 git merge upstream/master 

.PHONY: all clean_env install develop release clean build_release

