GULP=./node_modules/gulp/bin/gulp.js

install:
	npm install

develop:
	$(GULP)


release:
	$(GULP) build && $(GULP) compress

clean:
	rm -rf build/ && rm -rf dev/ && rm -f archive.zip

.PHONY: install develop release clean

